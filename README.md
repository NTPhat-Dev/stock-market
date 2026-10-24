# Stock Market - thực hành Angular bài 3 đến bài 9

Dự án triển khai nối tiếp **toàn bộ 7 PDF có trong thư mục gốc (19 trang)**. Bài 3–6 có trang thực hành riêng; bài 7–9 được tích hợp trong ứng dụng Stock Market dùng API và Angular Material.

## Chạy dự án

Yêu cầu Node.js tương thích Angular 22: **22.22.3+, 24.15+ hoặc 26+**, npm.

```sh
npm install
npm run dev
```

Mở **http://localhost:4200**. Lệnh trên khởi động đồng thời Angular và JSON Server. Vào **Đăng ký** để tạo tài khoản, sau đó mở **Cổ phiếu**. Không có tài khoản hay mật khẩu mặc định.

Có thể chạy riêng ở hai cửa sổ:

```sh
npm run api
npm start
```

- Web: http://localhost:4200
- API: http://127.0.0.1:3000/api
- Kiểm tra API: http://127.0.0.1:3000/api/health
- Proxy `/api` đã cấu hình trong `proxy.conf.json`.
- `npm start` chỉ chạy web; các trang bài 3–6 vẫn hoạt động khi chưa chạy API.

## Các trang thực hành

| Bài       | Địa chỉ                                            | Nội dung                                                                                        |
| --------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Tổng quan | `/labs`                                            | Liên kết đến tất cả các bài                                                                     |
| 3         | `/labs/3`                                          | Template Form, ngModel, NgForm, màu valid/invalid, pristine/dirty, untouched/touched            |
| 4         | `/labs/4`                                          | Reactive Form, FormGroup, FormBuilder, FormData; giá trị, trạng thái và kết quả Submit          |
| 5         | `/labs/5`                                          | Component cha giữ dữ liệu mẫu, @Input/@Output, tạo cổ phiếu đưa lên danh sách                   |
| 6         | `/labs/6`                                          | StockService dùng chung, Observable, CRUD, tìm kiếm, dialog cập nhật và chi tiết                |
| 7         | `/stocks`, `/stocks/get-data`, `/stocks/post-data` | HttpClient và CRUD với JSON Server, lưu vào data.json                                           |
| 8         | `/login`, `/register`, `/stocks/:id`               | UserService, tài khoản backend, điều hướng và trang chi tiết                                    |
| 9         | Toàn ứng dụng                                      | Material toolbar/sidenav/button/form/dialog; CurrencyPipe, AsyncPipe, JsonPipe, StockChangePipe |

Các đường dẫn cũ `/stock`, `/create-stock`, `/account/login`, `/account/register`, `/stocks/list` vẫn được chuyển hướng.

## Tổ chức mã nguồn

```text
src/app/
  core/                     # StockService, HttpService, UserService, guard, xử lý lỗi
  model/stock.ts            # Stock, danh sách sàn và dữ liệu mẫu
  create-stock/             # Template Form của bài 3, dùng lại ở bài 5–6
  shared/
    stock-form/             # Reactive Form của bài 4, dùng lại cho tạo và sửa
    account-form/           # Form đăng nhập/đăng ký có kiểm tra dữ liệu
    stock-change.pipe.ts    # Pipe tính phần trăm biến động
  labs/                     # Tổng quan, bài 4 và bài 5
  stock/
    stock-item/             # Một dòng cổ phiếu, @Input/@Output
    stock-list/             # Danh sách, tìm kiếm, gọi CRUD, dùng nguồn dữ liệu theo bài
    create-stock-page/      # Tạo cổ phiếu qua API
    stock-dialogs/          # Dialog sửa, xem chi tiết, xác nhận xóa
    stock-details/          # Trang chi tiết theo id
    get-data/, post-data/   # Các trang GET/POST minh họa bài 7, có trong menu bài 9
  login/, register/         # Trang tài khoản
server/
  index.cjs                 # JSON Server và API tài khoản
  index.test.cjs            # Kiểm thử tích hợp với dữ liệu tạm
data.json                   # Dữ liệu API: stocks, users, profile
docs/
  bai-thuc-hanh.md           # Đối chiếu chi tiết yêu cầu từng PDF và cách kiểm tra
```

## Dữ liệu và hành vi

- **Bài 3–4:** Submit hiển thị kết quả; không gửi dữ liệu đến API.
- **Bài 5:** Danh sách nằm ở component cha, thay đổi qua sự kiện component. Tải lại trang sẽ khởi tạo lại dữ liệu.
- **Bài 6:** StockService giữ dữ liệu trong bộ nhớ và chia sẻ bằng BehaviorSubject/Observable. Dữ liệu giữ khi đổi trang trong cùng phiên ứng dụng, khởi tạo lại khi tải lại.
- **Bài 7–9:** HttpService gửi HTTP đến JSON Server, thay đổi được ghi vào `data.json`. Tải lại web vẫn còn dữ liệu.
- Giá dùng số, favorite dùng boolean. Ba cổ phiếu mẫu là TSC, SSC, LSC theo PDF.
- Mã cổ phiếu được chuẩn hóa thành chữ hoa và phải duy nhất. Cả form và API đều kiểm tra dữ liệu.
- Sửa giá giữ giá trước đó để tính biến động. Chỉ sửa tên hoặc đổi yêu thích không thay đổi giá tham chiếu.
- PDF gốc và dữ liệu localStorage của phiên bản cũ được giữ nguyên. Ứng dụng mới dùng API, không tự nhập dữ liệu từ localStorage.
- Trước khi tổ chức lại, bản mã nguồn hiện có được sao lưu tại `tmp/before-reorganization/` (thư mục tạm, không đưa vào Git).

## Tài khoản backend

API đăng ký/đăng nhập xác thực tài khoản thực tế với dữ liệu trong `data.json`. Mật khẩu được lưu dưới dạng hash scrypt có salt; trình duyệt nhận cookie HttpOnly và không lưu mật khẩu hay token vào localStorage. Danh sách tài khoản không được công khai qua API.

Phiên đăng nhập tồn tại tối đa 8 giờ và kết thúc khi khởi động lại API. Tài khoản và cổ phiếu vẫn được lưu. Đây là backend thực hành chạy trên máy cục bộ; dữ liệu cổ phiếu dùng chung giữa các tài khoản.

## Kiểm tra

```sh
npm run check
```

Lệnh chạy build production, kiểm thử Angular và kiểm thử API. Hoặc chạy riêng:

```sh
npm run build
npm test -- --watch=false
npm run test:api
```

Kiểm thử API dùng cơ sở dữ liệu tạm độc lập, không thay đổi `data.json` thật.

## Tài liệu

Xem [đối chiếu bài thực hành](docs/bai-thuc-hanh.md) để biết yêu cầu, trang demo và file triển khai tương ứng.

Tham khảo chính thức: [Reactive Forms](https://angular.dev/guide/forms/reactive-forms), [Angular Material](https://material.angular.dev/guide/getting-started), [JSON Server 0.17](https://github.com/typicode/json-server/tree/v0.17.4).

Giữ JSON Server 0.17.4 vì đề sử dụng API module `jsonServer.create/router`; không dùng CLI beta với API khác. Vite được cố định ở bản vá 8.3.3 qua npm overrides.
