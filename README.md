# Chữa bài tập về nhà backend-exercise02

**SERVER**

## Server/index.js

File `server/index.js` chứa code nguồn để tạo và chạy máy chủ HTTP để xử lý các yêu cầu từ phía client và định tuyến chúng đến các controllers tương ứng trong ứng dụng.

---

### Hàm `createServer`

- Chức năng: Tạo và khởi chạy máy chủ HTTP để xử lý các yêu cầu.
- Tham số: Một hàm callback chứa xử lý cho mỗi yêu cầu.
- Các bước:
  1. Sử dụng module `http` để tạo máy chủ HTTP.
  2. Sử dụng module `url` để phân tích cú pháp URL của yêu cầu.
  3. Trích xuất đường dẫn và truy vấn từ URL đã phân tích.
  4. Kiểm tra nếu đường dẫn chứa "/assets/", gọi hàm `assets` để xử lý yêu cầu tài sản.
  5. Nếu đường dẫn bắt đầu bằng "/api", gọi hàm `api` để xử lý yêu cầu API.
  6. Nếu không phải trường hợp trên, gọi hàm `html` để xử lý yêu cầu truy cập trang HTML.
  7. Khởi chạy máy chủ để lắng nghe yêu cầu từ phía client trên cổng 3002.

---

### Ghi chú

File `server/index.js` chịu trách nhiệm về việc tạo và quản lý máy chủ HTTP, định tuyến yêu cầu đến các controllers tương ứng và thực hiện xử lý. Việc này giúp ứng dụng của bạn tương tác với trình duyệt và cung cấp nội dung theo yêu cầu của users.

---

## API Controllers:

---

### Endpoint "validate" (Path: /api/validate)

- Chức năng: Kiểm tra tính hợp lệ của số điện thoại.
- Methods: GET
- Controller: `phoneControllers`

Mô tả chi tiết:

- Kiểm tra tính hợp lệ của số điện thoại truyền vào.
- Trả về thông báo về tính hợp lệ của số điện thoại hoặc thông báo lỗi nếu số điện thoại không hợp lệ.

---

### Endpoint "focus" (Path: /api/focus)

- Chức năng: Tương tác với dữ liệu liên quan đến tập trung.
- Methods: POST, GET
- Controller: `focusControllers`

Mô tả chi tiết:

- Nếu là method POST:
  - Gửi request POST đến một API ngoài với số điện thoại đã cho.
  - Hoặc gửi request POST với số điện thoại trống nếu giá trị là "empty".
- Nếu là method GET:
  - Truy vấn và trả về dữ liệu từ API.

---

### Endpoint "active" (Path: /api/active)

- Chức năng: Quản lý trạng thái hoạt động của điện thoại.
- Methods: POST, GET
- Controller: `activeControllers`

Mô tả chi tiết:

- Nếu là method POST:
  - Kiểm tra và xác nhận tính hợp lệ của số điện thoại và OTP.
  - Kiểm tra xem số điện thoại đã hoạt động chưa, nếu chưa hoạt động thì đánh dấu số điện thoại là hoạt động.
- Nếu là method GET:
  - Truy vấn và trả về danh sách các điện thoại đã hoạt động hoặc thông tin về một điện thoại cụ thể dựa trên tham số truy vấn.

---

### Endpoint "otp" (Path: /api/otp)

- Chức năng: Quản lý OTP và xác thực số điện thoại.
- Methods: POST, GET
- Controller: `otpControllers`

Mô tả chi tiết:

- Nếu là method POST:
  - Kiểm tra và xác nhận tính hợp lệ của số điện thoại và OTP.
  - Nếu OTP hợp lệ, kiểm tra số điện thoại đã hoạt động chưa, nếu chưa hoạt động thì đánh dấu số điện thoại là hoạt động.
- Nếu là method GET:
  - Truy vấn và trả về danh sách các OTP hoặc thông tin về một OTP cụ thể dựa trên tham số truy vấn.

---

### Controller chính (apiControllers)

