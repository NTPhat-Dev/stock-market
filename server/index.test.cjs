const { test } = require('node:test');
const assert = require('node:assert/strict');
const { mkdtempSync, writeFileSync, readFileSync, rmSync, mkdirSync } = require('node:fs');
const path = require('node:path');
const { createServer } = require('./index.cjs');

test('account API and stock CRUD persist to the JSON database', async () => {
  const root = path.resolve(__dirname, '..', 'tmp');
  mkdirSync(root, { recursive: true });
  const directory = mkdtempSync(path.join(root, 'api-test-'));
  const database = path.join(directory, 'data.json');
  writeFileSync(database, JSON.stringify({ stocks: [], users: [], profile: { name: 'test' } }));
  const server = createServer(database).listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/api`;
  let cookie = '';
  async function request(url, method = 'GET', body, headers = {}) {
    return fetch(base + url, {
      method,
      headers: { 'Content-Type': 'application/json', Cookie: cookie, ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  }
  try {
    assert.equal((await request('/stocks')).status, 401);
    assert.equal((await request('/users')).status, 404);
    assert.equal(
      (await request('/auth/register', 'POST', { username: 'ab', password: 'short' })).status,
      400,
    );
    const credentials = { username: 'test_student', password: 'Practice123!' };
    const register = await request('/auth/register', 'POST', credentials);
    assert.equal(register.status, 201);
    const publicUser = await register.json();
    assert.equal(publicUser.username, credentials.username);
    assert.equal(publicUser.passwordHash, undefined);
    cookie = register.headers.get('set-cookie').split(';')[0];
    assert.match(register.headers.get('set-cookie'), /HttpOnly/);
    assert.equal((await request('/auth/register', 'POST', credentials)).status, 409);
    assert.equal((await (await request('/auth/me')).json()).username, credentials.username);
    assert.equal(
      (await request('/auth/login', 'POST', { ...credentials, password: 'WrongPass' })).status,
      401,
    );
    const login = await request('/auth/login', 'POST', credentials);
    assert.equal(login.status, 200);
    cookie = login.headers.get('set-cookie').split(';')[0];
    const stock = {
      name: 'New Test Company',
      code: 'ntc',
      price: 20,
      previousPrice: 20,
      exchange: 'NASDAQ',
      favorite: false,
    };
    const created = await request('/stocks', 'POST', stock);
    assert.equal(created.status, 201);
    const saved = await created.json();
    assert.equal(saved.code, 'NTC');
    assert.equal((await request('/stocks', 'POST', stock)).status, 409);
    assert.equal(
      (await request('/stocks', 'POST', { ...stock, code: 'BAD', price: -1 })).status,
      400,
    );
    assert.equal(
      (await request('/stocks', 'POST', stock, { Origin: 'https://untrusted.example' })).status,
      403,
    );
    const results = await (await request('/stocks?q=NTC')).json();
    assert.equal(results.length, 1);
    assert.equal((await (await request(`/stocks/${saved.id}`)).json()).code, 'NTC');
    const updated = await request(`/stocks/${saved.id}`, 'PUT', { ...saved, price: 30 });
    assert.equal(updated.status, 200);
    assert.equal((await updated.json()).previousPrice, 20);
    const favorite = await request(`/stocks/${saved.id}`, 'PATCH', { favorite: true });
    const favorited = await favorite.json();
    assert.equal(favorited.favorite, true);
    assert.equal(favorited.previousPrice, 20);
    const disk = JSON.parse(readFileSync(database, 'utf8'));
    assert.equal(disk.stocks.find((s) => s.id === saved.id).price, 30);
    const account = disk.users.find((user) => user.username === credentials.username);
    assert.notEqual(account.passwordHash, credentials.password);
    assert.equal(account.password, undefined);
    assert.equal((await request(`/stocks/${saved.id}`, 'DELETE')).status, 200);
    assert.equal((await request(`/stocks/${saved.id}`)).status, 404);
    assert.equal((await request('/auth/logout', 'POST', {})).status, 204);
    assert.equal((await request('/auth/me')).status, 401);
    assert.equal((await request('/stocks')).status, 401);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    // Only remove the uniquely created test directory within this project's tmp.
    assert.equal(path.dirname(directory), root);
    rmSync(directory, { recursive: true, force: true });
  }
});
