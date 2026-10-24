# Đối chiếu toàn bộ bài thực hành

Nguồn: 7 PDF gốc trong thư mục project, đã đọc văn bản và kiểm tra cả ảnh minh họa, ảnh code. Không có PDF bài 1–2 trong thư mục.

## Bài 3 - Template Form (2 trang)

Nguồn: [Bài thực hành số 3.docx.pdf](../B%C3%A0i%20th%E1%BB%B1c%20h%C3%A0nh%20s%E1%BB%91%203.docx.pdf).

| Yêu cầu                                                            | Triển khai                                                    |
| ------------------------------------------------------------------ | ------------------------------------------------------------- |
| Component create-stock có tên, mã, giá, chọn sàn                   | `create-stock/create-stock.ts/html`, trang `/labs/3`          |
| Template Form                                                      | FormsModule, NgForm, ngModel, ngSubmit                        |
| Tên: hợp lệ xanh, không hợp lệ hồng                                | CSS `.stock-name.ng-valid/ng-invalid`                         |
| Mã: chưa thay đổi xanh, đã thay đổi hồng                           | CSS `.stock-code.ng-pristine/ng-dirty`                        |
| Giá: chưa tương tác xanh, sau tương tác/rời ô hồng                 | CSS `.stock-price.ng-untouched/ng-touched`                    |
| Nội dung trong ảnh: xác nhận, dữ liệu model và trạng thái xác nhận | Checkbox required, JsonPipe và phần “Data has been confirmed” |

Kiểm tra: mở bài 3, nhập tên ít nhất 3 ký tự, sửa mã, focus rồi rời ô giá. Quan sát màu; điền đúng, xác nhận rồi Create Stock. Nhập lại trả về pristine/untouched. Câu 2b trong PDF thiếu tên màu ban đầu; dùng xanh theo hình và các trường còn lại.

## Bài 4 - Reactive Form (1 trang)

Nguồn: [Bài thực hành số 4.docx.pdf](../B%C3%A0i%20th%E1%BB%B1c%20h%C3%A0nh%20s%E1%BB%91%204.docx.pdf).

| Yêu cầu                                                | Triển khai                                                                    |
| ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Chức năng tương tự bài 3 bằng Reactive Form            | `shared/stock-form/`, `labs/reactive-form-lab.ts`, trang `/labs/4`            |
| FormGroup, FormBuilder                                 | FormBuilder.nonNullable.group tạo FormGroup có kiểm tra dữ liệu               |
| FormData                                               | Khi Submit tạo FormData từ giá trị form; hiển thị dữ liệu FormData và kết quả |
| Lỗi từng điều khiển                                    | mat-error cho tên, mã, giá, sàn; lỗi xác nhận                                 |
| Hiển thị giá trị, trạng thái và kết quả Submit như ảnh | JsonPipe, form.status và submittedValue                                       |

“FormData” trong đề được triển khai theo API FormData của trình duyệt; không thay thế FormControl/FormGroup của Angular.

Kiểm tra: nhập tên khoảng trắng, mã có ký tự đặc biệt hoặc giá âm để thấy lỗi. Nhập hợp lệ và xác nhận, bấm Submit để xem kết quả.

## Bài 5 - Truyền tham số giữa component (2 trang)

Nguồn: [Bài thực hành số 5.docx.pdf](../B%C3%A0i%20th%E1%BB%B1c%20h%C3%A0nh%20s%E1%BB%91%205.docx.pdf).

| Yêu cầu                               | Triển khai                                                              |
| ------------------------------------- | ----------------------------------------------------------------------- |
| Cha giữ danh sách mẫu                 | `labs/component-lab.ts` giữ stocks, trang `/labs/5`                     |
| StockItem hiển thị một cổ phiếu       | `stock/stock-item/`: @Input stock, @Output favorite/edit/remove/details |
| CreateStock gửi dữ liệu cho danh sách | @Output created → hàm create ở cha, sau đó truyền stock xuống StockItem |
| Tùy chỉnh thành các dòng có nút lệnh  | Mỗi StockItem là một dòng, có yêu thích, chi tiết, sửa, xóa             |

Kiểm tra: tạo mã mới trong form bên dưới; dòng mới xuất hiện ở danh sách bên trên. Bấm yêu thích để kiểm tra sự kiện từ con lên cha. Bài 5 minh họa sự kiện sửa; dialog sửa đầy đủ thuộc bài 6.

Ở ứng dụng tổng hợp, `StockListComponent` trong `stock/stock-list/` tiếp tục dùng StockItem và CreateStock; dữ liệu chuyển sang service theo bài 6.

## Bài 6 - Service và Observable (3 trang)

Nguồn: [Bài thực hành số 6.docx.pdf](../B%C3%A0i%20th%E1%BB%B1c%20h%C3%A0nh%20s%E1%BB%91%206.docx.pdf).

| Yêu cầu                                       | Triển khai                                                        |
| --------------------------------------------- | ----------------------------------------------------------------- |
| StockService lưu danh sách dùng chung và CRUD | `core/stock.service.ts`                                           |
| Observable xử lý dữ liệu                      | BehaviorSubject/asObservable, defer, of, throwError, delay và map |
| RxJS mới thay ObservableOf/ObservableThrow    | of() và throwError(() => new Error(...))                          |
| Listview có xóa, update, chi tiết mỗi dòng    | `stock/stock-list/` và `stock/stock-item/`, trang `/labs/6`       |
| Tìm kiếm thay kết quả listview                | FormControl valueChanges, debounceTime, switchMap, AsyncPipe      |
| Cập nhật và chi tiết bằng dialog              | `stock/stock-dialogs/`, MatDialog                                 |