- Chức năng: Xác định chức năng cụ thể dựa trên path và gọi các controllers tương ứng để xử lý các yêu cầu.
- Controller: `apiControllers`

---

## HTML Controllers

**Chức năng:** Xử lý yêu cầu từ phía frontend và hiển thị trang HTML tương ứng.

---

**Tham số:**

- `res`: Object response để gửi phản hồi đến client.
- `pathView`: Đường dẫn đến thư mục chứa file HTML.
- `pathFile`: Tên file HTML cần hiển thị.
- `pathname`: Đường dẫn truy cập từ phía frontend.

---

**Các bước xử lý:**

1. Đọc nội dung file HTML từ đường dẫn `pathView` và tên file `pathFile`.

2. Dựa trên đường dẫn `pathname`, xác định loại trang cần hiển thị:

   - Nếu đường dẫn là "/" hoặc "/index.html", thay thế `"content"` trong nội dung HTML bằng nội dung từ dữ liệu `data.index`.

   - Nếu đường dẫn bắt đầu bằng "/account" và chứa thông tin số điện thoại, thay thế `"content"` trong nội dung HTML bằng nội dung từ dữ liệu `data.account`, và thay thế `"phone"` bằng số điện thoại.

   - Nếu đường dẫn bắt đầu bằng "/success" và chứa thông tin số điện thoại, thay thế `"content"` trong nội dung HTML bằng nội dung từ dữ liệu `data.success`, và thay thế `"phone"` bằng số điện thoại.

   - Cho các trường hợp khác, thay thế `"content"` trong nội dung HTML bằng nội dung từ dữ liệu `data.error`, và thay thế `"error"` bằng phần sau dấu `/` trong đường dẫn.

3. Gửi phản hồi chứa nội dung HTML đã xử lý đến client.

---

## ACCESS Controllers

Hàm `assetsController` là một controller có nhiệm vụ xác định loại file tài sản được yêu cầu bằng cách xem phần mở rộng của đường dẫn file và thiết lập các tiêu đề phản hồi thích hợp để chỉ định loại nội dung. Sau đó, hàm đọc file tài sản tương ứng từ đĩa và gửi nội dung của file này đến trình duyệt.

---

### Tham số

- `res`: Đây là object phản hồi của HTTP, được sử dụng để gửi nội dung file tới trình duyệt.

- `pathname`: Đây là đường dẫn của file tài sản được yêu cầu.

- `pathView`: Đây là đường dẫn tới thư mục chứa file tài sản.

---

### Chức năng chi tiết

1. Hàm kiểm tra phần mở rộng của `pathname` để xác định loại file tài sản (CSS, JavaScript, hình ảnh hoặc file văn bản).

2. Dựa vào loại file tìm thấy, hàm đặt tiêu đề phản hồi thích hợp cho nội dung.

3. Sử dụng thư viện `fs` (filesystem) để đọc nội dung file tài sản tại đường dẫn tương ứng trong thư mục `pathView`.

4. Gửi nội dung file tới trình duyệt qua object phản hồi.

---

## Data.json

File `data.json` chứa một danh sách các chuỗi HTML được sử dụng để tạo nội dung trang web trong ứng dụng của chúng ta. Mỗi khóa trong file tương ứng với một trạng thái của trang web (chẳng hạn như trang chính, trang tài khoản, trang thành công, trang lỗi) và giữ nội dung HTML tương ứng.

---

### Nội Dung

### `index`:

- Chức năng: Đại diện cho trang chính của ứng dụng.
- Nội dung: Một biểu mẫu đăng ký số điện thoại với một nút "Submit" bị vô hiệu hóa.

---

### `account`:

- Chức năng: Đại diện cho trang tài khoản.
- Nội dung: Hiển thị thông tin tài khoản với số điện thoại và một biểu mẫu nhập code xác thực otp.

---

### `success`:

- Chức năng: Đại diện cho trang thông báo hoạt động thành công.
- Nội dung: Hiển thị thông báo rằng số điện thoại đã hoạt động thành công và một nút để quay trở lại trang chính.

---

### `error`:

- Chức năng: Đại diện cho trang thông báo lỗi.
- Nội dung: Hiển thị thông báo lỗi với code lỗi 404 và một liên kết để quay trở lại trang chính.

---

### Ghi chú

Các chuỗi HTML trong file `data.json` chứa code HTML để tạo giao diện users trong ứng dụng của chúng ta. Dùng các chuỗi này để tạo ra các trang khác nhau và truyền dữ liệu động nếu cần. Việc này giúp chúng ta tách biệt giữa code và nội dung của ứng dụng.

---

## Helper/index.js

File `helper/index.js` chứa một tập hợp các hàm hữu ích dùng để xử lý các tác vụ cụ thể và đáp ứng của ứng dụng phía backend. Các hàm này thực hiện các chức năng như thay thế nội dung HTML, trích xuất dữ liệu từ yêu cầu, kiểm tra tính hợp lệ của dữ liệu đầu vào và nhiều chức năng khác.

---

### Hàm `replace`

- Chức năng: Thay thế nội dung trong chuỗi HTML theo giá trị và tên cụ thể.
- Tham số:
  - `htmlContent`: Chuỗi HTML chứa nội dung cần thay thế.
  - `value`: Tên giá trị cần thay thế.
  - `content`: Nội dung mới để thay thế.
- Trả về: Chuỗi HTML sau khi đã thay thế.

---

### Hàm `getBody`

- Chức năng: Trích xuất dữ liệu từ yêu cầu HTTP (request body).
- Tham số:
  - `req`: Object yêu cầu HTTP.
- Trả về: Một promise chứa dữ liệu được trích xuất từ yêu cầu sau khi đã được parse từ JSON.

---

### Hàm `getPhone`

- Chức năng: Trích xuất số điện thoại từ đường dẫn (path) yêu cầu.
- Tham số:
  - `path`: Đường dẫn yêu cầu.
- Trả về: Số điện thoại nếu nó hợp lệ trong đường dẫn, ngược lại trả về `false`.

---

### Hàm `validateInput`

- Chức năng: Kiểm tra tính hợp lệ của dữ liệu đầu vào số điện thoại.
- Tham số:
  - `inputValue`: Giá trị dữ liệu đầu vào (số điện thoại).
- Trả về: Chuỗi thông báo lỗi nếu có lỗi hoặc chuỗi rỗng nếu dữ liệu đầu vào hợp lệ.

---

### Ghi chú

Các hàm trong file `helper/index.js` cung cấp các chức năng hữu ích để thực hiện các tác vụ cần thiết phía backend. Chúng giúp xử lý dữ liệu, kiểm tra tính hợp lệ và trích xuất thông tin cần thiết từ yêu cầu HTTP. Sử dụng chúng để đơn giản hóa quá trình xử lý và tương tác với dữ liệu.

---

## Model/index.js

File `model/index.js` chứa một module quản lý việc điều phối và xử lý các yêu cầu từ phía client đến các controllers và handlers tương ứng. Module này xác định cách xử lý các loại yêu cầu khác nhau (assets, HTML, API) và gọi các controllers tương ứng để thực hiện xử lý.

### Object `home`

- Chức năng: Điều phối việc xử lý các yêu cầu đến controllers tương ứng.
- Các thuộc tính:
  - `assets`: Xử lý yêu cầu truy cập các tài sản (assets).
  - `html`: Xử lý yêu cầu truy cập các trang HTML.
  - `api`: Xử lý yêu cầu API.

### Phương thức `assets`

- Chức năng: Xử lý yêu cầu truy cập các tài sản (assets) như file CSS, JavaScript và hình ảnh.
- Tham số:
  - `req`: Object yêu cầu HTTP.
  - `res`: Object phản hồi HTTP.
  - `pathname`: Đường dẫn yêu cầu.
  - `pathView`: Đường dẫn đến thư mục chứa tài sản.
- Các bước:
  1. Kiểm tra phương thức yêu cầu, chỉ cho phép phương thức GET.
  2. Kiểm tra và điều chỉnh đường dẫn tới tài sản nếu cần.
  3. Gọi controller `assetsController` để xử lý yêu cầu.

