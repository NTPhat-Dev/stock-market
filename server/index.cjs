const jsonServer = require('json-server');
const { randomBytes, scryptSync, timingSafeEqual } = require('node:crypto');
const path = require('node:path');

// JSON Server 0.17 supports a custom Express application, as used in bài 7.
function createServer(dataFile = path.join(__dirname, '..', 'data.json')) {
  const app = jsonServer.create();
  const router = jsonServer.router(dataFile);
  const sessions = new Map();
  const exchanges = ['NASDAQ', 'NSE', 'NYSE', 'HOSE', 'HNX', 'UPCoM'];
  const cookieName = 'stock_market_session';
  const maxAge = 8 * 60 * 60 * 1000;
  if (!router.db.has('users').value()) router.db.set('users', []).write();
  app.disable('x-powered-by');
  app.use(jsonServer.bodyParser);
  app.use((req, res, next) => {
    // Reload local edits to data.json, equivalent to the --watch behavior in the PDF.
    router.db.read();
    res.set('Cache-Control', 'no-store');
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers.origin) {
      const allowed = [
        'http://localhost:4200',
        'http://127.0.0.1:4200',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ];
      if (!allowed.includes(req.headers.origin))
        return res.status(403).json({ message: 'Nguồn yêu cầu không hợp lệ.' });
    }
    const cookie = (req.headers.cookie || '')
      .split(';')
      .map((value) => value.trim())
      .find((value) => value.startsWith(`${cookieName}=`));
    const token = cookie?.slice(cookieName.length + 1);
    for (const [key, session] of sessions) if (session.expires <= Date.now()) sessions.delete(key);
    req.sessionToken = token;
    req.user = sessions.get(token)?.user;
    next();
  });

  function startSession(req, res, user) {
    if (req.sessionToken) sessions.delete(req.sessionToken);
    const token = randomBytes(32).toString('hex');
    const publicUser = { id: user.id, username: user.username };
    sessions.set(token, { user: publicUser, expires: Date.now() + maxAge });
    res.cookie(cookieName, token, { httpOnly: true, sameSite: 'strict', maxAge, path: '/' });
    return publicUser;
  }
  function credentials(req, res, next) {
    const { username, password } = req.body || {};
    if (
      typeof username !== 'string' ||
      !/^[A-Za-z0-9_]{3,30}$/.test(username) ||
      typeof password !== 'string' ||
      password.length < 8 ||
      password.length > 128
    ) {
      return res.status(400).json({
        message: 'Tên tài khoản gồm 3–30 ký tự chữ, số, gạch dưới; mật khẩu từ 8 đến 128 ký tự.',
      });
    }
    next();
  }
  app.post('/api/auth/register', credentials, (req, res) => {
    const { username, password } = req.body;
    const users = router.db.get('users').value();
    if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
      return res.status(409).json({ message: 'Tên tài khoản đã tồn tại.' });
    }
    const salt = randomBytes(16).toString('hex');
    const user = {
      id: Math.max(0, ...users.map((user) => user.id)) + 1,
      username,
      salt,
      passwordHash: scryptSync(password, salt, 64).toString('hex'),
    };
    router.db.get('users').push(user).write();
    return res.status(201).json(startSession(req, res, user));
  });
  app.post('/api/auth/login', credentials, (req, res) => {
    const user = router.db
      .get('users')
      .find((user) => user.username.toLowerCase() === req.body.username.toLowerCase())
      .value();
    const salt = user?.salt ?? 'unregistered-account';
    const actual = scryptSync(req.body.password, salt, 64);
    if (!user || !timingSafeEqual(Buffer.from(user.passwordHash, 'hex'), actual)) {
      return res.status(401).json({ message: 'Tên tài khoản hoặc mật khẩu không đúng.' });
    }
    return res.json(startSession(req, res, user));
  });
  app.get('/api/auth/me', (req, res) =>
    req.user ? res.json(req.user) : res.status(401).json({ message: 'Vui lòng đăng nhập.' }),
  );
  app.post('/api/auth/logout', (req, res) => {
    sessions.delete(req.sessionToken);
    res.clearCookie(cookieName, { httpOnly: true, sameSite: 'strict', path: '/' });
    res.status(204).end();
  });
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api', (req, res, next) => {
    if (!/^\/stocks(?:\/\d+)?\/?$/.test(req.path))
      return res.status(404).json({ message: 'Không tìm thấy tài nguyên.' });
    if (!req.user)
      return res.status(401).json({ message: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.' });
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const old = /^\/stocks\/\d+/.test(req.path)
        ? router.db
            .get('stocks')
            .find({ id: Number(req.path.split('/')[2]) })
            .value()
        : null;
      if (req.method !== 'POST' && !old)
        return res.status(404).json({ message: 'Không tìm thấy cổ phiếu.' });
      const stock = { ...(req.method === 'PATCH' ? old : {}), ...req.body };
      const code = typeof stock.code === 'string' ? stock.code.trim().toUpperCase() : '';
      const name = typeof stock.name === 'string' ? stock.name.trim() : '';
      if (
        name.length < 3 ||
        !/^[A-Z0-9]{2,10}$/.test(code) ||
        typeof stock.price !== 'number' ||
        !Number.isFinite(stock.price) ||
        stock.price < 0.01 ||
        !exchanges.includes(stock.exchange) ||
        typeof stock.favorite !== 'boolean'
      ) {
        return res.status(400).json({
          message: 'Thông tin cổ phiếu không hợp lệ. Kiểm tra tên, mã, giá và sàn giao dịch.',
        });
      }
      if (
        router.db
          .get('stocks')
          .value()
          .some((s) => s.id !== old?.id && s.code.toUpperCase() === code)
      ) {
        return res.status(409).json({ message: 'Mã cổ phiếu đã tồn tại.' });
      }
      req.body = {
        name,
        code,
        price: stock.price,
        exchange: stock.exchange,
        favorite: stock.favorite,
        previousPrice: old
          ? old.price !== stock.price
            ? old.price
            : old.previousPrice
          : stock.price,
      };
      if (old) req.body.id = old.id;
    }
    next();
  });
  app.use('/api', router);
  app.use((_req, res) => res.status(404).json({ message: 'Không tìm thấy tài nguyên.' }));
  app.use((error, _req, res, _next) => {
    res.status(error.status || 500).json({
      message:
        error.status === 400 ? 'Nội dung yêu cầu không hợp lệ.' : 'Không xử lý được yêu cầu.',
    });
  });
  return app;
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  createServer().listen(port, '127.0.0.1', () =>
    console.log(`Stock Market API: http://localhost:${port}/api`),
  );
}
module.exports = { createServer };
