# Danh sách hàm và phương thức trong Stock Market

Ngày thống kê: 24/10/2026. Phân tích cú pháp TypeScript/JavaScript và template Angular trong `src/` và `server/`. Không tính mã trong `node_modules/`, bản build `dist/`, tài liệu, script tạm hoặc mã nguồn nội bộ của thư viện.

Có **47 hàm/phương thức có tên trong mã chạy chính**, **3 constructor tường minh** và **1 hàm có tên bổ sung trong kiểm thử**. Cùng một tên trong hai class được tính thành hai phương thức khác nhau.

Để phân biệt rõ: định nghĩa là nơi viết thân hàm; lời gọi là nơi sử dụng hàm. Một hàm có thể được gọi ở nhiều nơi. Callback ẩn danh, hàm đọc signal, decorator và pipe được thống kê riêng phía dưới.

## 1 Các hàm và phương thức do dự án định nghĩa

### server/index.cjs

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `createServer()` | `dataFile = path.join(__dirname, '..', 'data.json')` | `không khai báo trực tiếp` | Tạo ứng dụng JSON Server, cấu hình middleware, tài khoản, CRUD và xử lý lỗi. | [server/index.cjs:6](D:/stock-market/server/index.cjs:6) |
| `startSession()` | `req, res, user` | `không khai báo trực tiếp` | Hủy token cũ nếu có, tạo token ngẫu nhiên, lưu phiên và gửi cookie HttpOnly. | [server/index.cjs:41](D:/stock-market/server/index.cjs:41) |
| `credentials()` | `req, res, next` | `không khai báo trực tiếp` | Kiểm tra tên tài khoản và mật khẩu trước khi đăng ký hoặc đăng nhập. | [server/index.cjs:49](D:/stock-market/server/index.cjs:49) |

### src/app/app.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `App.logout()` | `không có` | `void` | Gọi đăng xuất, điều hướng về login hoặc hiển thị lỗi. | [src/app/app.ts:40](D:/stock-market/src/app/app.ts:40) |

### src/app/core/auth.guard.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `authGuard()` | `_route, state` | `không khai báo trực tiếp` | Cho phép truy cập nhóm stocks hoặc chuyển về login kèm returnUrl. | [src/app/core/auth.guard.ts:6](D:/stock-market/src/app/core/auth.guard.ts:6) |

### src/app/core/errors.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `errorMessage()` | `error: unknown` | `string` | Chuyển lỗi HTTP hoặc Error thành thông báo cho giao diện. | [src/app/core/errors.ts:3](D:/stock-market/src/app/core/errors.ts:3) |

### src/app/core/http.service.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `HttpService.getStocks()` | `query = ''` | `Observable<Stock[]>` | GET danh sách từ /api/stocks, gửi tham số q khi có từ khóa. | [src/app/core/http.service.ts:12](D:/stock-market/src/app/core/http.service.ts:12) |
| `HttpService.getStock()` | `id: number` | `Observable<Stock>` | GET một bản ghi /api/stocks/:id. | [src/app/core/http.service.ts:16](D:/stock-market/src/app/core/http.service.ts:16) |
| `HttpService.createStock()` | `stock: Stock` | `Observable<Stock>` | POST bản ghi mới, loại bỏ id khỏi body để server sinh id. | [src/app/core/http.service.ts:20](D:/stock-market/src/app/core/http.service.ts:20) |
| `HttpService.updateStock()` | `stock: Stock` | `Observable<Stock>` | PUT dữ liệu cập nhật đến /api/stocks/:id. | [src/app/core/http.service.ts:25](D:/stock-market/src/app/core/http.service.ts:25) |
| `HttpService.deleteStock()` | `id: number` | `Observable<void>` | DELETE bản ghi /api/stocks/:id. | [src/app/core/http.service.ts:29](D:/stock-market/src/app/core/http.service.ts:29) |
| `HttpService.toggleFavorite()` | `stock: Stock` | `Observable<Stock>` | PATCH giá trị favorite mới đến /api/stocks/:id. | [src/app/core/http.service.ts:33](D:/stock-market/src/app/core/http.service.ts:33) |

### src/app/core/stock.service.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `StockService.getStocks()` | `query = ''` | `Observable<Stock[]>` | Tìm và theo dõi danh sách trong bộ nhớ theo tên, mã hoặc sàn. | [src/app/core/stock.service.ts:11](D:/stock-market/src/app/core/stock.service.ts:11) |
| `StockService.getStock()` | `id: number` | `Observable<Stock>` | Lấy một cổ phiếu trong bộ nhớ theo id, báo lỗi nếu không tìm thấy. | [src/app/core/stock.service.ts:20](D:/stock-market/src/app/core/stock.service.ts:20) |
| `StockService.createStock()` | `stock: Stock` | `Observable<Stock>` | Kiểm tra mã trùng, sinh id và phát danh sách mới trong bộ nhớ. | [src/app/core/stock.service.ts:27](D:/stock-market/src/app/core/stock.service.ts:27) |
| `StockService.updateStock()` | `stock: Stock` | `Observable<Stock>` | Kiểm tra tồn tại và mã trùng rồi thay bản ghi trong bộ nhớ. | [src/app/core/stock.service.ts:44](D:/stock-market/src/app/core/stock.service.ts:44) |
| `StockService.deleteStock()` | `id: number` | `Observable<void>` | Kiểm tra tồn tại rồi xóa cổ phiếu trong bộ nhớ. | [src/app/core/stock.service.ts:59](D:/stock-market/src/app/core/stock.service.ts:59) |
| `StockService.toggleFavorite()` | `stock: Stock` | `Observable<Stock>` | Đảo trạng thái favorite thông qua updateStock. | [src/app/core/stock.service.ts:69](D:/stock-market/src/app/core/stock.service.ts:69) |

### src/app/core/user.service.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `UserService.restore()` | `không có` | `Observable<boolean>` | GET /api/auth/me, cập nhật signal user và trả trạng thái xác thực. | [src/app/core/user.service.ts:15](D:/stock-market/src/app/core/user.service.ts:15) |
| `UserService.login()` | `credentials: { username: string; password: string }` | `Observable<User>` | POST /api/auth/login và lưu user công khai vào signal. | [src/app/core/user.service.ts:26](D:/stock-market/src/app/core/user.service.ts:26) |
| `UserService.register()` | `credentials: { username: string; password: string }` | `Observable<User>` | POST /api/auth/register và lưu user công khai vào signal. | [src/app/core/user.service.ts:32](D:/stock-market/src/app/core/user.service.ts:32) |
| `UserService.logout()` | `không có` | `Observable<void>` | POST /api/auth/logout rồi xóa signal user. | [src/app/core/user.service.ts:38](D:/stock-market/src/app/core/user.service.ts:38) |

### src/app/create-stock/create-stock.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `CreateStock.onSubmit()` | `form: NgForm` | `void` | Kiểm tra Template Form, chuẩn hóa và phát Stock qua created. | [src/app/create-stock/create-stock.ts:20](D:/stock-market/src/app/create-stock/create-stock.ts:20) |
| `CreateStock.resetForm()` | `form: NgForm` | `void` | Xóa dữ liệu và kết quả, trả form về pristine và untouched. | [src/app/create-stock/create-stock.ts:33](D:/stock-market/src/app/create-stock/create-stock.ts:33) |

### src/app/labs/component-lab.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `ComponentLab.create()` | `stock: Stock` | `void` | Thêm cổ phiếu nhận từ component con vào signal danh sách bài 5. | [src/app/labs/component-lab.ts:44](D:/stock-market/src/app/labs/component-lab.ts:44) |
| `ComponentLab.favorite()` | `stock: Stock` | `void` | Đảo yêu thích của dòng trong danh sách bài 5. | [src/app/labs/component-lab.ts:53](D:/stock-market/src/app/labs/component-lab.ts:53) |
| `ComponentLab.remove()` | `stock: Stock` | `void` | Xóa dòng trong danh sách bài 5. | [src/app/labs/component-lab.ts:58](D:/stock-market/src/app/labs/component-lab.ts:58) |
| `ComponentLab.details()` | `stock: Stock` | `void` | Hiển thị thông tin cổ phiếu trong thông báo bài 5. | [src/app/labs/component-lab.ts:61](D:/stock-market/src/app/labs/component-lab.ts:61) |
| `ComponentLab.edit()` | `stock: Stock` | `void` | Minh họa nhận sự kiện sửa từ con; chỉ hiển thị thông báo, không lưu sửa. | [src/app/labs/component-lab.ts:64](D:/stock-market/src/app/labs/component-lab.ts:64) |

### src/app/model/stock.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `sampleStocks()` | `không có` | `Stock[]` | Trả về ba Stock mẫu mới TSC, SSC và LSC. | [src/app/model/stock.ts:15](D:/stock-market/src/app/model/stock.ts:15) |

### src/app/shared/account-form/account-form.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `AccountFormComponent.submit()` | `không có` | `void` | Gửi đăng ký hoặc đăng nhập và điều hướng theo returnUrl hợp lệ. | [src/app/shared/account-form/account-form.ts:26](D:/stock-market/src/app/shared/account-form/account-form.ts:26) |

### src/app/shared/stock-change.pipe.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `StockChangePipe.transform()` | `stock: Stock` | `string` | Tính phần trăm biến động và định dạng chuỗi, xử lý giá tham chiếu bằng 0. | [src/app/shared/stock-change.pipe.ts:6](D:/stock-market/src/app/shared/stock-change.pipe.ts:6) |

### src/app/shared/stock-form/stock-form.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `stockNameValidator()` | `control: AbstractControl` | `ValidationErrors \| null` | Xác thực tên sau trim có ít nhất 3 ký tự. | [src/app/shared/stock-form/stock-form.ts:17](D:/stock-market/src/app/shared/stock-form/stock-form.ts:17) |
| `StockFormComponent.setStock()` | `stock: Stock` | `void` | Nạp cổ phiếu gốc vào Reactive Form để chỉnh sửa. | [src/app/shared/stock-form/stock-form.ts:52](D:/stock-market/src/app/shared/stock-form/stock-form.ts:52) |
| `StockFormComponent.reset()` | `không có` | `void` | Đặt lại form tạo mới hoặc khôi phục dữ liệu gốc khi đang sửa. | [src/app/shared/stock-form/stock-form.ts:63](D:/stock-market/src/app/shared/stock-form/stock-form.ts:63) |
| `StockFormComponent.submit()` | `không có` | `void` | Kiểm tra, chuẩn hóa Stock, tạo FormData minh họa và phát submitted. | [src/app/shared/stock-form/stock-form.ts:70](D:/stock-market/src/app/shared/stock-form/stock-form.ts:70) |

### src/app/stock/create-stock-page/create-stock-page.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `CreateStockPage.save()` | `stock: Stock` | `void` | Tạo cổ phiếu qua HttpService, hiển thị thông báo rồi về danh sách. | [src/app/stock/create-stock-page/create-stock-page.ts:32](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:32) |

### src/app/stock/stock-dialogs/stock-dialogs.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `StockEditDialog.save()` | `stock: Stock` | `void` | Chọn nguồn dữ liệu, lưu chỉnh sửa và đóng dialog kèm kết quả. | [src/app/stock/stock-dialogs/stock-dialogs.ts:46](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:46) |

### src/app/stock/stock-list/stock-list.ts

| Hàm hoặc phương thức | Tham số | Kiểu trả về khai báo | Chức năng | Vị trí |
| --- | --- | --- | --- | --- |
| `StockListComponent.reload()` | `không có` | `void` | Phát refresh để tải lại danh sách với từ khóa hiện tại. | [src/app/stock/stock-list/stock-list.ts:79](D:/stock-market/src/app/stock/stock-list/stock-list.ts:79) |
| `StockListComponent.favorite()` | `stock: Stock` | `void` | Đổi yêu thích qua nguồn dữ liệu đang chọn. | [src/app/stock/stock-list/stock-list.ts:82](D:/stock-market/src/app/stock/stock-list/stock-list.ts:82) |
| `StockListComponent.create()` | `stock: Stock` | `void` | Thêm cổ phiếu qua nguồn dữ liệu đang chọn. | [src/app/stock/stock-list/stock-list.ts:85](D:/stock-market/src/app/stock/stock-list/stock-list.ts:85) |
| `StockListComponent.edit()` | `stock: Stock` | `void` | Mở dialog cập nhật và tải lại danh sách sau khi lưu thành công. | [src/app/stock/stock-list/stock-list.ts:88](D:/stock-market/src/app/stock/stock-list/stock-list.ts:88) |
| `StockListComponent.details()` | `stock: Stock` | `void` | Mở dialog thông tin chi tiết của cổ phiếu. | [src/app/stock/stock-list/stock-list.ts:103](D:/stock-market/src/app/stock/stock-list/stock-list.ts:103) |
| `StockListComponent.openPage()` | `stock: Stock` | `void` | Ở bài 6 mở dialog; ở trang API điều hướng đến /stocks/:id. | [src/app/stock/stock-list/stock-list.ts:106](D:/stock-market/src/app/stock/stock-list/stock-list.ts:106) |
| `StockListComponent.remove()` | `stock: Stock` | `void` | Mở xác nhận xóa rồi xóa bản ghi khi người dùng đồng ý. | [src/app/stock/stock-list/stock-list.ts:110](D:/stock-market/src/app/stock/stock-list/stock-list.ts:110) |
| `StockListComponent.mutate()` (private) | `operation: Observable<unknown>, message: string` | `void` | Xử lý chung busy, lỗi, tải lại và thông báo của thao tác thay đổi dữ liệu. | [src/app/stock/stock-list/stock-list.ts:118](D:/stock-market/src/app/stock/stock-list/stock-list.ts:118) |
| `StockListComponent.notify()` (private) | `message: string` | `void` | Mở MatSnackBar trong 3 giây. | [src/app/stock/stock-list/stock-list.ts:134](D:/stock-market/src/app/stock/stock-list/stock-list.ts:134) |

Kiểu không khai báo trực tiếp vẫn có thể được TypeScript suy luận hoặc được chỉ định bằng kiểu biến. `authGuard` có kiểu biến CanActivateFn; kết quả thực tế trong code là Observable chứa true hoặc UrlTree. Ba hàm backend viết bằng JavaScript nên không có chú thích kiểu trả về.

## 2 Constructor được viết tường minh

| Constructor | Vai trò | Vị trí |
| --- | --- | --- |
| `App.constructor()` | Khôi phục phiên người dùng khi component gốc được tạo. | [src/app/app.ts:37](D:/stock-market/src/app/app.ts:37) |
| `Stock.constructor()` | Khởi tạo name, code, price, previousPrice, favorite, exchange và id tùy chọn. | [src/app/model/stock.ts:2](D:/stock-market/src/app/model/stock.ts:2) |
| `StockEditDialog.constructor()` | Đăng ký afterNextRender để nạp Stock vào form con. | [src/app/stock/stock-dialogs/stock-dialogs.ts:43](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:43) |

Các class khác vẫn có cơ chế khởi tạo mặc định của JavaScript/Angular, nhưng không có thân constructor được viết riêng trong mã nguồn.

## 3 Hàm có tên trong kiểm thử

| Hàm | Tham số | Chức năng | Vị trí |
| --- | --- | --- | --- |
| `request()` | `url, method = 'GET', body, headers = {}` | Hàm async hỗ trợ kiểm thử API, gửi fetch kèm cookie và JSON body. | [server/index.test.cjs:17](D:/stock-market/server/index.test.cjs:17) |

## 4 Các hàm và phương thức thư viện được dùng

### Angular và cấu hình

| Hàm hoặc nhóm phương thức | Mục đích |
| --- | --- |
| `bootstrapApplication()` | Khởi động ứng dụng standalone. |
| `provideRouter(), provideHttpClient(), provideBrowserGlobalErrorListeners()` | Đăng ký router, HTTP và bộ lắng nghe lỗi. |
| `inject()` | Lấy service hoặc đối tượng đã được đăng ký trong hệ thống DI. |
| `Component(), Injectable(), Pipe(), Input(), Output()` | Decorator khai báo component, service, pipe và giao tiếp cha con. |
| `signal(), input(), output()` | Tạo signal trạng thái, input signal và output. |
| `signal.set(), signal.update(), signal()` | Ghi, cập nhật hoặc đọc trạng thái; tên biến cụ thể được ghi ở mục lời gọi. |
| `viewChild.required(), editor()` | Lấy tham chiếu form con qua truy vấn view bằng signal. |
| `afterNextRender()` | Đợi lần render tiếp theo để nạp dữ liệu vào form trong dialog. |
| `new EventEmitter(), emit()` | Tạo và phát sự kiện từ component. |

### Angular Forms

| Hàm hoặc nhóm phương thức | Mục đích |
| --- | --- |
| `new FormControl()` | Tạo control của ô tìm kiếm. |
| `FormBuilder.nonNullable.group()` | Tạo nhóm điều khiển không null cho các form. |
| `Validators.min(), minLength(), maxLength(), pattern()` | Tạo validator theo giá, độ dài và biểu thức chính quy. |
| `Validators.required, Validators.requiredTrue` | Hàm validator được truyền dưới dạng tham chiếu, không viết lời gọi có ngoặc tại nơi cấu hình. |
| `form.markAllAsTouched()` | Đánh dấu các control đã tương tác. |
| `form.getRawValue()` | Lấy giá trị các control. |
| `form.reset(), NgForm.resetForm()` | Đặt lại giá trị và trạng thái form. |
| `form.patchValue(), form.setValue()` | Thiết lập dữ liệu một phần hoặc đầy đủ trong kiểm thử. |

### Router và Material

| Hàm hoặc nhóm phương thức | Mục đích |
| --- | --- |
| `router.navigate(), router.navigateByUrl(), router.createUrlTree()` | Điều hướng hoặc tạo đích chuyển hướng. |
| `paramMap.get(), queryParamMap.get()` | Đọc id cổ phiếu và returnUrl từ route. |
| `dialog.open(), dialogRef.afterClosed(), dialogRef.close()` | Mở, theo dõi đóng và đóng dialog. |
| `snack.open()` | Hiện thông báo MatSnackBar. |
| `sidenav.toggle(), sidenav.close()` | Đóng mở menu dọc trong template. |