### Phương thức `html`

- Chức năng: Xử lý yêu cầu truy cập các trang HTML.
- Tham số:
  - `req`: Object yêu cầu HTTP.
  - `res`: Object phản hồi HTTP.
  - `pathView`: Đường dẫn đến thư mục chứa trang HTML.
  - `pathFile`: Tên file HTML cụ thể.
  - `pathname`: Đường dẫn yêu cầu.
- Các bước:
  1. Kiểm tra phương thức yêu cầu, chỉ cho phép phương thức GET.
  2. Gọi controller `htmlController` để xử lý yêu cầu.

### Phương thức `api`

- Chức năng: Xử lý yêu cầu API.
- Tham số:
  - `req`: Object yêu cầu HTTP.
  - `res`: Object phản hồi HTTP.
- Các bước:
  1. Gọi controller `apiController` để xử lý yêu cầu.

### Ghi chú

Module trong file `model/index.js` giúp tách biệt việc xử lý các loại yêu cầu khác nhau và gọi các controllers tương ứng để thực hiện xử lý. Điều này giúp tăng tính cấu trúc và dễ quản lý trong code của ứng dụng.

---

**Client**

---

## Views/index.html

File `views/index.html` chứa code nguồn HTML cho giao diện users chính của ứng dụng. File này định nghĩa cấu trúc và giao diện cơ bản của trang web, bao gồm các thẻ HTML, liên kết đến file CSS và JavaScript cần thiết để tạo trải nghiệm users.

---

### Thẻ `head`

- Thẻ `meta charset`: Định nghĩa bộ ký tự của trang là UTF-8.
- Thẻ `meta viewport`: Định nghĩa thẻ `viewport` để điều chỉnh tỷ lệ và độ rộng của trang trên các thiết bị khác nhau.
- Thẻ `link rel="stylesheet"`: Liên kết đến file CSS `style.min.css` để định dạng giao diện của trang.
- Thẻ `link rel="shortcut icon"`: Liên kết đến biểu tượng trang (favicon) `favicon.ico`.

---

### Thẻ `body`

- Thẻ `div id="root"`: Vị trí này sẽ được sử dụng để chèn nội dung động từ JavaScript vào trang.
- Thẻ `script src="helper.js"`: Liên kết đến file JavaScript `helper.js` để cung cấp các chức năng hữu ích.
- Thẻ `script src="script.js"`: Liên kết đến file JavaScript `script.js` để xử lý tương tác và logic của trang.

---

### Ghi chú

File `views/index.html` là trang cơ bản của ứng dụng. Nó định nghĩa cấu trúc, giao diện và liên kết với các file tương ứng (CSS, JavaScript) để tạo trải nghiệm users hoàn chỉnh. Các thẻ và liên kết trong file này là các thành phần quan trọng trong việc hiển thị và tương tác với nội dung trang web.

---

## Access/script.js

File `assets/script.js` chứa code nguồn JavaScript chính của ứng dụng, quản lý các sự kiện và xử lý tương tác của users trên trang web.

---

### Mảng `pages`

- Mục đích: Lưu trữ danh sách các trang có thể có trong ứng dụng.
- Các giá trị: Tên của các trang như "homePage", "accountPage", "successPage", "errorPage".

---

### Biến `currentPage`

- Mục đích: Theo dõi trang hiện tại đang được hiển thị.
- Giá trị mặc định: "homePage".

---

### Sự kiện `DOMContentLoaded`

- Mục đích: Được kích hoạt khi toàn bộ cấu trúc HTML đã được tải.
- Các bước:
  1. Lặp qua các trang trong array `pages`.
  2. Nếu phát hiện trang hiện tại được hiển thị, gán giá trị của `currentPage` thành trang đó.

---

### Sự kiện `window.onload`