Kiểm tra: thêm mã mới, tìm theo mã, mở dialog sửa giá, mở chi tiết, đổi yêu thích, xóa. Chuyển đi rồi quay lại bài 6 vẫn còn thay đổi; tải lại trang sẽ trả dữ liệu mẫu vì service ở bộ nhớ.

## Bài 7 - HttpClient và API (5 trang)

Nguồn: [Bài thực hành số 7.docx.pdf](../B%C3%A0i%20th%E1%BB%B1c%20h%C3%A0nh%20s%E1%BB%91%207.docx.pdf).

| Yêu cầu                                 | Triển khai                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| JSON Server, data.json, stocks/profile  | `server/index.cjs`, `data.json`, `npm run api`                                    |
| Lớp httpservice đọc API bằng HttpClient | `core/http.service.ts`, provideHttpClient ở app.config                            |
| GET component                           | `stock/get-data/get-data.ts`, trang `/stocks/get-data`                            |
| POST component                          | `stock/post-data/post-data.ts`, trang `/stocks/post-data`                         |
| Thêm update/delete/get và tìm kiếm      | getStocks(q), getStock(id), createStock, updateStock, deleteStock, toggleFavorite |
| Mọi thay đổi ghi data.json              | JSON Server router, HTTP POST/PUT/PATCH/DELETE thật                               |

Chuẩn hóa dữ liệu mẫu: price/previousPrice dùng number, favorite dùng boolean thay các chuỗi trong PDF. Dòng LSC thứ tư của PDF là bản ghi lặp minh họa sau POST; dữ liệu ban đầu giữ 3 mã duy nhất TSC/SSC/LSC, POST cho phép thêm mã mới.

Chạy `npm run dev`, đăng ký tài khoản, thao tác CRUD rồi tải lại trang để kiểm tra lưu trữ. API được đặt dưới `/api` để dùng proxy; cổng JSON Server vẫn là 3000.

## Bài 8 - Đăng nhập và điều hướng (1 trang)

Nguồn: [Bài thực hành số 8.docx.pdf](../B%C3%A0i%20th%E1%BB%B1c%20h%C3%A0nh%20s%E1%BB%91%208.docx.pdf).

| Yêu cầu                                           | Triển khai                                                 |
| ------------------------------------------------- | ---------------------------------------------------------- |
| LoginComponent, RegisterComponent                 | `login/`, `register/`, dùng `shared/account-form/`         |
| UserService kết nối backend tài khoản             | `core/user.service.ts`, /api/auth/register/login/me/logout |
| Điều hướng Login/Register/Stock List/Create Stock | app.routes và menu trong app.html                          |
| Bấm cổ phiếu ở stock-list để mở StockDetails      | Nút tên cổ phiếu mở /stocks/:id, `stock/stock-details/`    |
| Kiểm tra trường bắt buộc                          | Form tài khoản hiển thị lỗi tên, mật khẩu                  |

Bổ sung guard xác thực trước các trang API. Mật khẩu được hash scrypt, cookie HttpOnly; backend cũng kiểm tra phiên. Khởi động lại API cần đăng nhập lại.

## Bài 9 - Angular Material và pipe (5 trang)

Nguồn: [Bài thực hành số 9.docx.pdf](../B%C3%A0i%20th%E1%BB%B1c%20h%C3%A0nh%20s%E1%BB%91%209.docx.pdf).

| Yêu cầu                                        | Triển khai                                                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Cài Material                                   | @angular/material, @angular/cdk phiên bản 22, theme azure-blue                                                |
| Menu ngang                                     | MatToolbar, nút Material, liên kết hiện hành và đăng nhập/đăng ký/đăng xuất                                   |
| Menu dọc đóng/mở                               | MatSidenav, nút menu, liên kết các bài, Create Stock, Get data, Post data và nút Đóng                         |
| Tùy chỉnh giao diện theo các component hiện có | Listview, Reactive Form, MatDialog, MatSnackBar; bố cục đáp ứng                                               |
| Kỹ thuật pipe                                  | CurrencyPipe định dạng USD, AsyncPipe nhận Observable, JsonPipe hiển thị form, StockChangePipe tính biến động |

Kiểm tra: bấm ☰ để mở menu dọc, chọn từng trang, xem active link; sửa/xem cổ phiếu qua dialog; so sánh giá và phần trăm biến động.

Cú pháp trong ảnh PDF thuộc Angular cũ. Mã hiện tại giữ hành vi theo đề bằng standalone components, provideHttpClient và Material 22 thay vì sao chép nguyên cú pháp cũ.

## Các kiểm tra tự động

- `npm run build`: biên dịch bản production.
- `npm test -- --watch=false`: form hợp lệ/không hợp lệ, sự kiện component, service dùng chung, yêu cầu HTTP và giao diện tài khoản/menu.
- `npm run test:api`: đăng ký/đăng nhập/đăng xuất, phiên truy cập, không lộ tài khoản, CRUD/tìm kiếm, kiểm tra dữ liệu và kết quả trên đĩa.
- `npm run check`: chạy cả ba bước.