### RxJS

| Hàm hoặc nhóm phương thức | Mục đích |
| --- | --- |
| `new BehaviorSubject(), asObservable(), next()` | Giữ trạng thái và phát giá trị mới. |
| `pipe(), subscribe(), unsubscribe()` | Kết hợp toán tử, theo dõi và hủy đăng ký luồng. |
| `of(), throwError(), defer()` | Tạo luồng dữ liệu, lỗi hoặc trì hoãn thao tác đến lúc đăng ký. |
| `map(), tap(), catchError()` | Biến đổi dữ liệu, cập nhật trạng thái và xử lý lỗi. |
| `delay(), startWith()` | Tạo độ trễ kết quả và cung cấp giá trị ban đầu. |
| `combineLatest(), switchMap()` | Kết hợp các luồng và chuyển sang luồng đọc mới. |
| `debounceTime(), distinctUntilChanged()` | Giảm lần tìm kiếm khi gõ liên tục hoặc từ khóa không đổi. |
| `firstValueFrom()` | Đổi giá trị đầu tiên của Observable thành Promise trong kiểm thử. |

### HTTP phía trình duyệt

| Hàm hoặc nhóm phương thức | Mục đích |
| --- | --- |
| `HttpClient.get(), post(), put(), patch(), delete()` | Gửi yêu cầu API từ service. |
| `fetch()` | Gửi HTTP thật trong kiểm thử backend. |
| `Response.json(), Headers.get()` | Đọc phản hồi JSON và cookie trả về trong kiểm thử. |

### JavaScript và Web API

| Hàm hoặc nhóm phương thức | Mục đích |
| --- | --- |
| `trim(), toUpperCase(), toLowerCase()` | Chuẩn hóa tên, mã và từ khóa. |
| `String.includes(), startsWith(), split(), slice()` | Tìm chuỗi, kiểm tra tiền tố và tách cookie hoặc đường dẫn. |
| `Array.map(), filter(), find(), some(), includes(), push()` | Duyệt, lọc, tìm, kiểm tra và thêm phần tử. Đây là phương thức trên mảng, không phải RxJS map(). |
| `Number(), String(), Number.isFinite(), Math.max()` | Chuyển kiểu, kiểm tra số hữu hạn và sinh id mới. |
| `toFixed()` | Giữ hai chữ số thập phân cho phần trăm biến động. |
| `RegExp.test()` | Kiểm tra tài khoản, mã cổ phiếu và đường dẫn API. |
| `Object.entries(), Object.fromEntries(), Array.from()` | Chuyển đổi cấu trúc dữ liệu của form. |
| `new FormData(), append(), entries()` | Tạo và đọc FormData minh họa. |
| `JSON.parse(), JSON.stringify()` | Đọc và ghi dữ liệu JSON trong kiểm thử. |
| `new Map(), Map.get(), set(), delete()` | Quản lý phiên đăng nhập trong bộ nhớ server. |
| `Date.now()` | Xác định hạn dùng của phiên. |
| `new Promise(), then(), catch(), import()` | Chờ sự kiện server, xử lý bất đồng bộ và tải component động. |
| `new Error()` | Tạo lỗi nghiệp vụ. |
| `console.log(), console.error()` | Ghi thông báo khởi động và lỗi bootstrap. |

### Backend và cơ sở dữ liệu JSON

| Hàm hoặc nhóm phương thức | Mục đích |
| --- | --- |
| `require()` | Nạp các module CommonJS của backend. |
| `jsonServer.create(), jsonServer.router()` | Tạo ứng dụng và router lưu dữ liệu JSON. |
| `app.disable(), app.use(), app.get(), app.post(), listen()` | Cấu hình middleware, endpoint và khởi động máy chủ. |
| `jsonServer.bodyParser` | Middleware đọc body được truyền vào app.use dưới dạng tham chiếu hàm. |
| `next()` | Chuyển xử lý cho middleware kế tiếp. |
| `res.set(), status(), json(), end(), cookie(), clearCookie()` | Thiết lập header, phản hồi, cookie và trạng thái HTTP. |
| `router.db.has(), get(), set(), read(), value(), write(), find(), push(), some()` | Đọc, truy vấn và ghi dữ liệu thông qua lowdb/lodash chain. |
| `randomBytes(), scryptSync(), timingSafeEqual(), Buffer.from(), Buffer.toString()` | Sinh token/salt, băm mật khẩu, so sánh hash và mã hóa hex. |
| `path.join(), resolve(), dirname()` | Xử lý đường dẫn dữ liệu và thư mục kiểm thử. |

### Kiểm thử

| Hàm hoặc nhóm phương thức | Mục đích |
| --- | --- |
| `describe(), it(), beforeEach(), test()` | Khai báo nhóm, bài kiểm thử và chuẩn bị dữ liệu. |
| `TestBed.configureTestingModule(), compileComponents(), createComponent(), inject()` | Tạo môi trường Angular và lấy thành phần kiểm thử. |
| `provideHttpClientTesting()` | Thay backend HTTP bằng bộ giả lập cho kiểm thử. |
| `fixture.whenStable(), fixture.componentRef.setInput()` | Đợi giao diện ổn định và truyền input cho component. |
| `RouterTestingHarness.create(), harness.navigateByUrl()` | Mở route trong môi trường kiểm thử. |
| `http.expectOne(), TestRequest.flush(), http.verify()` | Kiểm tra yêu cầu HTTP và mô phỏng phản hồi. |
| `expect(), objectContaining(), toBe(), toBeTruthy(), toBeUndefined(), toContain()` | So sánh kết quả với dữ liệu mong đợi. |
| `toHaveBeenCalledWith(), not.toHaveBeenCalled(), rejects.toThrow(), vi.spyOn()` | Kiểm tra sự kiện đã gọi và luồng lỗi. |
| `querySelector(), click()` | Tìm phần tử DOM và mô phỏng click trong kiểm thử. |
| `assert.equal(), notEqual(), match()` | Kiểm tra phản hồi API bằng Node assert. |
| `mkdirSync(), mkdtempSync(), writeFileSync(), readFileSync(), rmSync()` | Tạo, đọc và dọn cơ sở dữ liệu tạm. |
| `server.once(), address(), close()` | Chờ server mở cổng, đọc địa chỉ và đóng sau kiểm thử. |

Tên như signal.set(), dialog.open() hoặc HttpClient.get() trong bảng trên là tên theo API và vai trò. Tên biểu thức chính xác tại từng chỗ gọi như this.busy.set(), this.dialog.open() hoặc this.http.get() nằm ở phần 8.

## 5 Các pipe được gọi gián tiếp bởi Angular

| Pipe trong template | Phương thức xử lý | Chức năng |
| --- | --- | --- |
| currency | CurrencyPipe.transform() | Định dạng giá USD. |
| json | JsonPipe.transform() | Hiển thị giá trị form hoặc model dưới dạng JSON. |
| async | AsyncPipe.transform() | Nhận giá trị của Observable để cập nhật giao diện. |
| stockChange | StockChangePipe.transform() | Định dạng biến động phần trăm. |

## 6 Những thành phần không phải phương thức tự viết

- StockItem.favorite, edit, remove, details, openPage là EventEmitter, không phải năm phương thức của StockItem. Lời gọi thực tế là favorite.emit(stock), edit.emit(stock) và tương tự.
- pending(), saving(), error(), busy(), stocks(), message(), register(), inspect(), submitLabel(), user() và editor() có thể là thao tác đọc signal, không phải phương thức được viết thân hàm riêng. Chẳng hạn register() trong AccountFormComponent đọc input signal, còn UserService.register(credentials) là một phương thức gọi API.
- valueChanges, form.invalid, form.status, form.pristine và form.touched là thuộc tính/Observable, không phải hàm.
- @if, @for và @empty là cú pháp template; không phải hàm JavaScript.
- Tham số callback next và error trong subscribe mô tả cách xử lý kết quả hoặc lỗi. Chúng khác next() của middleware và khác BehaviorSubject.next(value).

Các class không viết phương thức hoặc constructor riêng: `LabsHome` ([src/app/labs/labs-home.ts:1](D:/stock-market/src/app/labs/labs-home.ts:1)), `ReactiveFormLab` ([src/app/labs/reactive-form-lab.ts:1](D:/stock-market/src/app/labs/reactive-form-lab.ts:1)), `Login` ([src/app/login/login.ts:1](D:/stock-market/src/app/login/login.ts:1)), `RegisterComponent` ([src/app/register/register.ts:1](D:/stock-market/src/app/register/register.ts:1)), `GetDataComponent` ([src/app/stock/get-data/get-data.ts:1](D:/stock-market/src/app/stock/get-data/get-data.ts:1)), `PostDataComponent` ([src/app/stock/post-data/post-data.ts:1](D:/stock-market/src/app/stock/post-data/post-data.ts:1)), `StockDetailsComponent` ([src/app/stock/stock-details/stock-details.ts:1](D:/stock-market/src/app/stock/stock-details/stock-details.ts:1)), `StockDetailsDialog` ([src/app/stock/stock-dialogs/stock-dialogs.ts:1](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:1)), `StockDeleteDialog` ([src/app/stock/stock-dialogs/stock-dialogs.ts:1](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:1)), `StockItem` ([src/app/stock/stock-item/stock-item.ts:1](D:/stock-market/src/app/stock/stock-item/stock-item.ts:1)). Các class này sử dụng template, input hoặc logic của component/service khác.

## 7 Toàn bộ callback ẩn danh trong mã nguồn

Có 119 vị trí định nghĩa callback/arrow function không được liệt kê như hàm có tên ở mục 1. Các callback được phân biệt bằng file, dòng và ngữ cảnh. Bao gồm callback tải component động, handler endpoint/middleware, xử lý subscribe và callback kiểm thử.