- Mục đích: Được kích hoạt khi toàn bộ trang web (bao gồm tài nguyên liên quan) đã được tải.
- Các bước:
  1. Kiểm tra xem users đang tập trung vào một phần tử nào đó (trang đã kích hoạt).
  2. Kiểm tra xem users đã kích hoạt thành công và không có số điện thoại đã kích hoạt trước đó.
  3. Kiểm tra xem trang hiện tại có đúng địa chỉ "/account/" hoặc "/success/" không.
  4. Nếu đáp ứng các điều kiện trên, chuyển hướng users đến trang "/account/" với số điện thoại đang tập trung.
  5. Nhúng file JavaScript tương ứng với trang hiện tại (sử dụng `import`).

---

### Ghi chú

File `assets/script.js` quản lý tương tác của users trên trang web. Nó kiểm tra và thay đổi trang hiện tại dựa trên các sự kiện, cũng như thực hiện các chuyển hướng hoặc tải các file JavaScript phụ thuộc vào trang đang được hiển thị. Điều này giúp cung cấp trải nghiệm users mượt mà và tương tác trên trang web.

---

## Access/helper/helper.js

File `access/helper/helper.js` chứa các hàm JavaScript dùng để thực hiện các tác vụ trên phía client, tương tác với server thông qua các yêu cầu HTTP.

---

## Hàm `$` và `$$`

- Chức năng: Lấy phần tử HTML đầu tiên hoặc tất cả các phần tử HTML phù hợp với selecor được cung cấp.
- Tham số: `tag` - Selecor của phần tử HTML.
- Sử dụng: Dùng để truy cập và tương tác với các phần tử trên trang web.

---

## Hàm `getPhone`

- Chức năng: Trích xuất số điện thoại từ đường dẫn URL.
- Tham số: `path` - Đường dẫn cần kiểm tra.
- Các bước:
  1. Lấy đường dẫn URL hiện tại từ `window.location.pathname`.
  2. Xác định biểu thức chính quy dựa trên `path`.
  3. Sử dụng `match` để tìm và trích xuất số điện thoại từ đường dẫn.
  4. Trả về số điện thoại đã trích xuất.

---

## Hàm `postFocus`

- Chức năng: Gửi yêu cầu POST để thay đổi trạng thái focus.
- Tham số: `value` - Giá trị tập trung mới.
- Các bước:
  1. Sử dụng `fetch` để gửi yêu cầu POST đến đường dẫn "/api/focus".
  2. Đặt các tiêu đề liên quan đến kiểu nội dung và phương thức.
  3. Gửi dữ liệu JSON chứa giá trị tập trung mới.
  4. Sử dụng `then` để chờ và nhận dữ liệu JSON từ phản hồi.
  5. Trả về dữ liệu nhận được.

---

## Hàm `getFocus`

- Chức năng: Lấy giá trị tập trung hiện tại từ server.
- Các bước:
  1. Sử dụng `fetch` để gửi yêu cầu GET đến đường dẫn "/api/focus".
  2. Sử dụng `then` để chờ và nhận dữ liệu JSON từ phản hồi.
  3. Trả về giá trị tập trung hiện tại (số điện thoại).

---

## Hàm `checkActive`

- Chức năng: Kiểm tra trạng thái kích hoạt của một số điện thoại.
- Tham số: `phone` - Số điện thoại cần kiểm tra.
- Các bước:
  1. Sử dụng `fetch` để gửi yêu cầu GET đến đường dẫn `/api/active?phone=${phone}`.
  2. Sử dụng `then` để chờ và nhận dữ liệu JSON từ phản hồi.
  3. Trả về trạng thái kích hoạt của số điện thoại.

---

## Ghi chú

File `access/helper/helper.js` chứa các hàm JavaScript cho phía client, giúp tương tác với server thông qua các yêu cầu HTTP. Các hàm này thực hiện các tác vụ như truy cập phần tử trên trang web, gửi và nhận dữ liệu từ server. Chúng đóng vai trò quan trọng trong việc đảm bảo trải nghiệm tương tác mượt mà cho users.

---

## Access/js/homePage.js

File `access/js/homePage.js` chứa code JavaScript liên quan đến trang "homePage". Đây là nơi xử lý tương tác của users trên trang chủ, kiểm tra và xác thực số điện thoại nhập vào.

