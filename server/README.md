# Kết nối SQL Server cục bộ

Database: `xuantinh_fashion`, server: `.\SQLEXPRESS` (máy `Thohihi`).
Backend dùng Windows Authentication qua ODBC Driver 17 for SQL Server.
Không cần đưa tài khoản `sa` hoặc mật khẩu vào React.

Khởi tạo bảng (đã thực hiện trên máy này):

```powershell
sqlcmd -S '.\SQLEXPRESS' -E -C -i server/setup.sql -b
```

Chạy trong hai terminal tại thư mục dự án:

```powershell
npm.cmd run server
```

```powershell
npm.cmd run dev
```

Mở `http://localhost:3000/#admin` để thêm sản phẩm. Thêm, sửa, xóa,
chuyển tồn kho, đánh dấu nổi bật, nhập JSON và khôi phục mẫu đều lưu SQL Server.
Database mới ban đầu không có sản phẩm. Có thể nhập file sao lưu JSON trong
trang Cài đặt hoặc dùng Khôi phục mặc định để nạp danh sách sản phẩm mẫu.
API không tự chép dữ liệu localStorage vào database.

Kiểm tra kết nối: `http://127.0.0.1:3001/api/health`.
Bảng `dbo.products` lưu ID, toàn bộ thông tin sản phẩm trong cột JSON `payload`,
và thời điểm tạo/cập nhật. Script khởi tạo không xóa database hoặc dữ liệu cũ.

Nếu dùng instance khác, cấu hình biến môi trường phía backend:

```powershell
$env:SQL_CONNECTION_STRING='Driver={ODBC Driver 17 for SQL Server};Server=.\SQLEXPRESS;Database=xuantinh_fashion;Trusted_Connection=Yes;Encrypt=No;TrustServerCertificate=Yes;'
npm.cmd run server
```

Phạm vi hiện tại là sản phẩm trên máy Windows cục bộ. Tài khoản, giỏ hàng và
đơn hàng vẫn dùng cơ chế cũ. API chỉ lắng nghe loopback; giao diện dev/preview
cũng chỉ mở cục bộ. Trước khi triển khai online cần backend có xác thực quản trị
phía server, SQL Server truy cập được từ nơi triển khai và reverse proxy `/api`.
Docker/Nginx hiện tại chỉ phục vụ giao diện, chưa chạy backend Windows này.