| STT | Ngữ cảnh | Tham số | Phạm vi | Vị trí |
| --- | --- | --- | --- | --- |
| 1 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:6](D:/stock-market/src/app/app.routes.ts:6) |
| 2 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:6](D:/stock-market/src/app/app.routes.ts:6) |
| 3 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:9](D:/stock-market/src/app/app.routes.ts:9) |
| 4 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:9](D:/stock-market/src/app/app.routes.ts:9) |
| 5 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:13](D:/stock-market/src/app/app.routes.ts:13) |
| 6 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:13](D:/stock-market/src/app/app.routes.ts:13) |
| 7 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:17](D:/stock-market/src/app/app.routes.ts:17) |
| 8 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:17](D:/stock-market/src/app/app.routes.ts:17) |
| 9 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:21](D:/stock-market/src/app/app.routes.ts:21) |
| 10 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:21](D:/stock-market/src/app/app.routes.ts:21) |
| 11 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:24](D:/stock-market/src/app/app.routes.ts:24) |
| 12 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:24](D:/stock-market/src/app/app.routes.ts:24) |
| 13 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:27](D:/stock-market/src/app/app.routes.ts:27) |
| 14 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:27](D:/stock-market/src/app/app.routes.ts:27) |
| 15 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:35](D:/stock-market/src/app/app.routes.ts:35) |
| 16 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:36](D:/stock-market/src/app/app.routes.ts:36) |
| 17 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:41](D:/stock-market/src/app/app.routes.ts:41) |
| 18 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:42](D:/stock-market/src/app/app.routes.ts:42) |
| 19 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:46](D:/stock-market/src/app/app.routes.ts:46) |
| 20 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:46](D:/stock-market/src/app/app.routes.ts:46) |
| 21 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:50](D:/stock-market/src/app/app.routes.ts:50) |
| 22 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:50](D:/stock-market/src/app/app.routes.ts:50) |
| 23 | `loadComponent` | `không có` | Ứng dụng | [src/app/app.routes.ts:54](D:/stock-market/src/app/app.routes.ts:54) |
| 24 | `import().then` | `m` | Ứng dụng | [src/app/app.routes.ts:55](D:/stock-market/src/app/app.routes.ts:55) |
| 25 | `describe` | `không có` | Kiểm thử | [src/app/app.spec.ts:7](D:/stock-market/src/app/app.spec.ts:7) |
| 26 | `it` | `không có` | Kiểm thử | [src/app/app.spec.ts:8](D:/stock-market/src/app/app.spec.ts:8) |
| 27 | `next` | `không có` | Ứng dụng | [src/app/app.ts:42](D:/stock-market/src/app/app.ts:42) |
| 28 | `error` | `error` | Ứng dụng | [src/app/app.ts:43](D:/stock-market/src/app/app.ts:43) |
| 29 | `map` | `authenticated` | Ứng dụng | [src/app/core/auth.guard.ts:13](D:/stock-market/src/app/core/auth.guard.ts:13) |
| 30 | `describe` | `không có` | Kiểm thử | [src/app/core/http.service.spec.ts:7](D:/stock-market/src/app/core/http.service.spec.ts:7) |
| 31 | `it` | `không có` | Kiểm thử | [src/app/core/http.service.spec.ts:8](D:/stock-market/src/app/core/http.service.spec.ts:8) |
| 32 | `describe` | `không có` | Kiểm thử | [src/app/core/stock.service.spec.ts:5](D:/stock-market/src/app/core/stock.service.spec.ts:5) |
| 33 | `it` | `không có` | Kiểm thử | [src/app/core/stock.service.spec.ts:6](D:/stock-market/src/app/core/stock.service.spec.ts:6) |
| 34 | `service.stocks$.subscribe` | `stocks` | Kiểm thử | [src/app/core/stock.service.spec.ts:9](D:/stock-market/src/app/core/stock.service.spec.ts:9) |
| 35 | `map` | `stocks` | Ứng dụng | [src/app/core/stock.service.ts:14](D:/stock-market/src/app/core/stock.service.ts:14) |
| 36 | `stocks.filter` | `s` | Ứng dụng | [src/app/core/stock.service.ts:15](D:/stock-market/src/app/core/stock.service.ts:15) |
| 37 | `defer` | `không có` | Ứng dụng | [src/app/core/stock.service.ts:21](D:/stock-market/src/app/core/stock.service.ts:21) |
| 38 | `this.state.value.find` | `s` | Ứng dụng | [src/app/core/stock.service.ts:22](D:/stock-market/src/app/core/stock.service.ts:22) |
| 39 | `throwError` | `không có` | Ứng dụng | [src/app/core/stock.service.ts:23](D:/stock-market/src/app/core/stock.service.ts:23) |
| 40 | `defer` | `không có` | Ứng dụng | [src/app/core/stock.service.ts:28](D:/stock-market/src/app/core/stock.service.ts:28) |
| 41 | `this.state.value.some` | `s` | Ứng dụng | [src/app/core/stock.service.ts:30](D:/stock-market/src/app/core/stock.service.ts:30) |
| 42 | `throwError` | `không có` | Ứng dụng | [src/app/core/stock.service.ts:31](D:/stock-market/src/app/core/stock.service.ts:31) |
| 43 | `this.state.value.map` | `s` | Ứng dụng | [src/app/core/stock.service.ts:37](D:/stock-market/src/app/core/stock.service.ts:37) |
| 44 | `defer` | `không có` | Ứng dụng | [src/app/core/stock.service.ts:45](D:/stock-market/src/app/core/stock.service.ts:45) |
| 45 | `this.state.value.some` | `s` | Ứng dụng | [src/app/core/stock.service.ts:46](D:/stock-market/src/app/core/stock.service.ts:46) |
| 46 | `throwError` | `không có` | Ứng dụng | [src/app/core/stock.service.ts:47](D:/stock-market/src/app/core/stock.service.ts:47) |
| 47 | `this.state.value.some` | `s` | Ứng dụng | [src/app/core/stock.service.ts:50](D:/stock-market/src/app/core/stock.service.ts:50) |
| 48 | `throwError` | `không có` | Ứng dụng | [src/app/core/stock.service.ts:51](D:/stock-market/src/app/core/stock.service.ts:51) |
| 49 | `this.state.value.map` | `s` | Ứng dụng | [src/app/core/stock.service.ts:54](D:/stock-market/src/app/core/stock.service.ts:54) |
| 50 | `defer` | `không có` | Ứng dụng | [src/app/core/stock.service.ts:60](D:/stock-market/src/app/core/stock.service.ts:60) |
| 51 | `this.state.value.some` | `s` | Ứng dụng | [src/app/core/stock.service.ts:61](D:/stock-market/src/app/core/stock.service.ts:61) |
| 52 | `throwError` | `không có` | Ứng dụng | [src/app/core/stock.service.ts:62](D:/stock-market/src/app/core/stock.service.ts:62) |
| 53 | `this.state.value.filter` | `s` | Ứng dụng | [src/app/core/stock.service.ts:64](D:/stock-market/src/app/core/stock.service.ts:64) |
| 54 | `tap` | `user` | Ứng dụng | [src/app/core/user.service.ts:17](D:/stock-market/src/app/core/user.service.ts:17) |
| 55 | `map` | `không có` | Ứng dụng | [src/app/core/user.service.ts:18](D:/stock-market/src/app/core/user.service.ts:18) |
| 56 | `catchError` | `không có` | Ứng dụng | [src/app/core/user.service.ts:19](D:/stock-market/src/app/core/user.service.ts:19) |
| 57 | `tap` | `user` | Ứng dụng | [src/app/core/user.service.ts:29](D:/stock-market/src/app/core/user.service.ts:29) |
| 58 | `tap` | `user` | Ứng dụng | [src/app/core/user.service.ts:35](D:/stock-market/src/app/core/user.service.ts:35) |
| 59 | `tap` | `không có` | Ứng dụng | [src/app/core/user.service.ts:39](D:/stock-market/src/app/core/user.service.ts:39) |
| 60 | `describe` | `không có` | Kiểm thử | [src/app/create-stock/create-stock.spec.ts:4](D:/stock-market/src/app/create-stock/create-stock.spec.ts:4) |
| 61 | `beforeEach` | `không có` | Kiểm thử | [src/app/create-stock/create-stock.spec.ts:8](D:/stock-market/src/app/create-stock/create-stock.spec.ts:8) |
| 62 | `it` | `không có` | Kiểm thử | [src/app/create-stock/create-stock.spec.ts:18](D:/stock-market/src/app/create-stock/create-stock.spec.ts:18) |
| 63 | `this.stocks().some` | `s` | Ứng dụng | [src/app/labs/component-lab.ts:45](D:/stock-market/src/app/labs/component-lab.ts:45) |
| 64 | `this.stocks().map` | `s` | Ứng dụng | [src/app/labs/component-lab.ts:49](D:/stock-market/src/app/labs/component-lab.ts:49) |
| 65 | `this.stocks.update` | `stocks` | Ứng dụng | [src/app/labs/component-lab.ts:50](D:/stock-market/src/app/labs/component-lab.ts:50) |
| 66 | `this.stocks.update` | `stocks` | Ứng dụng | [src/app/labs/component-lab.ts:54](D:/stock-market/src/app/labs/component-lab.ts:54) |
| 67 | `stocks.map` | `s` | Ứng dụng | [src/app/labs/component-lab.ts:55](D:/stock-market/src/app/labs/component-lab.ts:55) |
| 68 | `this.stocks.update` | `stocks` | Ứng dụng | [src/app/labs/component-lab.ts:59](D:/stock-market/src/app/labs/component-lab.ts:59) |
| 69 | `stocks.filter` | `s` | Ứng dụng | [src/app/labs/component-lab.ts:59](D:/stock-market/src/app/labs/component-lab.ts:59) |
| 70 | `describe` | `không có` | Kiểm thử | [src/app/labs/labs.routes.spec.ts:6](D:/stock-market/src/app/labs/labs.routes.spec.ts:6) |
| 71 | `it` | `không có` | Kiểm thử | [src/app/labs/labs.routes.spec.ts:7](D:/stock-market/src/app/labs/labs.routes.spec.ts:7) |
| 72 | `describe` | `không có` | Kiểm thử | [src/app/login/login.spec.ts:6](D:/stock-market/src/app/login/login.spec.ts:6) |
| 73 | `it` | `không có` | Kiểm thử | [src/app/login/login.spec.ts:7](D:/stock-market/src/app/login/login.spec.ts:7) |
| 74 | `describe` | `không có` | Kiểm thử | [src/app/model/stock.spec.ts:3](D:/stock-market/src/app/model/stock.spec.ts:3) |
| 75 | `it` | `không có` | Kiểm thử | [src/app/model/stock.spec.ts:4](D:/stock-market/src/app/model/stock.spec.ts:4) |
| 76 | `next` | `không có` | Ứng dụng | [src/app/shared/account-form/account-form.ts:35](D:/stock-market/src/app/shared/account-form/account-form.ts:35) |
| 77 | `error` | `error` | Ứng dụng | [src/app/shared/account-form/account-form.ts:41](D:/stock-market/src/app/shared/account-form/account-form.ts:41) |
| 78 | `describe` | `không có` | Kiểm thử | [src/app/shared/stock-form/stock-form.spec.ts:4](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:4) |
| 79 | `it` | `không có` | Kiểm thử | [src/app/shared/stock-form/stock-form.spec.ts:5](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:5) |
| 80 | `Array.from` | `[key, entry]` | Ứng dụng | [src/app/shared/stock-form/stock-form.ts:91](D:/stock-market/src/app/shared/stock-form/stock-form.ts:91) |
| 81 | `next` | `không có` | Ứng dụng | [src/app/stock/create-stock-page/create-stock-page.ts:36](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:36) |
| 82 | `error` | `error` | Ứng dụng | [src/app/stock/create-stock-page/create-stock-page.ts:40](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:40) |
| 83 | `switchMap` | `params` | Ứng dụng | [src/app/stock/stock-details/stock-details.ts:45](D:/stock-market/src/app/stock/stock-details/stock-details.ts:45) |
| 84 | `map` | `stock` | Ứng dụng | [src/app/stock/stock-details/stock-details.ts:47](D:/stock-market/src/app/stock/stock-details/stock-details.ts:47) |
| 85 | `catchError` | `error` | Ứng dụng | [src/app/stock/stock-details/stock-details.ts:48](D:/stock-market/src/app/stock/stock-details/stock-details.ts:48) |
| 86 | `afterNextRender` | `không có` | Ứng dụng | [src/app/stock/stock-dialogs/stock-dialogs.ts:44](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:44) |
| 87 | `next` | `result` | Ứng dụng | [src/app/stock/stock-dialogs/stock-dialogs.ts:52](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:52) |
| 88 | `error` | `error` | Ứng dụng | [src/app/stock/stock-dialogs/stock-dialogs.ts:53](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:53) |
| 89 | `describe` | `không có` | Kiểm thử | [src/app/stock/stock-item/stock-item.spec.ts:5](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:5) |
| 90 | `it` | `không có` | Kiểm thử | [src/app/stock/stock-item/stock-item.spec.ts:6](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:6) |
| 91 | `switchMap` | `[query]` | Ứng dụng | [src/app/stock/stock-list/stock-list.ts:71](D:/stock-market/src/app/stock/stock-list/stock-list.ts:71) |
| 92 | `map` | `stocks` | Ứng dụng | [src/app/stock/stock-list/stock-list.ts:73](D:/stock-market/src/app/stock/stock-list/stock-list.ts:73) |
| 93 | `catchError` | `error` | Ứng dụng | [src/app/stock/stock-list/stock-list.ts:75](D:/stock-market/src/app/stock/stock-list/stock-list.ts:75) |
| 94 | `this.dialog.open().afterClosed().subscribe` | `result` | Ứng dụng | [src/app/stock/stock-list/stock-list.ts:96](D:/stock-market/src/app/stock/stock-list/stock-list.ts:96) |
| 95 | `this.dialog.open().afterClosed().subscribe` | `confirmed` | Ứng dụng | [src/app/stock/stock-list/stock-list.ts:114](D:/stock-market/src/app/stock/stock-list/stock-list.ts:114) |
| 96 | `next` | `không có` | Ứng dụng | [src/app/stock/stock-list/stock-list.ts:123](D:/stock-market/src/app/stock/stock-list/stock-list.ts:123) |
| 97 | `error` | `error` | Ứng dụng | [src/app/stock/stock-list/stock-list.ts:128](D:/stock-market/src/app/stock/stock-list/stock-list.ts:128) |
| 98 | `bootstrapApplication().catch` | `err` | Ứng dụng | [src/main.ts:6](D:/stock-market/src/main.ts:6) |
| 99 | `app.use` | `req, res, next` | Ứng dụng | [server/index.cjs:16](D:/stock-market/server/index.cjs:16) |
| 100 | `<expression>.split().map` | `value` | Ứng dụng | [server/index.cjs:32](D:/stock-market/server/index.cjs:32) |
| 101 | `<expression>.split().map().find` | `value` | Ứng dụng | [server/index.cjs:33](D:/stock-market/server/index.cjs:33) |
| 102 | `app.post /api/auth/register` | `req, res` | Ứng dụng | [server/index.cjs:64](D:/stock-market/server/index.cjs:64) |
| 103 | `users.some` | `user` | Ứng dụng | [server/index.cjs:67](D:/stock-market/server/index.cjs:67) |
| 104 | `users.map` | `user` | Ứng dụng | [server/index.cjs:72](D:/stock-market/server/index.cjs:72) |
| 105 | `app.post /api/auth/login` | `req, res` | Ứng dụng | [server/index.cjs:80](D:/stock-market/server/index.cjs:80) |
| 106 | `router.db.get().find` | `user` | Ứng dụng | [server/index.cjs:83](D:/stock-market/server/index.cjs:83) |
| 107 | `app.get /api/auth/me` | `req, res` | Ứng dụng | [server/index.cjs:92](D:/stock-market/server/index.cjs:92) |
| 108 | `app.post /api/auth/logout` | `req, res` | Ứng dụng | [server/index.cjs:95](D:/stock-market/server/index.cjs:95) |
| 109 | `app.get /api/health` | `_req, res` | Ứng dụng | [server/index.cjs:100](D:/stock-market/server/index.cjs:100) |
| 110 | `app.use /api` | `req, res, next` | Ứng dụng | [server/index.cjs:101](D:/stock-market/server/index.cjs:101) |
| 111 | `router.db.get().value().some` | `s` | Ứng dụng | [server/index.cjs:135](D:/stock-market/server/index.cjs:135) |
| 112 | `app.use` | `_req, res` | Ứng dụng | [server/index.cjs:156](D:/stock-market/server/index.cjs:156) |
| 113 | `app.use` | `error, _req, res, _next` | Ứng dụng | [server/index.cjs:157](D:/stock-market/server/index.cjs:157) |
| 114 | `createServer().listen` | `không có` | Ứng dụng | [server/index.cjs:168](D:/stock-market/server/index.cjs:168) |
| 115 | `test` | `không có` | Kiểm thử | [server/index.test.cjs:7](D:/stock-market/server/index.test.cjs:7) |
| 116 | `NewExpression` | `resolve` | Kiểm thử | [server/index.test.cjs:14](D:/stock-market/server/index.test.cjs:14) |
| 117 | `disk.stocks.find` | `s` | Kiểm thử | [server/index.test.cjs:80](D:/stock-market/server/index.test.cjs:80) |
| 118 | `disk.users.find` | `user` | Kiểm thử | [server/index.test.cjs:81](D:/stock-market/server/index.test.cjs:81) |
| 119 | `NewExpression` | `resolve` | Kiểm thử | [server/index.test.cjs:90](D:/stock-market/server/index.test.cjs:90) |

## 8 Danh sách đích gọi và toàn bộ vị trí sử dụng

Có 835 vị trí lời gọi/khởi tạo/pipe trong kết quả phân tích, ứng với 325 biểu thức đích gọi khác nhau. Mỗi dòng dưới gom một biểu thức và giữ tất cả vị trí, kể cả trong kiểm thử.

Đây là thống kê cú pháp, không phải số lần hàm chạy lúc sử dụng ứng dụng. Biểu thức this.source.getStocks có thể trỏ đến StockService hoặc HttpService tùy route. Ký hiệu () trong chuỗi như this.dialog.open().afterClosed biểu thị kết quả của một lời gọi trước đó; <expression> là receiver phức hợp không có tên biến trực tiếp. Một phép gọi được framework thực hiện gián tiếp chỉ được nêu khi thấy tham chiếu hoặc pipe trong mã nguồn.