---

### Biến `homePage`, `form`, `input`, `btn`

- Mục đích: Lưu trữ các phần tử HTML trên trang chủ.
- Các giá trị: Các phần tử HTML được chọn bằng `$("#homePage")`, `$(".form")`, `$(".input")`, `$(".btn")`.

---

### Hàm `debounce`

- Mục đích: Trì hoãn việc thực hiện một hàm sau một khoảng thời gian.
- Tham số: `fn` - Hàm cần thực hiện trì hoãn, `timmer` - Thời gian trễ (mặc định là 300).
- Sử dụng: Được sử dụng để giảm tải xử lý sự kiện, như trong việc kiểm tra số điện thoại nhập vào.
- Tuy nhiên hàm này chưa được sử dụng vì đã chuyển check valid sang phía client.

---

### Hàm `getError` và `removeError`

- Mục đích: Thêm hoặc xóa thông báo lỗi từ trang chủ.
- Sử dụng: Khi xác thực số điện thoại nhập vào, hiển thị thông báo lỗi nếu có.

---

### Sự kiện `input` và `keydown`

- Mục đích: Xử lý các sự kiện nhập liệu từ users.
- Các bước:
  1. Loại bỏ ký tự không phải số hoặc "+" khỏi chuỗi nhập vào.
  2. Gọi hàm `handleKeydown` khi có sự kiện `keydown` xảy ra.

---

## Hàm `getValidate`

- Mục đích: Kiểm tra và xác thực số điện thoại nhập vào.
- Tham số: `inputValue` - Giá trị số điện thoại nhập vào.
- Các bước:
  1. Loại bỏ ký tự không phải số hoặc "+" khỏi chuỗi.
  2. Xác định nếu có dấu "+" ở đầu chuỗi và kiểm tra các điều kiện theo từng trường hợp.
  3. Trả về thông báo lỗi và trạng thái xác thực.

---

### Hàm `handleKeydown`

- Mục đích: Xử lý sự kiện `keydown` khi nhập số điện thoại.
- Tham số: `e` - Object sự kiện.
- Các bước:
  1. Gọi hàm `getValidate` để kiểm tra số điện thoại.
  2. Xử lý thông báo lỗi và trạng thái nút "SUBMIT".

---

### Sự kiện `submit` và hàm `handleSubmit`

- Mục đích: Xử lý sự kiện gửi biểu mẫu khi nhấn nút "SUBMIT".
- Các bước:
  1. Ngăn chặn hành động mặc định của biểu mẫu.
  2. Lấy số điện thoại từ trường nhập liệu.
  3. Kiểm tra và xử lý thông báo lỗi.
  4. Gửi yêu cầu `checkActive` để kiểm tra trạng thái kích hoạt của số điện thoại.
  5. Gửi yêu cầu `postFocus` để cập nhật trạng thái focus.
  6. Chuyển hướng users tới trang "successPage" hoặc "accountPage" tùy theo kết quả.

---

### Ghi chú

File `access/js/homePage.js` chứa code JavaScript để xử lý tương tác của users trên trang chủ. Các hàm và sự kiện được sử dụng để kiểm tra và xác thực số điện thoại nhập vào, hiển thị thông báo cho users

---

## Access/js/accountPage.js

File `access/js/accountPage.js` chứa mã JavaScript liên quan đến trang "accountPage". Đây là nơi xử lý tương tác của users trên trang nhập mã OTP.

### Biến và Phần tử HTML

- Mục đích: Lưu trữ các phần tử HTML trên trang "accountPage".
- Các biến và phần tử: `h1`, `input0`, `input1`, `input2`, `input3`, `btnSubmit`, `btnBack`, `form`, `inputArr`.

### Hàm `getMsg`

- Mục đích: Hiển thị thông báo lỗi lên tiêu đề trang "accountPage".
- Tham số: `msg` - Nội dung thông báo lỗi.
- Các bước: Đặt lớp và nội dung mới cho tiêu đề để hiển thị thông báo lỗi.