| Biểu thức đích gọi | Số vị trí | Các vị trí trong mã |
| --- | --- | --- |
| `<expression>.split` | 1 | [server/index.cjs:30](D:/stock-market/server/index.cjs:30) |
| `<expression>.split().map` | 1 | [server/index.cjs:30](D:/stock-market/server/index.cjs:30) |
| `<expression>.split().map().find` | 1 | [server/index.cjs:30](D:/stock-market/server/index.cjs:30) |
| `afterNextRender` | 1 | [src/app/stock/stock-dialogs/stock-dialogs.ts:44](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:44) |
| `allowed.includes` | 1 | [server/index.cjs:27](D:/stock-market/server/index.cjs:27) |
| `app.disable` | 1 | [server/index.cjs:14](D:/stock-market/server/index.cjs:14) |
| `app.get` | 2 | [server/index.cjs:92](D:/stock-market/server/index.cjs:92); [server/index.cjs:100](D:/stock-market/server/index.cjs:100) |
| `app.post` | 3 | [server/index.cjs:64](D:/stock-market/server/index.cjs:64); [server/index.cjs:80](D:/stock-market/server/index.cjs:80); [server/index.cjs:95](D:/stock-market/server/index.cjs:95) |
| `app.use` | 6 | [server/index.cjs:15](D:/stock-market/server/index.cjs:15); [server/index.cjs:16](D:/stock-market/server/index.cjs:16); [server/index.cjs:101](D:/stock-market/server/index.cjs:101); [server/index.cjs:155](D:/stock-market/server/index.cjs:155); [server/index.cjs:156](D:/stock-market/server/index.cjs:156); [server/index.cjs:157](D:/stock-market/server/index.cjs:157) |
| `Array.from` | 1 | [src/app/shared/stock-form/stock-form.ts:91](D:/stock-market/src/app/shared/stock-form/stock-form.ts:91) |
| `array.includes` | 2 | [server/index.cjs:20](D:/stock-market/server/index.cjs:20); [server/index.cjs:106](D:/stock-market/server/index.cjs:106) |
| `assert.equal` | 29 | [server/index.test.cjs:25](D:/stock-market/server/index.test.cjs:25); [server/index.test.cjs:26](D:/stock-market/server/index.test.cjs:26); [server/index.test.cjs:27](D:/stock-market/server/index.test.cjs:27); [server/index.test.cjs:33](D:/stock-market/server/index.test.cjs:33); [server/index.test.cjs:35](D:/stock-market/server/index.test.cjs:35); [server/index.test.cjs:36](D:/stock-market/server/index.test.cjs:36); [server/index.test.cjs:39](D:/stock-market/server/index.test.cjs:39); [server/index.test.cjs:40](D:/stock-market/server/index.test.cjs:40); [server/index.test.cjs:41](D:/stock-market/server/index.test.cjs:41); [server/index.test.cjs:46](D:/stock-market/server/index.test.cjs:46); [server/index.test.cjs:57](D:/stock-market/server/index.test.cjs:57); [server/index.test.cjs:59](D:/stock-market/server/index.test.cjs:59); [server/index.test.cjs:60](D:/stock-market/server/index.test.cjs:60); [server/index.test.cjs:61](D:/stock-market/server/index.test.cjs:61); [server/index.test.cjs:65](D:/stock-market/server/index.test.cjs:65); [server/index.test.cjs:70](D:/stock-market/server/index.test.cjs:70); [server/index.test.cjs:71](D:/stock-market/server/index.test.cjs:71); [server/index.test.cjs:73](D:/stock-market/server/index.test.cjs:73); [server/index.test.cjs:74](D:/stock-market/server/index.test.cjs:74); [server/index.test.cjs:77](D:/stock-market/server/index.test.cjs:77); [server/index.test.cjs:78](D:/stock-market/server/index.test.cjs:78); [server/index.test.cjs:80](D:/stock-market/server/index.test.cjs:80); [server/index.test.cjs:83](D:/stock-market/server/index.test.cjs:83); [server/index.test.cjs:84](D:/stock-market/server/index.test.cjs:84); [server/index.test.cjs:85](D:/stock-market/server/index.test.cjs:85); [server/index.test.cjs:86](D:/stock-market/server/index.test.cjs:86); [server/index.test.cjs:87](D:/stock-market/server/index.test.cjs:87); [server/index.test.cjs:88](D:/stock-market/server/index.test.cjs:88); [server/index.test.cjs:92](D:/stock-market/server/index.test.cjs:92) |
| `assert.match` | 1 | [server/index.test.cjs:38](D:/stock-market/server/index.test.cjs:38) |
| `assert.notEqual` | 1 | [server/index.test.cjs:82](D:/stock-market/server/index.test.cjs:82) |
| `async \| pipe` | 2 | [src/app/stock/stock-details/stock-details.ts:17](D:/stock-market/src/app/stock/stock-details/stock-details.ts:17); [src/app/stock/stock-list/stock-list.html:28](D:/stock-market/src/app/stock/stock-list/stock-list.html:28) |
| `beforeEach` | 1 | [src/app/create-stock/create-stock.spec.ts:8](D:/stock-market/src/app/create-stock/create-stock.spec.ts:8) |
| `bootstrapApplication` | 1 | [src/main.ts:5](D:/stock-market/src/main.ts:5) |
| `bootstrapApplication().catch` | 1 | [src/main.ts:5](D:/stock-market/src/main.ts:5) |
| `Buffer.from` | 1 | [server/index.cjs:87](D:/stock-market/server/index.cjs:87) |
| `busy` | 3 | [src/app/stock/stock-list/stock-list.html:23](D:/stock-market/src/app/stock/stock-list/stock-list.html:23); [src/app/stock/stock-list/stock-list.html:44](D:/stock-market/src/app/stock/stock-list/stock-list.html:44); [src/app/stock/stock-list/stock-list.html:67](D:/stock-market/src/app/stock/stock-list/stock-list.html:67) |
| `catchError` | 3 | [src/app/core/user.service.ts:19](D:/stock-market/src/app/core/user.service.ts:19); [src/app/stock/stock-details/stock-details.ts:48](D:/stock-market/src/app/stock/stock-details/stock-details.ts:48); [src/app/stock/stock-list/stock-list.ts:75](D:/stock-market/src/app/stock/stock-list/stock-list.ts:75) |
| `change.toFixed` | 1 | [src/app/shared/stock-change.pipe.ts:9](D:/stock-market/src/app/shared/stock-change.pipe.ts:9) |
| `combineLatest` | 1 | [src/app/stock/stock-list/stock-list.ts:67](D:/stock-market/src/app/stock/stock-list/stock-list.ts:67) |
| `combineLatest().pipe` | 1 | [src/app/stock/stock-list/stock-list.ts:67](D:/stock-market/src/app/stock/stock-list/stock-list.ts:67) |
| `Component` | 18 | [src/app/app.ts:9](D:/stock-market/src/app/app.ts:9); [src/app/create-stock/create-stock.ts:6](D:/stock-market/src/app/create-stock/create-stock.ts:6); [src/app/labs/component-lab.ts:7](D:/stock-market/src/app/labs/component-lab.ts:7); [src/app/labs/labs-home.ts:5](D:/stock-market/src/app/labs/labs-home.ts:5); [src/app/labs/reactive-form-lab.ts:4](D:/stock-market/src/app/labs/reactive-form-lab.ts:4); [src/app/login/login.ts:3](D:/stock-market/src/app/login/login.ts:3); [src/app/register/register.ts:4](D:/stock-market/src/app/register/register.ts:4); [src/app/shared/account-form/account-form.ts:10](D:/stock-market/src/app/shared/account-form/account-form.ts:10); [src/app/shared/stock-form/stock-form.ts:21](D:/stock-market/src/app/shared/stock-form/stock-form.ts:21); [src/app/stock/create-stock-page/create-stock-page.ts:10](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:10); [src/app/stock/get-data/get-data.ts:3](D:/stock-market/src/app/stock/get-data/get-data.ts:3); [src/app/stock/post-data/post-data.ts:3](D:/stock-market/src/app/stock/post-data/post-data.ts:3); [src/app/stock/stock-details/stock-details.ts:11](D:/stock-market/src/app/stock/stock-details/stock-details.ts:11); [src/app/stock/stock-dialogs/stock-dialogs.ts:17](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:17); [src/app/stock/stock-dialogs/stock-dialogs.ts:62](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:62); [src/app/stock/stock-dialogs/stock-dialogs.ts:88](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:88); [src/app/stock/stock-item/stock-item.ts:7](D:/stock-market/src/app/stock/stock-item/stock-item.ts:7); [src/app/stock/stock-list/stock-list.ts:40](D:/stock-market/src/app/stock/stock-list/stock-list.ts:40) |
| `component.form.patchValue` | 1 | [src/app/shared/stock-form/stock-form.spec.ts:9](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:9) |
| `component.form.setValue` | 1 | [src/app/shared/stock-form/stock-form.spec.ts:14](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:14) |
| `component.reset` | 1 | [src/app/shared/stock-form/stock-form.spec.ts:26](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:26) |
| `component.submit` | 2 | [src/app/shared/stock-form/stock-form.spec.ts:12](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:12); [src/app/shared/stock-form/stock-form.spec.ts:21](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:21) |
| `console.error` | 1 | [src/main.ts:6](D:/stock-market/src/main.ts:6) |
| `console.log` | 1 | [server/index.cjs:169](D:/stock-market/server/index.cjs:169) |
| `cookie.slice` | 1 | [server/index.cjs:34](D:/stock-market/server/index.cjs:34) |
| `create` | 2 | [src/app/labs/component-lab.ts:36](D:/stock-market/src/app/labs/component-lab.ts:36); [src/app/stock/stock-list/stock-list.html:68](D:/stock-market/src/app/stock/stock-list/stock-list.html:68) |
| `create.flush` | 1 | [src/app/core/http.service.spec.ts:21](D:/stock-market/src/app/core/http.service.spec.ts:21) |
| `created.json` | 1 | [server/index.test.cjs:58](D:/stock-market/server/index.test.cjs:58) |
| `createServer` | 2 | [server/index.cjs:168](D:/stock-market/server/index.cjs:168); [server/index.test.cjs:13](D:/stock-market/server/index.test.cjs:13) |
| `createServer().listen` | 2 | [server/index.cjs:168](D:/stock-market/server/index.cjs:168); [server/index.test.cjs:13](D:/stock-market/server/index.test.cjs:13) |
| `currency \| pipe` | 6 | [src/app/stock/stock-details/stock-details.ts:23](D:/stock-market/src/app/stock/stock-details/stock-details.ts:23); [src/app/stock/stock-details/stock-details.ts:25](D:/stock-market/src/app/stock/stock-details/stock-details.ts:25); [src/app/stock/stock-dialogs/stock-dialogs.ts:72](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:72); [src/app/stock/stock-dialogs/stock-dialogs.ts:74](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:74); [src/app/stock/stock-item/stock-item.html:12](D:/stock-market/src/app/stock/stock-item/stock-item.html:12); [src/app/stock/stock-item/stock-item.html:14](D:/stock-market/src/app/stock/stock-item/stock-item.html:14) |
| `data.append` | 1 | [src/app/shared/stock-form/stock-form.ts:89](D:/stock-market/src/app/shared/stock-form/stock-form.ts:89) |
| `data.entries` | 1 | [src/app/shared/stock-form/stock-form.ts:91](D:/stock-market/src/app/shared/stock-form/stock-form.ts:91) |
| `Date.now` | 2 | [server/index.cjs:35](D:/stock-market/server/index.cjs:35); [server/index.cjs:45](D:/stock-market/server/index.cjs:45) |
| `debounceTime` | 1 | [src/app/stock/stock-list/stock-list.ts:68](D:/stock-market/src/app/stock/stock-list/stock-list.ts:68) |
| `defer` | 4 | [src/app/core/stock.service.ts:21](D:/stock-market/src/app/core/stock.service.ts:21); [src/app/core/stock.service.ts:28](D:/stock-market/src/app/core/stock.service.ts:28); [src/app/core/stock.service.ts:45](D:/stock-market/src/app/core/stock.service.ts:45); [src/app/core/stock.service.ts:60](D:/stock-market/src/app/core/stock.service.ts:60) |
| `defer().pipe` | 4 | [src/app/core/stock.service.ts:21](D:/stock-market/src/app/core/stock.service.ts:21); [src/app/core/stock.service.ts:28](D:/stock-market/src/app/core/stock.service.ts:28); [src/app/core/stock.service.ts:45](D:/stock-market/src/app/core/stock.service.ts:45); [src/app/core/stock.service.ts:60](D:/stock-market/src/app/core/stock.service.ts:60) |
| `delay` | 4 | [src/app/core/stock.service.ts:24](D:/stock-market/src/app/core/stock.service.ts:24); [src/app/core/stock.service.ts:41](D:/stock-market/src/app/core/stock.service.ts:41); [src/app/core/stock.service.ts:56](D:/stock-market/src/app/core/stock.service.ts:56); [src/app/core/stock.service.ts:66](D:/stock-market/src/app/core/stock.service.ts:66) |
| `describe` | 9 | [src/app/app.spec.ts:7](D:/stock-market/src/app/app.spec.ts:7); [src/app/core/http.service.spec.ts:7](D:/stock-market/src/app/core/http.service.spec.ts:7); [src/app/core/stock.service.spec.ts:5](D:/stock-market/src/app/core/stock.service.spec.ts:5); [src/app/create-stock/create-stock.spec.ts:4](D:/stock-market/src/app/create-stock/create-stock.spec.ts:4); [src/app/labs/labs.routes.spec.ts:6](D:/stock-market/src/app/labs/labs.routes.spec.ts:6); [src/app/login/login.spec.ts:6](D:/stock-market/src/app/login/login.spec.ts:6); [src/app/model/stock.spec.ts:3](D:/stock-market/src/app/model/stock.spec.ts:3); [src/app/shared/stock-form/stock-form.spec.ts:4](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:4); [src/app/stock/stock-item/stock-item.spec.ts:5](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:5) |
| `details` | 3 | [src/app/labs/component-lab.ts:25](D:/stock-market/src/app/labs/component-lab.ts:25); [src/app/labs/component-lab.ts:26](D:/stock-market/src/app/labs/component-lab.ts:26); [src/app/stock/stock-list/stock-list.html:48](D:/stock-market/src/app/stock/stock-list/stock-list.html:48) |
| `details.emit` | 1 | [src/app/stock/stock-item/stock-item.html:29](D:/stock-market/src/app/stock/stock-item/stock-item.html:29) |
| `disk.stocks.find` | 1 | [server/index.test.cjs:80](D:/stock-market/server/index.test.cjs:80) |
| `disk.users.find` | 1 | [server/index.test.cjs:81](D:/stock-market/server/index.test.cjs:81) |
| `distinctUntilChanged` | 1 | [src/app/stock/stock-list/stock-list.ts:68](D:/stock-market/src/app/stock/stock-list/stock-list.ts:68) |
| `edit` | 2 | [src/app/labs/component-lab.ts:27](D:/stock-market/src/app/labs/component-lab.ts:27); [src/app/stock/stock-list/stock-list.html:46](D:/stock-market/src/app/stock/stock-list/stock-list.html:46) |
| `edit.emit` | 1 | [src/app/stock/stock-item/stock-item.html:37](D:/stock-market/src/app/stock/stock-item/stock-item.html:37) |
| `error` | 8 | [src/app/stock/create-stock-page/create-stock-page.ts:18](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:18); [src/app/stock/create-stock-page/create-stock-page.ts:19](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:19); [src/app/stock/stock-dialogs/stock-dialogs.ts:23](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:23); [src/app/stock/stock-dialogs/stock-dialogs.ts:24](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:24); [src/app/app.html:47](D:/stock-market/src/app/app.html:47); [src/app/app.html:48](D:/stock-market/src/app/app.html:48); [src/app/shared/account-form/account-form.html:31](D:/stock-market/src/app/shared/account-form/account-form.html:31); [src/app/shared/account-form/account-form.html:32](D:/stock-market/src/app/shared/account-form/account-form.html:32) |
| `errorMessage` | 7 | [src/app/app.ts:43](D:/stock-market/src/app/app.ts:43); [src/app/shared/account-form/account-form.ts:42](D:/stock-market/src/app/shared/account-form/account-form.ts:42); [src/app/stock/create-stock-page/create-stock-page.ts:41](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:41); [src/app/stock/stock-details/stock-details.ts:48](D:/stock-market/src/app/stock/stock-details/stock-details.ts:48); [src/app/stock/stock-dialogs/stock-dialogs.ts:54](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:54); [src/app/stock/stock-list/stock-list.ts:75](D:/stock-market/src/app/stock/stock-list/stock-list.ts:75); [src/app/stock/stock-list/stock-list.ts:130](D:/stock-market/src/app/stock/stock-list/stock-list.ts:130) |
| `exchanges.includes` | 1 | [server/index.cjs:124](D:/stock-market/server/index.cjs:124) |
| `expect` | 32 | [src/app/app.spec.ts:18](D:/stock-market/src/app/app.spec.ts:18); [src/app/app.spec.ts:19](D:/stock-market/src/app/app.spec.ts:19); [src/app/core/http.service.spec.ts:19](D:/stock-market/src/app/core/http.service.spec.ts:19); [src/app/core/http.service.spec.ts:20](D:/stock-market/src/app/core/http.service.spec.ts:20); [src/app/core/http.service.spec.ts:24](D:/stock-market/src/app/core/http.service.spec.ts:24); [src/app/core/http.service.spec.ts:28](D:/stock-market/src/app/core/http.service.spec.ts:28); [src/app/core/http.service.spec.ts:32](D:/stock-market/src/app/core/http.service.spec.ts:32); [src/app/core/stock.service.spec.ts:13](D:/stock-market/src/app/core/stock.service.spec.ts:13); [src/app/core/stock.service.spec.ts:14](D:/stock-market/src/app/core/stock.service.spec.ts:14); [src/app/core/stock.service.spec.ts:15](D:/stock-market/src/app/core/stock.service.spec.ts:15); [src/app/core/stock.service.spec.ts:17](D:/stock-market/src/app/core/stock.service.spec.ts:17); [src/app/core/stock.service.spec.ts:19](D:/stock-market/src/app/core/stock.service.spec.ts:19); [src/app/core/stock.service.spec.ts:20](D:/stock-market/src/app/core/stock.service.spec.ts:20); [src/app/create-stock/create-stock.spec.ts:19](D:/stock-market/src/app/create-stock/create-stock.spec.ts:19); [src/app/labs/labs.routes.spec.ts:11](D:/stock-market/src/app/labs/labs.routes.spec.ts:11); [src/app/labs/labs.routes.spec.ts:12](D:/stock-market/src/app/labs/labs.routes.spec.ts:12); [src/app/labs/labs.routes.spec.ts:16](D:/stock-market/src/app/labs/labs.routes.spec.ts:16); [src/app/labs/labs.routes.spec.ts:17](D:/stock-market/src/app/labs/labs.routes.spec.ts:17); [src/app/login/login.spec.ts:15](D:/stock-market/src/app/login/login.spec.ts:15); [src/app/login/login.spec.ts:16](D:/stock-market/src/app/login/login.spec.ts:16); [src/app/model/stock.spec.ts:5](D:/stock-market/src/app/model/stock.spec.ts:5); [src/app/shared/stock-form/stock-form.spec.ts:8](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:8); [src/app/shared/stock-form/stock-form.spec.ts:10](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:10); [src/app/shared/stock-form/stock-form.spec.ts:13](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:13); [src/app/shared/stock-form/stock-form.spec.ts:22](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:22); [src/app/shared/stock-form/stock-form.spec.ts:25](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:25); [src/app/shared/stock-form/stock-form.spec.ts:27](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:27); [src/app/shared/stock-form/stock-form.spec.ts:28](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:28); [src/app/stock/stock-item/stock-item.spec.ts:12](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:12); [src/app/stock/stock-item/stock-item.spec.ts:13](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:13); [src/app/stock/stock-item/stock-item.spec.ts:16](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:16); [src/app/stock/stock-item/stock-item.spec.ts:17](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:17) |
| `expect.objectContaining` | 1 | [src/app/shared/stock-form/stock-form.spec.ts:23](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:23) |
| `expect().not.toHaveBeenCalled` | 1 | [src/app/shared/stock-form/stock-form.spec.ts:13](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:13) |
| `expect().rejects.toThrow` | 2 | [src/app/core/stock.service.spec.ts:15](D:/stock-market/src/app/core/stock.service.spec.ts:15); [src/app/core/stock.service.spec.ts:20](D:/stock-market/src/app/core/stock.service.spec.ts:20) |
| `expect().toBe` | 14 | [src/app/core/http.service.spec.ts:19](D:/stock-market/src/app/core/http.service.spec.ts:19); [src/app/core/http.service.spec.ts:24](D:/stock-market/src/app/core/http.service.spec.ts:24); [src/app/core/http.service.spec.ts:28](D:/stock-market/src/app/core/http.service.spec.ts:28); [src/app/core/http.service.spec.ts:32](D:/stock-market/src/app/core/http.service.spec.ts:32); [src/app/core/stock.service.spec.ts:13](D:/stock-market/src/app/core/stock.service.spec.ts:13); [src/app/core/stock.service.spec.ts:14](D:/stock-market/src/app/core/stock.service.spec.ts:14); [src/app/core/stock.service.spec.ts:17](D:/stock-market/src/app/core/stock.service.spec.ts:17); [src/app/core/stock.service.spec.ts:19](D:/stock-market/src/app/core/stock.service.spec.ts:19); [src/app/shared/stock-form/stock-form.spec.ts:8](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:8); [src/app/shared/stock-form/stock-form.spec.ts:10](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:10); [src/app/shared/stock-form/stock-form.spec.ts:25](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:25); [src/app/shared/stock-form/stock-form.spec.ts:27](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:27); [src/app/shared/stock-form/stock-form.spec.ts:28](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:28); [src/app/stock/stock-item/stock-item.spec.ts:17](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:17) |
| `expect().toBeTruthy` | 3 | [src/app/create-stock/create-stock.spec.ts:19](D:/stock-market/src/app/create-stock/create-stock.spec.ts:19); [src/app/login/login.spec.ts:16](D:/stock-market/src/app/login/login.spec.ts:16); [src/app/model/stock.spec.ts:5](D:/stock-market/src/app/model/stock.spec.ts:5) |
| `expect().toBeUndefined` | 1 | [src/app/core/http.service.spec.ts:20](D:/stock-market/src/app/core/http.service.spec.ts:20) |
| `expect().toContain` | 9 | [src/app/app.spec.ts:18](D:/stock-market/src/app/app.spec.ts:18); [src/app/app.spec.ts:19](D:/stock-market/src/app/app.spec.ts:19); [src/app/labs/labs.routes.spec.ts:11](D:/stock-market/src/app/labs/labs.routes.spec.ts:11); [src/app/labs/labs.routes.spec.ts:12](D:/stock-market/src/app/labs/labs.routes.spec.ts:12); [src/app/labs/labs.routes.spec.ts:16](D:/stock-market/src/app/labs/labs.routes.spec.ts:16); [src/app/labs/labs.routes.spec.ts:17](D:/stock-market/src/app/labs/labs.routes.spec.ts:17); [src/app/login/login.spec.ts:15](D:/stock-market/src/app/login/login.spec.ts:15); [src/app/stock/stock-item/stock-item.spec.ts:12](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:12); [src/app/stock/stock-item/stock-item.spec.ts:13](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:13) |
| `expect().toHaveBeenCalledWith` | 2 | [src/app/shared/stock-form/stock-form.spec.ts:22](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:22); [src/app/stock/stock-item/stock-item.spec.ts:16](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:16) |
| `favorite` | 2 | [src/app/labs/component-lab.ts:23](D:/stock-market/src/app/labs/component-lab.ts:23); [src/app/stock/stock-list/stock-list.html:45](D:/stock-market/src/app/stock/stock-list/stock-list.html:45) |
| `favorite.emit` | 1 | [src/app/stock/stock-item/stock-item.html:21](D:/stock-market/src/app/stock/stock-item/stock-item.html:21) |
| `favorite.flush` | 1 | [src/app/core/http.service.spec.ts:29](D:/stock-market/src/app/core/http.service.spec.ts:29) |
| `favorite.json` | 1 | [server/index.test.cjs:76](D:/stock-market/server/index.test.cjs:76) |
| `fetch` | 1 | [server/index.test.cjs:18](D:/stock-market/server/index.test.cjs:18) |
| `firstValueFrom` | 6 | [src/app/core/stock.service.spec.ts:10](D:/stock-market/src/app/core/stock.service.spec.ts:10); [src/app/core/stock.service.spec.ts:14](D:/stock-market/src/app/core/stock.service.spec.ts:14); [src/app/core/stock.service.spec.ts:15](D:/stock-market/src/app/core/stock.service.spec.ts:15); [src/app/core/stock.service.spec.ts:16](D:/stock-market/src/app/core/stock.service.spec.ts:16); [src/app/core/stock.service.spec.ts:18](D:/stock-market/src/app/core/stock.service.spec.ts:18); [src/app/core/stock.service.spec.ts:20](D:/stock-market/src/app/core/stock.service.spec.ts:20) |
| `fixture.componentRef.setInput` | 1 | [src/app/stock/stock-item/stock-item.spec.ts:9](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:9) |
| `fixture.whenStable` | 4 | [src/app/app.spec.ts:16](D:/stock-market/src/app/app.spec.ts:16); [src/app/create-stock/create-stock.spec.ts:15](D:/stock-market/src/app/create-stock/create-stock.spec.ts:15); [src/app/login/login.spec.ts:13](D:/stock-market/src/app/login/login.spec.ts:13); [src/app/stock/stock-item/stock-item.spec.ts:10](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:10) |
| `form.getRawValue` | 1 | [src/app/shared/stock-form/stock-form.html:50](D:/stock-market/src/app/shared/stock-form/stock-form.html:50) |
| `form.resetForm` | 1 | [src/app/create-stock/create-stock.ts:37](D:/stock-market/src/app/create-stock/create-stock.ts:37) |
| `harness.navigateByUrl` | 2 | [src/app/labs/labs.routes.spec.ts:10](D:/stock-market/src/app/labs/labs.routes.spec.ts:10); [src/app/labs/labs.routes.spec.ts:15](D:/stock-market/src/app/labs/labs.routes.spec.ts:15) |
| `harness.routeNativeElement.querySelector` | 3 | [src/app/labs/labs.routes.spec.ts:11](D:/stock-market/src/app/labs/labs.routes.spec.ts:11); [src/app/labs/labs.routes.spec.ts:12](D:/stock-market/src/app/labs/labs.routes.spec.ts:12); [src/app/labs/labs.routes.spec.ts:16](D:/stock-market/src/app/labs/labs.routes.spec.ts:16) |
| `http.expectOne` | 6 | [src/app/app.spec.ts:15](D:/stock-market/src/app/app.spec.ts:15); [src/app/core/http.service.spec.ts:16](D:/stock-market/src/app/core/http.service.spec.ts:16); [src/app/core/http.service.spec.ts:18](D:/stock-market/src/app/core/http.service.spec.ts:18); [src/app/core/http.service.spec.ts:23](D:/stock-market/src/app/core/http.service.spec.ts:23); [src/app/core/http.service.spec.ts:27](D:/stock-market/src/app/core/http.service.spec.ts:27); [src/app/core/http.service.spec.ts:31](D:/stock-market/src/app/core/http.service.spec.ts:31) |
| `http.expectOne().flush` | 2 | [src/app/app.spec.ts:15](D:/stock-market/src/app/app.spec.ts:15); [src/app/core/http.service.spec.ts:16](D:/stock-market/src/app/core/http.service.spec.ts:16) |
| `http.verify` | 2 | [src/app/app.spec.ts:20](D:/stock-market/src/app/app.spec.ts:20); [src/app/core/http.service.spec.ts:34](D:/stock-market/src/app/core/http.service.spec.ts:34) |
| `import` | 12 | [src/app/app.routes.ts:6](D:/stock-market/src/app/app.routes.ts:6); [src/app/app.routes.ts:9](D:/stock-market/src/app/app.routes.ts:9); [src/app/app.routes.ts:13](D:/stock-market/src/app/app.routes.ts:13); [src/app/app.routes.ts:17](D:/stock-market/src/app/app.routes.ts:17); [src/app/app.routes.ts:21](D:/stock-market/src/app/app.routes.ts:21); [src/app/app.routes.ts:24](D:/stock-market/src/app/app.routes.ts:24); [src/app/app.routes.ts:27](D:/stock-market/src/app/app.routes.ts:27); [src/app/app.routes.ts:36](D:/stock-market/src/app/app.routes.ts:36); [src/app/app.routes.ts:42](D:/stock-market/src/app/app.routes.ts:42); [src/app/app.routes.ts:46](D:/stock-market/src/app/app.routes.ts:46); [src/app/app.routes.ts:50](D:/stock-market/src/app/app.routes.ts:50); [src/app/app.routes.ts:55](D:/stock-market/src/app/app.routes.ts:55) |
| `import().then` | 12 | [src/app/app.routes.ts:6](D:/stock-market/src/app/app.routes.ts:6); [src/app/app.routes.ts:9](D:/stock-market/src/app/app.routes.ts:9); [src/app/app.routes.ts:13](D:/stock-market/src/app/app.routes.ts:13); [src/app/app.routes.ts:17](D:/stock-market/src/app/app.routes.ts:17); [src/app/app.routes.ts:21](D:/stock-market/src/app/app.routes.ts:21); [src/app/app.routes.ts:24](D:/stock-market/src/app/app.routes.ts:24); [src/app/app.routes.ts:27](D:/stock-market/src/app/app.routes.ts:27); [src/app/app.routes.ts:36](D:/stock-market/src/app/app.routes.ts:36); [src/app/app.routes.ts:42](D:/stock-market/src/app/app.routes.ts:42); [src/app/app.routes.ts:46](D:/stock-market/src/app/app.routes.ts:46); [src/app/app.routes.ts:50](D:/stock-market/src/app/app.routes.ts:50); [src/app/app.routes.ts:55](D:/stock-market/src/app/app.routes.ts:55) |
| `inject` | 28 | [src/app/app.ts:23](D:/stock-market/src/app/app.ts:23); [src/app/app.ts:24](D:/stock-market/src/app/app.ts:24); [src/app/core/auth.guard.ts:7](D:/stock-market/src/app/core/auth.guard.ts:7); [src/app/core/auth.guard.ts:8](D:/stock-market/src/app/core/auth.guard.ts:8); [src/app/core/http.service.ts:9](D:/stock-market/src/app/core/http.service.ts:9); [src/app/core/user.service.ts:12](D:/stock-market/src/app/core/user.service.ts:12); [src/app/shared/account-form/account-form.ts:17](D:/stock-market/src/app/shared/account-form/account-form.ts:17); [src/app/shared/account-form/account-form.ts:18](D:/stock-market/src/app/shared/account-form/account-form.ts:18); [src/app/shared/account-form/account-form.ts:19](D:/stock-market/src/app/shared/account-form/account-form.ts:19); [src/app/shared/account-form/account-form.ts:22](D:/stock-market/src/app/shared/account-form/account-form.ts:22); [src/app/shared/stock-form/stock-form.ts:40](D:/stock-market/src/app/shared/stock-form/stock-form.ts:40); [src/app/stock/create-stock-page/create-stock-page.ts:27](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:27); [src/app/stock/create-stock-page/create-stock-page.ts:28](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:28); [src/app/stock/create-stock-page/create-stock-page.ts:29](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:29); [src/app/stock/stock-details/stock-details.ts:43](D:/stock-market/src/app/stock/stock-details/stock-details.ts:43); [src/app/stock/stock-details/stock-details.ts:44](D:/stock-market/src/app/stock/stock-details/stock-details.ts:44); [src/app/stock/stock-dialogs/stock-dialogs.ts:36](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:36); [src/app/stock/stock-dialogs/stock-dialogs.ts:37](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:37); [src/app/stock/stock-dialogs/stock-dialogs.ts:38](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:38); [src/app/stock/stock-dialogs/stock-dialogs.ts:39](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:39); [src/app/stock/stock-dialogs/stock-dialogs.ts:85](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:85); [src/app/stock/stock-dialogs/stock-dialogs.ts:101](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:101); [src/app/stock/stock-list/stock-list.ts:55](D:/stock-market/src/app/stock/stock-list/stock-list.ts:55); [src/app/stock/stock-list/stock-list.ts:56](D:/stock-market/src/app/stock/stock-list/stock-list.ts:56); [src/app/stock/stock-list/stock-list.ts:57](D:/stock-market/src/app/stock/stock-list/stock-list.ts:57); [src/app/stock/stock-list/stock-list.ts:58](D:/stock-market/src/app/stock/stock-list/stock-list.ts:58); [src/app/stock/stock-list/stock-list.ts:59](D:/stock-market/src/app/stock/stock-list/stock-list.ts:59); [src/app/stock/stock-list/stock-list.ts:60](D:/stock-market/src/app/stock/stock-list/stock-list.ts:60) |
| `inject().nonNullable.group` | 1 | [src/app/shared/account-form/account-form.ts:22](D:/stock-market/src/app/shared/account-form/account-form.ts:22) |
| `inject().paramMap.pipe` | 1 | [src/app/stock/stock-details/stock-details.ts:44](D:/stock-market/src/app/stock/stock-details/stock-details.ts:44) |
| `Injectable` | 3 | [src/app/core/http.service.ts:7](D:/stock-market/src/app/core/http.service.ts:7); [src/app/core/stock.service.ts:6](D:/stock-market/src/app/core/stock.service.ts:6); [src/app/core/user.service.ts:10](D:/stock-market/src/app/core/user.service.ts:10) |
| `input` | 4 | [src/app/shared/account-form/account-form.ts:16](D:/stock-market/src/app/shared/account-form/account-form.ts:16); [src/app/shared/stock-form/stock-form.ts:35](D:/stock-market/src/app/shared/stock-form/stock-form.ts:35); [src/app/shared/stock-form/stock-form.ts:36](D:/stock-market/src/app/shared/stock-form/stock-form.ts:36); [src/app/shared/stock-form/stock-form.ts:37](D:/stock-market/src/app/shared/stock-form/stock-form.ts:37) |
| `Input` | 4 | [src/app/create-stock/create-stock.ts:13](D:/stock-market/src/app/create-stock/create-stock.ts:13); [src/app/create-stock/create-stock.ts:14](D:/stock-market/src/app/create-stock/create-stock.ts:14); [src/app/stock/stock-item/stock-item.ts:14](D:/stock-market/src/app/stock/stock-item/stock-item.ts:14); [src/app/stock/stock-item/stock-item.ts:15](D:/stock-market/src/app/stock/stock-item/stock-item.ts:15) |
| `inspect` | 1 | [src/app/shared/stock-form/stock-form.html:47](D:/stock-market/src/app/shared/stock-form/stock-form.html:47) |
| `it` | 9 | [src/app/app.spec.ts:8](D:/stock-market/src/app/app.spec.ts:8); [src/app/core/http.service.spec.ts:8](D:/stock-market/src/app/core/http.service.spec.ts:8); [src/app/core/stock.service.spec.ts:6](D:/stock-market/src/app/core/stock.service.spec.ts:6); [src/app/create-stock/create-stock.spec.ts:18](D:/stock-market/src/app/create-stock/create-stock.spec.ts:18); [src/app/labs/labs.routes.spec.ts:7](D:/stock-market/src/app/labs/labs.routes.spec.ts:7); [src/app/login/login.spec.ts:7](D:/stock-market/src/app/login/login.spec.ts:7); [src/app/model/stock.spec.ts:4](D:/stock-market/src/app/model/stock.spec.ts:4); [src/app/shared/stock-form/stock-form.spec.ts:5](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:5); [src/app/stock/stock-item/stock-item.spec.ts:6](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:6) |
| `json \| pipe` | 4 | [src/app/create-stock/create-stock.html:95](D:/stock-market/src/app/create-stock/create-stock.html:95); [src/app/shared/stock-form/stock-form.html:50](D:/stock-market/src/app/shared/stock-form/stock-form.html:50); [src/app/shared/stock-form/stock-form.html:56](D:/stock-market/src/app/shared/stock-form/stock-form.html:56); [src/app/shared/stock-form/stock-form.html:58](D:/stock-market/src/app/shared/stock-form/stock-form.html:58) |
| `JSON.parse` | 1 | [server/index.test.cjs:79](D:/stock-market/server/index.test.cjs:79) |
| `JSON.stringify` | 2 | [server/index.test.cjs:12](D:/stock-market/server/index.test.cjs:12); [server/index.test.cjs:21](D:/stock-market/server/index.test.cjs:21) |
| `jsonServer.create` | 1 | [server/index.cjs:7](D:/stock-market/server/index.cjs:7) |
| `jsonServer.router` | 1 | [server/index.cjs:8](D:/stock-market/server/index.cjs:8) |
| `login.headers.get` | 1 | [server/index.test.cjs:47](D:/stock-market/server/index.test.cjs:47) |
| `login.headers.get().split` | 1 | [server/index.test.cjs:47](D:/stock-market/server/index.test.cjs:47) |
| `logout` | 1 | [src/app/app.html:19](D:/stock-market/src/app/app.html:19) |
| `map` | 5 | [src/app/core/auth.guard.ts:12](D:/stock-market/src/app/core/auth.guard.ts:12); [src/app/core/stock.service.ts:14](D:/stock-market/src/app/core/stock.service.ts:14); [src/app/core/user.service.ts:18](D:/stock-market/src/app/core/user.service.ts:18); [src/app/stock/stock-details/stock-details.ts:47](D:/stock-market/src/app/stock/stock-details/stock-details.ts:47); [src/app/stock/stock-list/stock-list.ts:73](D:/stock-market/src/app/stock/stock-list/stock-list.ts:73) |
| `Math.max` | 3 | [src/app/core/stock.service.ts:37](D:/stock-market/src/app/core/stock.service.ts:37); [src/app/labs/component-lab.ts:49](D:/stock-market/src/app/labs/component-lab.ts:49); [server/index.cjs:72](D:/stock-market/server/index.cjs:72) |
| `message` | 2 | [src/app/labs/component-lab.ts:16](D:/stock-market/src/app/labs/component-lab.ts:16); [src/app/labs/component-lab.ts:17](D:/stock-market/src/app/labs/component-lab.ts:17) |
| `mkdirSync` | 1 | [server/index.test.cjs:9](D:/stock-market/server/index.test.cjs:9) |
| `mkdtempSync` | 1 | [server/index.test.cjs:10](D:/stock-market/server/index.test.cjs:10) |
| `new BehaviorSubject` | 2 | [src/app/core/stock.service.ts:8](D:/stock-market/src/app/core/stock.service.ts:8); [src/app/stock/stock-list/stock-list.ts:63](D:/stock-market/src/app/stock/stock-list/stock-list.ts:63) |
| `new Error` | 5 | [src/app/core/stock.service.ts:23](D:/stock-market/src/app/core/stock.service.ts:23); [src/app/core/stock.service.ts:31](D:/stock-market/src/app/core/stock.service.ts:31); [src/app/core/stock.service.ts:47](D:/stock-market/src/app/core/stock.service.ts:47); [src/app/core/stock.service.ts:51](D:/stock-market/src/app/core/stock.service.ts:51); [src/app/core/stock.service.ts:62](D:/stock-market/src/app/core/stock.service.ts:62) |
| `new EventEmitter` | 6 | [src/app/create-stock/create-stock.ts:15](D:/stock-market/src/app/create-stock/create-stock.ts:15); [src/app/stock/stock-item/stock-item.ts:16](D:/stock-market/src/app/stock/stock-item/stock-item.ts:16); [src/app/stock/stock-item/stock-item.ts:17](D:/stock-market/src/app/stock/stock-item/stock-item.ts:17); [src/app/stock/stock-item/stock-item.ts:18](D:/stock-market/src/app/stock/stock-item/stock-item.ts:18); [src/app/stock/stock-item/stock-item.ts:19](D:/stock-market/src/app/stock/stock-item/stock-item.ts:19); [src/app/stock/stock-item/stock-item.ts:20](D:/stock-market/src/app/stock/stock-item/stock-item.ts:20) |
| `new FormControl` | 1 | [src/app/stock/stock-list/stock-list.ts:64](D:/stock-market/src/app/stock/stock-list/stock-list.ts:64) |
| `new FormData` | 1 | [src/app/shared/stock-form/stock-form.ts:88](D:/stock-market/src/app/shared/stock-form/stock-form.ts:88) |
| `new Map` | 1 | [server/index.cjs:9](D:/stock-market/server/index.cjs:9) |
| `new Promise` | 2 | [server/index.test.cjs:14](D:/stock-market/server/index.test.cjs:14); [server/index.test.cjs:90](D:/stock-market/server/index.test.cjs:90) |
| `new Stock` | 9 | [src/app/core/stock.service.spec.ts:11](D:/stock-market/src/app/core/stock.service.spec.ts:11); [src/app/create-stock/create-stock.ts:17](D:/stock-market/src/app/create-stock/create-stock.ts:17); [src/app/create-stock/create-stock.ts:22](D:/stock-market/src/app/create-stock/create-stock.ts:22); [src/app/create-stock/create-stock.ts:34](D:/stock-market/src/app/create-stock/create-stock.ts:34); [src/app/model/stock.spec.ts:5](D:/stock-market/src/app/model/stock.spec.ts:5); [src/app/model/stock.ts:17](D:/stock-market/src/app/model/stock.ts:17); [src/app/model/stock.ts:18](D:/stock-market/src/app/model/stock.ts:18); [src/app/model/stock.ts:19](D:/stock-market/src/app/model/stock.ts:19); [src/app/shared/stock-form/stock-form.ts:74](D:/stock-market/src/app/shared/stock-form/stock-form.ts:74) |
| `new StockService` | 1 | [src/app/core/stock.service.spec.ts:7](D:/stock-market/src/app/core/stock.service.spec.ts:7) |
| `next` | 3 | [server/index.cjs:38](D:/stock-market/server/index.cjs:38); [server/index.cjs:62](D:/stock-market/server/index.cjs:62); [server/index.cjs:153](D:/stock-market/server/index.cjs:153) |
| `Number` | 8 | [src/app/create-stock/create-stock.ts:25](D:/stock-market/src/app/create-stock/create-stock.ts:25); [src/app/create-stock/create-stock.ts:26](D:/stock-market/src/app/create-stock/create-stock.ts:26); [src/app/shared/stock-form/stock-form.ts:77](D:/stock-market/src/app/shared/stock-form/stock-form.ts:77); [src/app/shared/stock-form/stock-form.ts:79](D:/stock-market/src/app/shared/stock-form/stock-form.ts:79); [src/app/shared/stock-form/stock-form.ts:82](D:/stock-market/src/app/shared/stock-form/stock-form.ts:82); [src/app/stock/stock-details/stock-details.ts:46](D:/stock-market/src/app/stock/stock-details/stock-details.ts:46); [server/index.cjs:110](D:/stock-market/server/index.cjs:110); [server/index.cjs:167](D:/stock-market/server/index.cjs:167) |
| `Number.isFinite` | 1 | [server/index.cjs:122](D:/stock-market/server/index.cjs:122) |
| `Object.entries` | 1 | [src/app/shared/stock-form/stock-form.ts:89](D:/stock-market/src/app/shared/stock-form/stock-form.ts:89) |
| `Object.fromEntries` | 1 | [src/app/shared/stock-form/stock-form.ts:90](D:/stock-market/src/app/shared/stock-form/stock-form.ts:90) |
| `of` | 7 | [src/app/core/stock.service.ts:23](D:/stock-market/src/app/core/stock.service.ts:23); [src/app/core/stock.service.ts:40](D:/stock-market/src/app/core/stock.service.ts:40); [src/app/core/stock.service.ts:55](D:/stock-market/src/app/core/stock.service.ts:55); [src/app/core/stock.service.ts:65](D:/stock-market/src/app/core/stock.service.ts:65); [src/app/core/user.service.ts:21](D:/stock-market/src/app/core/user.service.ts:21); [src/app/stock/stock-details/stock-details.ts:48](D:/stock-market/src/app/stock/stock-details/stock-details.ts:48); [src/app/stock/stock-list/stock-list.ts:75](D:/stock-market/src/app/stock/stock-list/stock-list.ts:75) |
| `onSubmit` | 1 | [src/app/create-stock/create-stock.html:4](D:/stock-market/src/app/create-stock/create-stock.html:4) |
| `openPage` | 1 | [src/app/stock/stock-list/stock-list.html:49](D:/stock-market/src/app/stock/stock-list/stock-list.html:49) |
| `openPage.emit` | 1 | [src/app/stock/stock-item/stock-item.html:3](D:/stock-market/src/app/stock/stock-item/stock-item.html:3) |
| `operation.subscribe` | 2 | [src/app/shared/account-form/account-form.ts:34](D:/stock-market/src/app/shared/account-form/account-form.ts:34); [src/app/stock/stock-list/stock-list.ts:122](D:/stock-market/src/app/stock/stock-list/stock-list.ts:122) |
| `operationError` | 2 | [src/app/stock/stock-list/stock-list.html:25](D:/stock-market/src/app/stock/stock-list/stock-list.html:25); [src/app/stock/stock-list/stock-list.html:26](D:/stock-market/src/app/stock/stock-list/stock-list.html:26) |
| `output` | 1 | [src/app/shared/stock-form/stock-form.ts:38](D:/stock-market/src/app/shared/stock-form/stock-form.ts:38) |
| `Output` | 6 | [src/app/create-stock/create-stock.ts:15](D:/stock-market/src/app/create-stock/create-stock.ts:15); [src/app/stock/stock-item/stock-item.ts:16](D:/stock-market/src/app/stock/stock-item/stock-item.ts:16); [src/app/stock/stock-item/stock-item.ts:17](D:/stock-market/src/app/stock/stock-item/stock-item.ts:17); [src/app/stock/stock-item/stock-item.ts:18](D:/stock-market/src/app/stock/stock-item/stock-item.ts:18); [src/app/stock/stock-item/stock-item.ts:19](D:/stock-market/src/app/stock/stock-item/stock-item.ts:19); [src/app/stock/stock-item/stock-item.ts:20](D:/stock-market/src/app/stock/stock-item/stock-item.ts:20) |
| `page.querySelector` | 5 | [src/app/app.spec.ts:18](D:/stock-market/src/app/app.spec.ts:18); [src/app/app.spec.ts:19](D:/stock-market/src/app/app.spec.ts:19); [src/app/login/login.spec.ts:15](D:/stock-market/src/app/login/login.spec.ts:15); [src/app/login/login.spec.ts:16](D:/stock-market/src/app/login/login.spec.ts:16); [src/app/stock/stock-item/stock-item.spec.ts:15](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:15) |
| `page.querySelector().click` | 1 | [src/app/stock/stock-item/stock-item.spec.ts:15](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:15) |
| `params.get` | 1 | [src/app/stock/stock-details/stock-details.ts:46](D:/stock-market/src/app/stock/stock-details/stock-details.ts:46) |
| `path.dirname` | 1 | [server/index.test.cjs:92](D:/stock-market/server/index.test.cjs:92) |
| `path.join` | 3 | [server/index.cjs:6](D:/stock-market/server/index.cjs:6); [server/index.test.cjs:10](D:/stock-market/server/index.test.cjs:10); [server/index.test.cjs:11](D:/stock-market/server/index.test.cjs:11) |
| `path.resolve` | 1 | [server/index.test.cjs:8](D:/stock-market/server/index.test.cjs:8) |
| `pending` | 5 | [src/app/shared/account-form/account-form.html:34](D:/stock-market/src/app/shared/account-form/account-form.html:34); [src/app/shared/account-form/account-form.html:35](D:/stock-market/src/app/shared/account-form/account-form.html:35); [src/app/shared/stock-form/stock-form.html:39](D:/stock-market/src/app/shared/stock-form/stock-form.html:39); [src/app/shared/stock-form/stock-form.html:42](D:/stock-market/src/app/shared/stock-form/stock-form.html:42); [src/app/shared/stock-form/stock-form.html:43](D:/stock-market/src/app/shared/stock-form/stock-form.html:43) |
| `Pipe` | 1 | [src/app/shared/stock-change.pipe.ts:4](D:/stock-market/src/app/shared/stock-change.pipe.ts:4) |
| `provideBrowserGlobalErrorListeners` | 1 | [src/app/app.config.ts:6](D:/stock-market/src/app/app.config.ts:6) |
| `provideHttpClient` | 4 | [src/app/app.config.ts:6](D:/stock-market/src/app/app.config.ts:6); [src/app/app.spec.ts:11](D:/stock-market/src/app/app.spec.ts:11); [src/app/core/http.service.spec.ts:10](D:/stock-market/src/app/core/http.service.spec.ts:10); [src/app/login/login.spec.ts:10](D:/stock-market/src/app/login/login.spec.ts:10) |
| `provideHttpClientTesting` | 2 | [src/app/app.spec.ts:11](D:/stock-market/src/app/app.spec.ts:11); [src/app/core/http.service.spec.ts:10](D:/stock-market/src/app/core/http.service.spec.ts:10) |
| `provideRouter` | 4 | [src/app/app.config.ts:6](D:/stock-market/src/app/app.config.ts:6); [src/app/app.spec.ts:11](D:/stock-market/src/app/app.spec.ts:11); [src/app/labs/labs.routes.spec.ts:8](D:/stock-market/src/app/labs/labs.routes.spec.ts:8); [src/app/login/login.spec.ts:10](D:/stock-market/src/app/login/login.spec.ts:10) |
| `query.trim` | 3 | [src/app/core/http.service.ts:13](D:/stock-market/src/app/core/http.service.ts:13); [src/app/core/http.service.ts:13](D:/stock-market/src/app/core/http.service.ts:13); [src/app/core/stock.service.ts:12](D:/stock-market/src/app/core/stock.service.ts:12) |
| `query.trim().toLowerCase` | 1 | [src/app/core/stock.service.ts:12](D:/stock-market/src/app/core/stock.service.ts:12) |
| `randomBytes` | 2 | [server/index.cjs:43](D:/stock-market/server/index.cjs:43); [server/index.cjs:70](D:/stock-market/server/index.cjs:70) |
| `randomBytes().toString` | 2 | [server/index.cjs:43](D:/stock-market/server/index.cjs:43); [server/index.cjs:70](D:/stock-market/server/index.cjs:70) |
| `readFileSync` | 1 | [server/index.test.cjs:79](D:/stock-market/server/index.test.cjs:79) |
| `ref.close` | 1 | [src/app/stock/stock-dialogs/stock-dialogs.ts:29](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:29) |
| `RegExp.test` | 4 | [server/index.cjs:53](D:/stock-market/server/index.cjs:53); [server/index.cjs:102](D:/stock-market/server/index.cjs:102); [server/index.cjs:107](D:/stock-market/server/index.cjs:107); [server/index.cjs:120](D:/stock-market/server/index.cjs:120) |
| `register` | 7 | [src/app/shared/account-form/account-form.html:3](D:/stock-market/src/app/shared/account-form/account-form.html:3); [src/app/shared/account-form/account-form.html:5](D:/stock-market/src/app/shared/account-form/account-form.html:5); [src/app/shared/account-form/account-form.html:25](D:/stock-market/src/app/shared/account-form/account-form.html:25); [src/app/shared/account-form/account-form.html:35](D:/stock-market/src/app/shared/account-form/account-form.html:35); [src/app/shared/account-form/account-form.html:39](D:/stock-market/src/app/shared/account-form/account-form.html:39); [src/app/shared/account-form/account-form.html:40](D:/stock-market/src/app/shared/account-form/account-form.html:40); [src/app/shared/account-form/account-form.html:41](D:/stock-market/src/app/shared/account-form/account-form.html:41) |
| `register.headers.get` | 2 | [server/index.test.cjs:37](D:/stock-market/server/index.test.cjs:37); [server/index.test.cjs:38](D:/stock-market/server/index.test.cjs:38) |
| `register.headers.get().split` | 1 | [server/index.test.cjs:37](D:/stock-market/server/index.test.cjs:37) |
| `register.json` | 1 | [server/index.test.cjs:34](D:/stock-market/server/index.test.cjs:34) |
| `reload` | 2 | [src/app/stock/stock-list/stock-list.html:23](D:/stock-market/src/app/stock/stock-list/stock-list.html:23); [src/app/stock/stock-list/stock-list.html:34](D:/stock-market/src/app/stock/stock-list/stock-list.html:34) |
| `remove` | 2 | [src/app/labs/component-lab.ts:24](D:/stock-market/src/app/labs/component-lab.ts:24); [src/app/stock/stock-list/stock-list.html:47](D:/stock-market/src/app/stock/stock-list/stock-list.html:47) |
| `remove.emit` | 1 | [src/app/stock/stock-item/stock-item.html:46](D:/stock-market/src/app/stock/stock-item/stock-item.html:46) |
| `remove.flush` | 1 | [src/app/core/http.service.spec.ts:33](D:/stock-market/src/app/core/http.service.spec.ts:33) |
| `req.body.username.toLowerCase` | 1 | [server/index.cjs:83](D:/stock-market/server/index.cjs:83) |
| `req.path.split` | 1 | [server/index.cjs:110](D:/stock-market/server/index.cjs:110) |
| `request` | 21 | [server/index.test.cjs:25](D:/stock-market/server/index.test.cjs:25); [server/index.test.cjs:26](D:/stock-market/server/index.test.cjs:26); [server/index.test.cjs:28](D:/stock-market/server/index.test.cjs:28); [server/index.test.cjs:32](D:/stock-market/server/index.test.cjs:32); [server/index.test.cjs:39](D:/stock-market/server/index.test.cjs:39); [server/index.test.cjs:40](D:/stock-market/server/index.test.cjs:40); [server/index.test.cjs:42](D:/stock-market/server/index.test.cjs:42); [server/index.test.cjs:45](D:/stock-market/server/index.test.cjs:45); [server/index.test.cjs:56](D:/stock-market/server/index.test.cjs:56); [server/index.test.cjs:60](D:/stock-market/server/index.test.cjs:60); [server/index.test.cjs:62](D:/stock-market/server/index.test.cjs:62); [server/index.test.cjs:66](D:/stock-market/server/index.test.cjs:66); [server/index.test.cjs:69](D:/stock-market/server/index.test.cjs:69); [server/index.test.cjs:71](D:/stock-market/server/index.test.cjs:71); [server/index.test.cjs:72](D:/stock-market/server/index.test.cjs:72); [server/index.test.cjs:75](D:/stock-market/server/index.test.cjs:75); [server/index.test.cjs:84](D:/stock-market/server/index.test.cjs:84); [server/index.test.cjs:85](D:/stock-market/server/index.test.cjs:85); [server/index.test.cjs:86](D:/stock-market/server/index.test.cjs:86); [server/index.test.cjs:87](D:/stock-market/server/index.test.cjs:87); [server/index.test.cjs:88](D:/stock-market/server/index.test.cjs:88) |
| `request().json` | 3 | [server/index.test.cjs:40](D:/stock-market/server/index.test.cjs:40); [server/index.test.cjs:69](D:/stock-market/server/index.test.cjs:69); [server/index.test.cjs:71](D:/stock-market/server/index.test.cjs:71) |
| `require` | 8 | [server/index.cjs:1](D:/stock-market/server/index.cjs:1); [server/index.cjs:2](D:/stock-market/server/index.cjs:2); [server/index.cjs:3](D:/stock-market/server/index.cjs:3); [server/index.test.cjs:1](D:/stock-market/server/index.test.cjs:1); [server/index.test.cjs:2](D:/stock-market/server/index.test.cjs:2); [server/index.test.cjs:3](D:/stock-market/server/index.test.cjs:3); [server/index.test.cjs:4](D:/stock-market/server/index.test.cjs:4); [server/index.test.cjs:5](D:/stock-market/server/index.test.cjs:5) |
| `res.clearCookie` | 1 | [server/index.cjs:97](D:/stock-market/server/index.cjs:97) |
| `res.cookie` | 1 | [server/index.cjs:46](D:/stock-market/server/index.cjs:46) |
| `res.json` | 3 | [server/index.cjs:90](D:/stock-market/server/index.cjs:90); [server/index.cjs:93](D:/stock-market/server/index.cjs:93); [server/index.cjs:100](D:/stock-market/server/index.cjs:100) |
| `res.set` | 1 | [server/index.cjs:19](D:/stock-market/server/index.cjs:19) |
| `res.status` | 14 | [server/index.cjs:28](D:/stock-market/server/index.cjs:28); [server/index.cjs:58](D:/stock-market/server/index.cjs:58); [server/index.cjs:68](D:/stock-market/server/index.cjs:68); [server/index.cjs:78](D:/stock-market/server/index.cjs:78); [server/index.cjs:88](D:/stock-market/server/index.cjs:88); [server/index.cjs:93](D:/stock-market/server/index.cjs:93); [server/index.cjs:98](D:/stock-market/server/index.cjs:98); [server/index.cjs:103](D:/stock-market/server/index.cjs:103); [server/index.cjs:105](D:/stock-market/server/index.cjs:105); [server/index.cjs:114](D:/stock-market/server/index.cjs:114); [server/index.cjs:127](D:/stock-market/server/index.cjs:127); [server/index.cjs:137](D:/stock-market/server/index.cjs:137); [server/index.cjs:156](D:/stock-market/server/index.cjs:156); [server/index.cjs:158](D:/stock-market/server/index.cjs:158) |
| `res.status().end` | 1 | [server/index.cjs:98](D:/stock-market/server/index.cjs:98) |
| `res.status().json` | 13 | [server/index.cjs:28](D:/stock-market/server/index.cjs:28); [server/index.cjs:58](D:/stock-market/server/index.cjs:58); [server/index.cjs:68](D:/stock-market/server/index.cjs:68); [server/index.cjs:78](D:/stock-market/server/index.cjs:78); [server/index.cjs:88](D:/stock-market/server/index.cjs:88); [server/index.cjs:93](D:/stock-market/server/index.cjs:93); [server/index.cjs:103](D:/stock-market/server/index.cjs:103); [server/index.cjs:105](D:/stock-market/server/index.cjs:105); [server/index.cjs:114](D:/stock-market/server/index.cjs:114); [server/index.cjs:127](D:/stock-market/server/index.cjs:127); [server/index.cjs:137](D:/stock-market/server/index.cjs:137); [server/index.cjs:156](D:/stock-market/server/index.cjs:156); [server/index.cjs:158](D:/stock-market/server/index.cjs:158) |
| `reset` | 1 | [src/app/shared/stock-form/stock-form.html:39](D:/stock-market/src/app/shared/stock-form/stock-form.html:39) |
| `resetForm` | 1 | [src/app/create-stock/create-stock.html:81](D:/stock-market/src/app/create-stock/create-stock.html:81) |
| `rmSync` | 1 | [server/index.test.cjs:93](D:/stock-market/server/index.test.cjs:93) |
| `router.createUrlTree` | 1 | [src/app/core/auth.guard.ts:15](D:/stock-market/src/app/core/auth.guard.ts:15) |
| `router.db.get` | 5 | [server/index.cjs:66](D:/stock-market/server/index.cjs:66); [server/index.cjs:77](D:/stock-market/server/index.cjs:77); [server/index.cjs:81](D:/stock-market/server/index.cjs:81); [server/index.cjs:108](D:/stock-market/server/index.cjs:108); [server/index.cjs:132](D:/stock-market/server/index.cjs:132) |
| `router.db.get().find` | 2 | [server/index.cjs:81](D:/stock-market/server/index.cjs:81); [server/index.cjs:108](D:/stock-market/server/index.cjs:108) |
| `router.db.get().find().value` | 2 | [server/index.cjs:81](D:/stock-market/server/index.cjs:81); [server/index.cjs:108](D:/stock-market/server/index.cjs:108) |
| `router.db.get().push` | 1 | [server/index.cjs:77](D:/stock-market/server/index.cjs:77) |
| `router.db.get().push().write` | 1 | [server/index.cjs:77](D:/stock-market/server/index.cjs:77) |
| `router.db.get().value` | 2 | [server/index.cjs:66](D:/stock-market/server/index.cjs:66); [server/index.cjs:132](D:/stock-market/server/index.cjs:132) |
| `router.db.get().value().some` | 1 | [server/index.cjs:132](D:/stock-market/server/index.cjs:132) |
| `router.db.has` | 1 | [server/index.cjs:13](D:/stock-market/server/index.cjs:13) |
| `router.db.has().value` | 1 | [server/index.cjs:13](D:/stock-market/server/index.cjs:13) |
| `router.db.read` | 1 | [server/index.cjs:18](D:/stock-market/server/index.cjs:18) |
| `router.db.set` | 1 | [server/index.cjs:13](D:/stock-market/server/index.cjs:13) |
| `router.db.set().write` | 1 | [server/index.cjs:13](D:/stock-market/server/index.cjs:13) |
| `RouterTestingHarness.create` | 1 | [src/app/labs/labs.routes.spec.ts:9](D:/stock-market/src/app/labs/labs.routes.spec.ts:9) |
| `s.code.toUpperCase` | 2 | [src/app/core/stock.service.ts:30](D:/stock-market/src/app/core/stock.service.ts:30); [server/index.cjs:135](D:/stock-market/server/index.cjs:135) |
| `sampleStocks` | 4 | [src/app/core/http.service.spec.ts:14](D:/stock-market/src/app/core/http.service.spec.ts:14); [src/app/core/stock.service.ts:8](D:/stock-market/src/app/core/stock.service.ts:8); [src/app/labs/component-lab.ts:42](D:/stock-market/src/app/labs/component-lab.ts:42); [src/app/stock/stock-item/stock-item.spec.ts:8](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:8) |
| `save` | 2 | [src/app/stock/create-stock-page/create-stock-page.ts:21](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:21); [src/app/stock/stock-dialogs/stock-dialogs.ts:26](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:26) |
| `saving` | 3 | [src/app/stock/create-stock-page/create-stock-page.ts:21](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:21); [src/app/stock/stock-dialogs/stock-dialogs.ts:26](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:26); [src/app/stock/stock-dialogs/stock-dialogs.ts:29](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:29) |
| `scryptSync` | 2 | [server/index.cjs:75](D:/stock-market/server/index.cjs:75); [server/index.cjs:86](D:/stock-market/server/index.cjs:86) |
| `scryptSync().toString` | 1 | [server/index.cjs:75](D:/stock-market/server/index.cjs:75) |
| `server.address` | 1 | [server/index.test.cjs:15](D:/stock-market/server/index.test.cjs:15) |
| `server.close` | 1 | [server/index.test.cjs:90](D:/stock-market/server/index.test.cjs:90) |
| `server.once` | 1 | [server/index.test.cjs:14](D:/stock-market/server/index.test.cjs:14) |
| `service.createStock` | 3 | [src/app/core/http.service.spec.ts:17](D:/stock-market/src/app/core/http.service.spec.ts:17); [src/app/core/stock.service.spec.ts:11](D:/stock-market/src/app/core/stock.service.spec.ts:11); [src/app/core/stock.service.spec.ts:15](D:/stock-market/src/app/core/stock.service.spec.ts:15) |
| `service.createStock().subscribe` | 1 | [src/app/core/http.service.spec.ts:17](D:/stock-market/src/app/core/http.service.spec.ts:17) |
| `service.deleteStock` | 2 | [src/app/core/http.service.spec.ts:30](D:/stock-market/src/app/core/http.service.spec.ts:30); [src/app/core/stock.service.spec.ts:18](D:/stock-market/src/app/core/stock.service.spec.ts:18) |
| `service.deleteStock().subscribe` | 1 | [src/app/core/http.service.spec.ts:30](D:/stock-market/src/app/core/http.service.spec.ts:30) |
| `service.getStock` | 1 | [src/app/core/stock.service.spec.ts:20](D:/stock-market/src/app/core/stock.service.spec.ts:20) |
| `service.getStocks` | 2 | [src/app/core/http.service.spec.ts:15](D:/stock-market/src/app/core/http.service.spec.ts:15); [src/app/core/stock.service.spec.ts:14](D:/stock-market/src/app/core/stock.service.spec.ts:14) |
| `service.getStocks().subscribe` | 1 | [src/app/core/http.service.spec.ts:15](D:/stock-market/src/app/core/http.service.spec.ts:15) |
| `service.stocks$.subscribe` | 1 | [src/app/core/stock.service.spec.ts:9](D:/stock-market/src/app/core/stock.service.spec.ts:9) |
| `service.toggleFavorite` | 2 | [src/app/core/http.service.spec.ts:26](D:/stock-market/src/app/core/http.service.spec.ts:26); [src/app/core/stock.service.spec.ts:16](D:/stock-market/src/app/core/stock.service.spec.ts:16) |
| `service.toggleFavorite().subscribe` | 1 | [src/app/core/http.service.spec.ts:26](D:/stock-market/src/app/core/http.service.spec.ts:26) |
| `service.updateStock` | 1 | [src/app/core/http.service.spec.ts:22](D:/stock-market/src/app/core/http.service.spec.ts:22) |
| `service.updateStock().subscribe` | 1 | [src/app/core/http.service.spec.ts:22](D:/stock-market/src/app/core/http.service.spec.ts:22) |
| `sessions.delete` | 3 | [server/index.cjs:35](D:/stock-market/server/index.cjs:35); [server/index.cjs:42](D:/stock-market/server/index.cjs:42); [server/index.cjs:96](D:/stock-market/server/index.cjs:96) |
| `sessions.get` | 1 | [server/index.cjs:37](D:/stock-market/server/index.cjs:37) |
| `sessions.set` | 1 | [server/index.cjs:45](D:/stock-market/server/index.cjs:45) |
| `sidenav.close` | 4 | [src/app/app.html:36](D:/stock-market/src/app/app.html:36); [src/app/app.html:40](D:/stock-market/src/app/app.html:40); [src/app/app.html:41](D:/stock-market/src/app/app.html:41); [src/app/app.html:42](D:/stock-market/src/app/app.html:42) |
| `sidenav.toggle` | 1 | [src/app/app.html:5](D:/stock-market/src/app/app.html:5) |
| `signal` | 12 | [src/app/app.ts:25](D:/stock-market/src/app/app.ts:25); [src/app/core/user.service.ts:13](D:/stock-market/src/app/core/user.service.ts:13); [src/app/labs/component-lab.ts:42](D:/stock-market/src/app/labs/component-lab.ts:42); [src/app/labs/component-lab.ts:43](D:/stock-market/src/app/labs/component-lab.ts:43); [src/app/shared/account-form/account-form.ts:20](D:/stock-market/src/app/shared/account-form/account-form.ts:20); [src/app/shared/account-form/account-form.ts:21](D:/stock-market/src/app/shared/account-form/account-form.ts:21); [src/app/stock/create-stock-page/create-stock-page.ts:30](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:30); [src/app/stock/create-stock-page/create-stock-page.ts:31](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:31); [src/app/stock/stock-dialogs/stock-dialogs.ts:41](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:41); [src/app/stock/stock-dialogs/stock-dialogs.ts:42](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:42); [src/app/stock/stock-list/stock-list.ts:65](D:/stock-market/src/app/stock/stock-list/stock-list.ts:65); [src/app/stock/stock-list/stock-list.ts:66](D:/stock-market/src/app/stock/stock-list/stock-list.ts:66) |
| `source.updateStock` | 1 | [src/app/stock/stock-dialogs/stock-dialogs.ts:51](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:51) |
| `source.updateStock().subscribe` | 1 | [src/app/stock/stock-dialogs/stock-dialogs.ts:51](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:51) |
| `startSession` | 2 | [server/index.cjs:78](D:/stock-market/server/index.cjs:78); [server/index.cjs:90](D:/stock-market/server/index.cjs:90) |
| `startWith` | 2 | [src/app/stock/stock-list/stock-list.ts:68](D:/stock-market/src/app/stock/stock-list/stock-list.ts:68); [src/app/stock/stock-list/stock-list.ts:74](D:/stock-market/src/app/stock/stock-list/stock-list.ts:74) |
| `stock.code.trim` | 3 | [src/app/core/stock.service.ts:29](D:/stock-market/src/app/core/stock.service.ts:29); [src/app/core/stock.service.ts:49](D:/stock-market/src/app/core/stock.service.ts:49); [server/index.cjs:116](D:/stock-market/server/index.cjs:116) |
| `stock.code.trim().toUpperCase` | 3 | [src/app/core/stock.service.ts:29](D:/stock-market/src/app/core/stock.service.ts:29); [src/app/core/stock.service.ts:49](D:/stock-market/src/app/core/stock.service.ts:49); [server/index.cjs:116](D:/stock-market/server/index.cjs:116) |
| `stock.name.trim` | 5 | [src/app/core/stock.service.ts:35](D:/stock-market/src/app/core/stock.service.ts:35); [src/app/core/stock.service.ts:53](D:/stock-market/src/app/core/stock.service.ts:53); [server/index.cjs:117](D:/stock-market/server/index.cjs:117); [src/app/create-stock/create-stock.html:18](D:/stock-market/src/app/create-stock/create-stock.html:18); [src/app/create-stock/create-stock.html:89](D:/stock-market/src/app/create-stock/create-stock.html:89) |
| `stockChange \| pipe` | 3 | [src/app/stock/stock-details/stock-details.ts:27](D:/stock-market/src/app/stock/stock-details/stock-details.ts:27); [src/app/stock/stock-dialogs/stock-dialogs.ts:76](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:76); [src/app/stock/stock-item/stock-item.html:13](D:/stock-market/src/app/stock/stock-item/stock-item.html:13) |
| `stocks` | 1 | [src/app/labs/component-lab.ts:20](D:/stock-market/src/app/labs/component-lab.ts:20) |
| `stocks.filter` | 2 | [src/app/core/stock.service.ts:15](D:/stock-market/src/app/core/stock.service.ts:15); [src/app/labs/component-lab.ts:59](D:/stock-market/src/app/labs/component-lab.ts:59) |
| `stocks.map` | 1 | [src/app/labs/component-lab.ts:55](D:/stock-market/src/app/labs/component-lab.ts:55) |
| `String` | 3 | [src/app/shared/stock-form/stock-form.ts:18](D:/stock-market/src/app/shared/stock-form/stock-form.ts:18); [src/app/shared/stock-form/stock-form.ts:89](D:/stock-market/src/app/shared/stock-form/stock-form.ts:89); [src/app/shared/stock-form/stock-form.ts:91](D:/stock-market/src/app/shared/stock-form/stock-form.ts:91) |
| `String().trim` | 1 | [src/app/shared/stock-form/stock-form.ts:18](D:/stock-market/src/app/shared/stock-form/stock-form.ts:18) |
| `submit` | 2 | [src/app/shared/account-form/account-form.html:11](D:/stock-market/src/app/shared/account-form/account-form.html:11); [src/app/shared/stock-form/stock-form.html:1](D:/stock-market/src/app/shared/stock-form/stock-form.html:1) |
| `submitLabel` | 1 | [src/app/shared/stock-form/stock-form.html:43](D:/stock-market/src/app/shared/stock-form/stock-form.html:43) |
| `subscription.unsubscribe` | 1 | [src/app/core/stock.service.spec.ts:21](D:/stock-market/src/app/core/stock.service.spec.ts:21) |
| `switchMap` | 2 | [src/app/stock/stock-details/stock-details.ts:45](D:/stock-market/src/app/stock/stock-details/stock-details.ts:45); [src/app/stock/stock-list/stock-list.ts:71](D:/stock-market/src/app/stock/stock-list/stock-list.ts:71) |
| `tap` | 4 | [src/app/core/user.service.ts:17](D:/stock-market/src/app/core/user.service.ts:17); [src/app/core/user.service.ts:29](D:/stock-market/src/app/core/user.service.ts:29); [src/app/core/user.service.ts:35](D:/stock-market/src/app/core/user.service.ts:35); [src/app/core/user.service.ts:39](D:/stock-market/src/app/core/user.service.ts:39) |
| `target.startsWith` | 2 | [src/app/shared/account-form/account-form.ts:38](D:/stock-market/src/app/shared/account-form/account-form.ts:38); [src/app/shared/account-form/account-form.ts:38](D:/stock-market/src/app/shared/account-form/account-form.ts:38) |
| `templateString.toLowerCase` | 1 | [src/app/core/stock.service.ts:15](D:/stock-market/src/app/core/stock.service.ts:15) |
| `templateString.toLowerCase().includes` | 1 | [src/app/core/stock.service.ts:15](D:/stock-market/src/app/core/stock.service.ts:15) |
| `test` | 1 | [server/index.test.cjs:7](D:/stock-market/server/index.test.cjs:7) |
| `TestBed.configureTestingModule` | 5 | [src/app/app.spec.ts:9](D:/stock-market/src/app/app.spec.ts:9); [src/app/core/http.service.spec.ts:9](D:/stock-market/src/app/core/http.service.spec.ts:9); [src/app/create-stock/create-stock.spec.ts:9](D:/stock-market/src/app/create-stock/create-stock.spec.ts:9); [src/app/labs/labs.routes.spec.ts:8](D:/stock-market/src/app/labs/labs.routes.spec.ts:8); [src/app/login/login.spec.ts:8](D:/stock-market/src/app/login/login.spec.ts:8) |
| `TestBed.configureTestingModule().compileComponents` | 1 | [src/app/create-stock/create-stock.spec.ts:9](D:/stock-market/src/app/create-stock/create-stock.spec.ts:9) |
| `TestBed.createComponent` | 5 | [src/app/app.spec.ts:13](D:/stock-market/src/app/app.spec.ts:13); [src/app/create-stock/create-stock.spec.ts:13](D:/stock-market/src/app/create-stock/create-stock.spec.ts:13); [src/app/login/login.spec.ts:12](D:/stock-market/src/app/login/login.spec.ts:12); [src/app/shared/stock-form/stock-form.spec.ts:6](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:6); [src/app/stock/stock-item/stock-item.spec.ts:7](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:7) |
| `TestBed.inject` | 3 | [src/app/app.spec.ts:14](D:/stock-market/src/app/app.spec.ts:14); [src/app/core/http.service.spec.ts:12](D:/stock-market/src/app/core/http.service.spec.ts:12); [src/app/core/http.service.spec.ts:13](D:/stock-market/src/app/core/http.service.spec.ts:13) |
| `this.api.createStock` | 1 | [src/app/stock/create-stock-page/create-stock-page.ts:35](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:35) |
| `this.api.createStock().subscribe` | 1 | [src/app/stock/create-stock-page/create-stock-page.ts:35](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:35) |
| `this.api.getStock` | 1 | [src/app/stock/stock-details/stock-details.ts:46](D:/stock-market/src/app/stock/stock-details/stock-details.ts:46) |
| `this.api.getStock().pipe` | 1 | [src/app/stock/stock-details/stock-details.ts:46](D:/stock-market/src/app/stock/stock-details/stock-details.ts:46) |
| `this.builder.nonNullable.group` | 1 | [src/app/shared/stock-form/stock-form.ts:41](D:/stock-market/src/app/shared/stock-form/stock-form.ts:41) |
| `this.busy` | 1 | [src/app/stock/stock-list/stock-list.ts:119](D:/stock-market/src/app/stock/stock-list/stock-list.ts:119) |
| `this.busy.set` | 3 | [src/app/stock/stock-list/stock-list.ts:120](D:/stock-market/src/app/stock/stock-list/stock-list.ts:120); [src/app/stock/stock-list/stock-list.ts:124](D:/stock-market/src/app/stock/stock-list/stock-list.ts:124); [src/app/stock/stock-list/stock-list.ts:129](D:/stock-market/src/app/stock/stock-list/stock-list.ts:129) |
| `this.created.emit` | 1 | [src/app/create-stock/create-stock.ts:31](D:/stock-market/src/app/create-stock/create-stock.ts:31) |
| `this.details` | 1 | [src/app/stock/stock-list/stock-list.ts:107](D:/stock-market/src/app/stock/stock-list/stock-list.ts:107) |
| `this.dialog.open` | 3 | [src/app/stock/stock-list/stock-list.ts:89](D:/stock-market/src/app/stock/stock-list/stock-list.ts:89); [src/app/stock/stock-list/stock-list.ts:104](D:/stock-market/src/app/stock/stock-list/stock-list.ts:104); [src/app/stock/stock-list/stock-list.ts:111](D:/stock-market/src/app/stock/stock-list/stock-list.ts:111) |
| `this.dialog.open().afterClosed` | 2 | [src/app/stock/stock-list/stock-list.ts:89](D:/stock-market/src/app/stock/stock-list/stock-list.ts:89); [src/app/stock/stock-list/stock-list.ts:111](D:/stock-market/src/app/stock/stock-list/stock-list.ts:111) |
| `this.dialog.open().afterClosed().subscribe` | 2 | [src/app/stock/stock-list/stock-list.ts:89](D:/stock-market/src/app/stock/stock-list/stock-list.ts:89); [src/app/stock/stock-list/stock-list.ts:111](D:/stock-market/src/app/stock/stock-list/stock-list.ts:111) |
| `this.editor` | 1 | [src/app/stock/stock-dialogs/stock-dialogs.ts:44](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:44) |
| `this.editor().setStock` | 1 | [src/app/stock/stock-dialogs/stock-dialogs.ts:44](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:44) |
| `this.error.set` | 7 | [src/app/app.ts:43](D:/stock-market/src/app/app.ts:43); [src/app/shared/account-form/account-form.ts:30](D:/stock-market/src/app/shared/account-form/account-form.ts:30); [src/app/shared/account-form/account-form.ts:42](D:/stock-market/src/app/shared/account-form/account-form.ts:42); [src/app/stock/create-stock-page/create-stock-page.ts:34](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:34); [src/app/stock/create-stock-page/create-stock-page.ts:41](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:41); [src/app/stock/stock-dialogs/stock-dialogs.ts:48](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:48); [src/app/stock/stock-dialogs/stock-dialogs.ts:54](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:54) |
| `this.form.getRawValue` | 3 | [src/app/shared/account-form/account-form.ts:32](D:/stock-market/src/app/shared/account-form/account-form.ts:32); [src/app/shared/account-form/account-form.ts:33](D:/stock-market/src/app/shared/account-form/account-form.ts:33); [src/app/shared/stock-form/stock-form.ts:73](D:/stock-market/src/app/shared/stock-form/stock-form.ts:73) |
| `this.form.markAllAsTouched` | 2 | [src/app/shared/account-form/account-form.ts:27](D:/stock-market/src/app/shared/account-form/account-form.ts:27); [src/app/shared/stock-form/stock-form.ts:71](D:/stock-market/src/app/shared/stock-form/stock-form.ts:71) |
| `this.form.reset` | 2 | [src/app/shared/stock-form/stock-form.ts:54](D:/stock-market/src/app/shared/stock-form/stock-form.ts:54); [src/app/shared/stock-form/stock-form.ts:67](D:/stock-market/src/app/shared/stock-form/stock-form.ts:67) |
| `this.http.delete` | 1 | [src/app/core/http.service.ts:30](D:/stock-market/src/app/core/http.service.ts:30) |
| `this.http.get` | 3 | [src/app/core/http.service.ts:13](D:/stock-market/src/app/core/http.service.ts:13); [src/app/core/http.service.ts:17](D:/stock-market/src/app/core/http.service.ts:17); [src/app/core/user.service.ts:16](D:/stock-market/src/app/core/user.service.ts:16) |
| `this.http.get().pipe` | 1 | [src/app/core/user.service.ts:16](D:/stock-market/src/app/core/user.service.ts:16) |
| `this.http.patch` | 1 | [src/app/core/http.service.ts:34](D:/stock-market/src/app/core/http.service.ts:34) |
| `this.http.post` | 4 | [src/app/core/http.service.ts:22](D:/stock-market/src/app/core/http.service.ts:22); [src/app/core/user.service.ts:27](D:/stock-market/src/app/core/user.service.ts:27); [src/app/core/user.service.ts:33](D:/stock-market/src/app/core/user.service.ts:33); [src/app/core/user.service.ts:39](D:/stock-market/src/app/core/user.service.ts:39) |
| `this.http.post().pipe` | 3 | [src/app/core/user.service.ts:27](D:/stock-market/src/app/core/user.service.ts:27); [src/app/core/user.service.ts:33](D:/stock-market/src/app/core/user.service.ts:33); [src/app/core/user.service.ts:39](D:/stock-market/src/app/core/user.service.ts:39) |
| `this.http.put` | 1 | [src/app/core/http.service.ts:26](D:/stock-market/src/app/core/http.service.ts:26) |
| `this.message.set` | 4 | [src/app/labs/component-lab.ts:46](D:/stock-market/src/app/labs/component-lab.ts:46); [src/app/labs/component-lab.ts:51](D:/stock-market/src/app/labs/component-lab.ts:51); [src/app/labs/component-lab.ts:62](D:/stock-market/src/app/labs/component-lab.ts:62); [src/app/labs/component-lab.ts:65](D:/stock-market/src/app/labs/component-lab.ts:65) |
| `this.mutate` | 3 | [src/app/stock/stock-list/stock-list.ts:83](D:/stock-market/src/app/stock/stock-list/stock-list.ts:83); [src/app/stock/stock-list/stock-list.ts:86](D:/stock-market/src/app/stock/stock-list/stock-list.ts:86); [src/app/stock/stock-list/stock-list.ts:115](D:/stock-market/src/app/stock/stock-list/stock-list.ts:115) |
| `this.notify` | 2 | [src/app/stock/stock-list/stock-list.ts:99](D:/stock-market/src/app/stock/stock-list/stock-list.ts:99); [src/app/stock/stock-list/stock-list.ts:126](D:/stock-market/src/app/stock/stock-list/stock-list.ts:126) |
| `this.operationError.set` | 2 | [src/app/stock/stock-list/stock-list.ts:121](D:/stock-market/src/app/stock/stock-list/stock-list.ts:121); [src/app/stock/stock-list/stock-list.ts:130](D:/stock-market/src/app/stock/stock-list/stock-list.ts:130) |
| `this.pending` | 2 | [src/app/shared/account-form/account-form.ts:28](D:/stock-market/src/app/shared/account-form/account-form.ts:28); [src/app/shared/stock-form/stock-form.ts:72](D:/stock-market/src/app/shared/stock-form/stock-form.ts:72) |
| `this.pending.set` | 2 | [src/app/shared/account-form/account-form.ts:29](D:/stock-market/src/app/shared/account-form/account-form.ts:29); [src/app/shared/account-form/account-form.ts:43](D:/stock-market/src/app/shared/account-form/account-form.ts:43) |
| `this.ref.close` | 1 | [src/app/stock/stock-dialogs/stock-dialogs.ts:52](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:52) |
| `this.refresh.next` | 1 | [src/app/stock/stock-list/stock-list.ts:80](D:/stock-market/src/app/stock/stock-list/stock-list.ts:80) |
| `this.register` | 1 | [src/app/shared/account-form/account-form.ts:31](D:/stock-market/src/app/shared/account-form/account-form.ts:31) |
| `this.reload` | 2 | [src/app/stock/stock-list/stock-list.ts:98](D:/stock-market/src/app/stock/stock-list/stock-list.ts:98); [src/app/stock/stock-list/stock-list.ts:125](D:/stock-market/src/app/stock/stock-list/stock-list.ts:125) |
| `this.route.snapshot.queryParamMap.get` | 1 | [src/app/shared/account-form/account-form.ts:36](D:/stock-market/src/app/shared/account-form/account-form.ts:36) |
| `this.router.navigate` | 3 | [src/app/app.ts:42](D:/stock-market/src/app/app.ts:42); [src/app/stock/create-stock-page/create-stock-page.ts:38](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:38); [src/app/stock/stock-list/stock-list.ts:108](D:/stock-market/src/app/stock/stock-list/stock-list.ts:108) |
| `this.router.navigateByUrl` | 1 | [src/app/shared/account-form/account-form.ts:37](D:/stock-market/src/app/shared/account-form/account-form.ts:37) |
| `this.saving.set` | 4 | [src/app/stock/create-stock-page/create-stock-page.ts:33](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:33); [src/app/stock/create-stock-page/create-stock-page.ts:42](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:42); [src/app/stock/stock-dialogs/stock-dialogs.ts:47](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:47); [src/app/stock/stock-dialogs/stock-dialogs.ts:55](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:55) |
| `this.search.valueChanges.pipe` | 1 | [src/app/stock/stock-list/stock-list.ts:68](D:/stock-market/src/app/stock/stock-list/stock-list.ts:68) |
| `this.setStock` | 1 | [src/app/shared/stock-form/stock-form.ts:66](D:/stock-market/src/app/shared/stock-form/stock-form.ts:66) |
| `this.snack.open` | 2 | [src/app/stock/create-stock-page/create-stock-page.ts:37](D:/stock-market/src/app/stock/create-stock-page/create-stock-page.ts:37); [src/app/stock/stock-list/stock-list.ts:135](D:/stock-market/src/app/stock/stock-list/stock-list.ts:135) |
| `this.source.createStock` | 1 | [src/app/stock/stock-list/stock-list.ts:86](D:/stock-market/src/app/stock/stock-list/stock-list.ts:86) |
| `this.source.deleteStock` | 1 | [src/app/stock/stock-list/stock-list.ts:115](D:/stock-market/src/app/stock/stock-list/stock-list.ts:115) |
| `this.source.getStocks` | 1 | [src/app/stock/stock-list/stock-list.ts:72](D:/stock-market/src/app/stock/stock-list/stock-list.ts:72) |
| `this.source.getStocks().pipe` | 1 | [src/app/stock/stock-list/stock-list.ts:72](D:/stock-market/src/app/stock/stock-list/stock-list.ts:72) |
| `this.source.toggleFavorite` | 1 | [src/app/stock/stock-list/stock-list.ts:83](D:/stock-market/src/app/stock/stock-list/stock-list.ts:83) |
| `this.state.asObservable` | 1 | [src/app/core/stock.service.ts:9](D:/stock-market/src/app/core/stock.service.ts:9) |
| `this.state.next` | 3 | [src/app/core/stock.service.ts:39](D:/stock-market/src/app/core/stock.service.ts:39); [src/app/core/stock.service.ts:54](D:/stock-market/src/app/core/stock.service.ts:54); [src/app/core/stock.service.ts:64](D:/stock-market/src/app/core/stock.service.ts:64) |
| `this.state.value.filter` | 1 | [src/app/core/stock.service.ts:64](D:/stock-market/src/app/core/stock.service.ts:64) |
| `this.state.value.find` | 1 | [src/app/core/stock.service.ts:22](D:/stock-market/src/app/core/stock.service.ts:22) |
| `this.state.value.map` | 2 | [src/app/core/stock.service.ts:37](D:/stock-market/src/app/core/stock.service.ts:37); [src/app/core/stock.service.ts:54](D:/stock-market/src/app/core/stock.service.ts:54) |
| `this.state.value.some` | 4 | [src/app/core/stock.service.ts:30](D:/stock-market/src/app/core/stock.service.ts:30); [src/app/core/stock.service.ts:46](D:/stock-market/src/app/core/stock.service.ts:46); [src/app/core/stock.service.ts:50](D:/stock-market/src/app/core/stock.service.ts:50); [src/app/core/stock.service.ts:61](D:/stock-market/src/app/core/stock.service.ts:61) |
| `this.stock.code.toUpperCase` | 1 | [src/app/create-stock/create-stock.ts:24](D:/stock-market/src/app/create-stock/create-stock.ts:24) |
| `this.stock.name.trim` | 2 | [src/app/create-stock/create-stock.ts:21](D:/stock-market/src/app/create-stock/create-stock.ts:21); [src/app/create-stock/create-stock.ts:23](D:/stock-market/src/app/create-stock/create-stock.ts:23) |
| `this.stocks` | 2 | [src/app/labs/component-lab.ts:45](D:/stock-market/src/app/labs/component-lab.ts:45); [src/app/labs/component-lab.ts:49](D:/stock-market/src/app/labs/component-lab.ts:49) |
| `this.stocks.update` | 3 | [src/app/labs/component-lab.ts:50](D:/stock-market/src/app/labs/component-lab.ts:50); [src/app/labs/component-lab.ts:54](D:/stock-market/src/app/labs/component-lab.ts:54); [src/app/labs/component-lab.ts:59](D:/stock-market/src/app/labs/component-lab.ts:59) |
| `this.stocks().map` | 1 | [src/app/labs/component-lab.ts:49](D:/stock-market/src/app/labs/component-lab.ts:49) |
| `this.stocks().some` | 1 | [src/app/labs/component-lab.ts:45](D:/stock-market/src/app/labs/component-lab.ts:45) |
| `this.stocks$.pipe` | 1 | [src/app/core/stock.service.ts:13](D:/stock-market/src/app/core/stock.service.ts:13) |
| `this.submitted.emit` | 1 | [src/app/shared/stock-form/stock-form.ts:94](D:/stock-market/src/app/shared/stock-form/stock-form.ts:94) |
| `this.updateStock` | 1 | [src/app/core/stock.service.ts:70](D:/stock-market/src/app/core/stock.service.ts:70) |
| `this.user.set` | 5 | [src/app/core/user.service.ts:17](D:/stock-market/src/app/core/user.service.ts:17); [src/app/core/user.service.ts:20](D:/stock-market/src/app/core/user.service.ts:20); [src/app/core/user.service.ts:29](D:/stock-market/src/app/core/user.service.ts:29); [src/app/core/user.service.ts:35](D:/stock-market/src/app/core/user.service.ts:35); [src/app/core/user.service.ts:39](D:/stock-market/src/app/core/user.service.ts:39) |
| `this.users.login` | 1 | [src/app/shared/account-form/account-form.ts:33](D:/stock-market/src/app/shared/account-form/account-form.ts:33) |
| `this.users.logout` | 1 | [src/app/app.ts:41](D:/stock-market/src/app/app.ts:41) |
| `this.users.logout().subscribe` | 1 | [src/app/app.ts:41](D:/stock-market/src/app/app.ts:41) |
| `this.users.register` | 1 | [src/app/shared/account-form/account-form.ts:32](D:/stock-market/src/app/shared/account-form/account-form.ts:32) |
| `this.users.restore` | 1 | [src/app/app.ts:38](D:/stock-market/src/app/app.ts:38) |
| `this.users.restore().subscribe` | 1 | [src/app/app.ts:38](D:/stock-market/src/app/app.ts:38) |
| `throwError` | 5 | [src/app/core/stock.service.ts:23](D:/stock-market/src/app/core/stock.service.ts:23); [src/app/core/stock.service.ts:31](D:/stock-market/src/app/core/stock.service.ts:31); [src/app/core/stock.service.ts:47](D:/stock-market/src/app/core/stock.service.ts:47); [src/app/core/stock.service.ts:51](D:/stock-market/src/app/core/stock.service.ts:51); [src/app/core/stock.service.ts:62](D:/stock-market/src/app/core/stock.service.ts:62) |
| `timingSafeEqual` | 1 | [server/index.cjs:87](D:/stock-market/server/index.cjs:87) |
| `update.flush` | 1 | [src/app/core/http.service.spec.ts:25](D:/stock-market/src/app/core/http.service.spec.ts:25) |
| `updated.json` | 1 | [server/index.test.cjs:74](D:/stock-market/server/index.test.cjs:74) |
| `user.username.toLowerCase` | 2 | [server/index.cjs:67](D:/stock-market/server/index.cjs:67); [server/index.cjs:83](D:/stock-market/server/index.cjs:83) |
| `username.toLowerCase` | 1 | [server/index.cjs:67](D:/stock-market/server/index.cjs:67) |
| `users.map` | 1 | [server/index.cjs:72](D:/stock-market/server/index.cjs:72) |
| `users.restore` | 1 | [src/app/core/auth.guard.ts:9](D:/stock-market/src/app/core/auth.guard.ts:9) |
| `users.restore().pipe` | 1 | [src/app/core/auth.guard.ts:9](D:/stock-market/src/app/core/auth.guard.ts:9) |
| `users.some` | 1 | [server/index.cjs:67](D:/stock-market/server/index.cjs:67) |
| `users.user` | 1 | [src/app/app.html:17](D:/stock-market/src/app/app.html:17) |
| `Validators.maxLength` | 1 | [src/app/shared/account-form/account-form.ts:24](D:/stock-market/src/app/shared/account-form/account-form.ts:24) |
| `Validators.min` | 1 | [src/app/shared/stock-form/stock-form.ts:44](D:/stock-market/src/app/shared/stock-form/stock-form.ts:44) |
| `Validators.minLength` | 1 | [src/app/shared/account-form/account-form.ts:24](D:/stock-market/src/app/shared/account-form/account-form.ts:24) |
| `Validators.pattern` | 2 | [src/app/shared/account-form/account-form.ts:23](D:/stock-market/src/app/shared/account-form/account-form.ts:23); [src/app/shared/stock-form/stock-form.ts:43](D:/stock-market/src/app/shared/stock-form/stock-form.ts:43) |
| `value.code.toUpperCase` | 1 | [src/app/shared/stock-form/stock-form.ts:76](D:/stock-market/src/app/shared/stock-form/stock-form.ts:76) |
| `value.name.trim` | 1 | [src/app/shared/stock-form/stock-form.ts:75](D:/stock-market/src/app/shared/stock-form/stock-form.ts:75) |
| `value.startsWith` | 1 | [server/index.cjs:33](D:/stock-market/server/index.cjs:33) |
| `value.trim` | 1 | [server/index.cjs:32](D:/stock-market/server/index.cjs:32) |
| `vi.spyOn` | 2 | [src/app/shared/stock-form/stock-form.spec.ts:11](D:/stock-market/src/app/shared/stock-form/stock-form.spec.ts:11); [src/app/stock/stock-item/stock-item.spec.ts:14](D:/stock-market/src/app/stock/stock-item/stock-item.spec.ts:14) |
| `viewChild.required` | 1 | [src/app/stock/stock-dialogs/stock-dialogs.ts:40](D:/stock-market/src/app/stock/stock-dialogs/stock-dialogs.ts:40) |
| `writeFileSync` | 1 | [server/index.test.cjs:12](D:/stock-market/server/index.test.cjs:12) |