### Hàm `handleKeyDown`

- Mục đích: Xử lý sự kiện `keydown` khi users nhấn phím trên trường nhập liệu.
- Tham số: `e` - Object sự kiện, `ref` - Trường nhập liệu hiện tại.
- Các bước: Xử lý di chuyển giữa các trường nhập liệu bằng các phím "Backspace", "Left" và "Right".

### Hàm `handleChangeOTP`

- Mục đích: Xử lý sự kiện nhập liệu trên các trường mã OTP.
- Tham số: `e` - Object sự kiện, `ref` - Trường mã OTP hiện tại.
- Các bước:
  1. Loại bỏ ký tự không phải số khỏi chuỗi nhập liệu.
  2. Giới hạn chiều dài của chuỗi nhập liệu thành 1 ký tự.
  3. Xử lý di chuyển tới trường nhập liệu tiếp theo khi nhập liệu đủ 1 ký tự.
  4. Kiểm tra khả năng gửi biểu mẫu dựa trên chiều dài chuỗi mã OTP.

### Hàm `canSubmit`

- Mục đích: Điều khiển khả năng gửi biểu mẫu dựa trên trạng thái mã OTP.
- Tham số: `canSubmit` - Trạng thái có thể gửi biểu mẫu hay không.
- Các bước: Kích hoạt hoặc vô hiệu hóa nút "SUBMIT" dựa trên giá trị tham số.

### Xử lý sự kiện nhập liệu

- Mục đích: Xử lý các sự kiện nhập liệu và di chuyển trên các trường mã OTP.
- Các bước:
  1. Gọi hàm `handleChangeOTP` khi nhập liệu vào các trường mã OTP.
  2. Gọi hàm `handleKeyDown` khi có sự kiện `keydown` xảy ra trên trường mã OTP.

### Xử lý gửi biểu mẫu

- Mục đích: Xử lý sự kiện gửi biểu mẫu khi users nhấn nút "SUBMIT".
- Các bước:
  1. Ngăn chặn hành động mặc định của biểu mẫu.
  2. Lấy giá trị mã OTP từ các trường mã OTP.
  3. Gửi yêu cầu `postDataActive` để kiểm tra và xử lý trạng thái kích hoạt số điện thoại.
  4. Nếu số điện thoại kích hoạt thành công, cập nhật trạng thái focus và chuyển hướng users tới trang "successPage".

### Xử lý sự kiện nút "Back"

- Mục đích: Xử lý sự kiện khi users nhấn nút "Back to Home".
- Các bước:
  1. Gửi yêu cầu `postFocus` để cập nhật trạng thái focus.
  2. Chuyển hướng users tới trang chủ.

---

## Access/js/successPage.js

File `access/js/successPage.js` chứa mã JavaScript liên quan đến trang "successPage". Mã này tập trung vào xử lý tương tác của users trên trang sau khi xác minh thành công.

### Biến và Phần tử HTML

- Mục đích: Lưu trữ các phần tử HTML trên trang "successPage".
- Biến và Phần tử: `btn`.

### Xử lý sự kiện nút "Back to Home"

- Mục đích: Xử lý sự kiện khi users nhấn nút "Back to Home".
- Các bước:
  1. Gọi hàm `postFocus` để cập nhật trạng thái focus.
  2. Chuyển hướng users về trang chủ.

---

## Access/js/errorPage.js

File `access/js/errorPage.js` chứa mã JavaScript liên quan đến trang "errorPage". Mã này tập trung vào xử lý tương tác của users trên trang khi xảy ra lỗi.

## Biến và Phần tử HTML

- Mục đích: Lưu trữ các phần tử HTML trên trang "errorPage".
- Biến và Phần tử: `btn`.

## Xử lý sự kiện nút "Go to Home!"

- Mục đích: Xử lý sự kiện khi users nhấn nút "Go to Home!".
- Các bước:
  1. Gọi hàm `postFocus` để cập nhật trạng thái focus.
  2. Chuyển hướng users về trang chủ.