## 9 Phạm vi file đã phân tích

- `src/app/app.config.ts`
- `src/app/app.html`
- `src/app/app.routes.ts`
- `src/app/app.spec.ts`
- `src/app/app.ts`
- `src/app/core/auth.guard.ts`
- `src/app/core/errors.ts`
- `src/app/core/http.service.spec.ts`
- `src/app/core/http.service.ts`
- `src/app/core/stock.service.spec.ts`
- `src/app/core/stock.service.ts`
- `src/app/core/user.service.ts`
- `src/app/create-stock/create-stock.html`
- `src/app/create-stock/create-stock.spec.ts`
- `src/app/create-stock/create-stock.ts`
- `src/app/labs/component-lab.ts`
- `src/app/labs/labs-home.ts`
- `src/app/labs/labs.routes.spec.ts`
- `src/app/labs/reactive-form-lab.ts`
- `src/app/login/login.html`
- `src/app/login/login.spec.ts`
- `src/app/login/login.ts`
- `src/app/model/stock.spec.ts`
- `src/app/model/stock.ts`
- `src/app/register/register.ts`
- `src/app/shared/account-form/account-form.html`
- `src/app/shared/account-form/account-form.ts`
- `src/app/shared/stock-change.pipe.ts`
- `src/app/shared/stock-form/stock-form.html`
- `src/app/shared/stock-form/stock-form.spec.ts`
- `src/app/shared/stock-form/stock-form.ts`
- `src/app/stock/create-stock-page/create-stock-page.ts`
- `src/app/stock/get-data/get-data.ts`
- `src/app/stock/post-data/post-data.ts`
- `src/app/stock/stock-details/stock-details.ts`
- `src/app/stock/stock-dialogs/stock-dialogs.ts`
- `src/app/stock/stock-item/stock-item.html`
- `src/app/stock/stock-item/stock-item.spec.ts`
- `src/app/stock/stock-item/stock-item.ts`
- `src/app/stock/stock-list/stock-list.html`
- `src/app/stock/stock-list/stock-list.ts`
- `src/index.html`
- `src/main.ts`
- `server/index.cjs`
- `server/index.test.cjs`

Các hàm của framework và thư viện chỉ được liệt kê theo cách dự án dùng; không liệt kê toàn bộ hàm bên trong từng gói phụ thuộc. Hàm được truyền dưới dạng tham chiếu như Validators.required và jsonServer.bodyParser được bổ sung riêng, vì chúng không xuất hiện dưới dạng lời gọi có ngoặc.

