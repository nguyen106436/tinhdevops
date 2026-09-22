# 👗 Xuân Tính Fashion - Website Bán Quần Áo & Thời Trang Trực Tuyến (CI/CD & Docker & Render)

Dự án Website Bán Hàng Trực Tuyến chuyên kinh doanh **Quần Áo & Thời Trang Nam Nữ** cao cấp (**Xuân Tính Fashion**), thiết kế chuẩn Single Page Application (SPA) trên nền tảng **React 18 + Vite + TypeScript + Tailwind CSS**, tích hợp quy trình tự động hóa **DevOps CI/CD**: **Docker Multi-stage**, **GitHub Actions** và Deploy lên **Render (Free Tier)**.

---

## ⚡ LỆNH CHẠY DỰ ÁN (QUICK RUN)

### 1. Chạy trên máy cá nhân (Local Development)
Mở terminal tại thư mục dự án và chạy các lệnh sau:
```bash
# Bước 1: Cài đặt dependencies (chỉ cần chạy lần đầu)
npm install

# Bước 2: Khởi chạy môi trường Dev
npm run dev
```
👉 Truy cập ngay trên trình duyệt: **`http://localhost:3000`**

---

### 2. Kiểm tra đóng gói sản phẩm (Production Build)
```bash
npm run build
```
Lệnh này sẽ biên dịch TypeScript (`tsc`) và đóng gói mã nguồn tối ưu vào thư mục `dist/`.

---

### 3. Chạy với Docker & Docker Compose cục bộ
Yêu cầu máy tính đã bật Docker Desktop:
```bash
# Khởi chạy container chạy ngầm
docker compose up -d --build

# Xem log hoạt động
docker compose logs -f

# Dừng container khi không dùng nữa
docker compose down
```
👉 Truy cập ngay trên trình duyệt: **`http://localhost:3000`**

---

## 🌟 1. Tính Năng Giao Diện Thời Trang (UI/UX)

1. **Thanh điều hướng (Navigation)**:
   - Logo thương hiệu **XT - Xuân Tính.Fashion Designer**.
   - Thanh thông báo mã voucher `XUANTINH` giảm 10%, miễn phí ship đơn từ 500k.
   - 3 mục chính: **Bộ sưu tập**, **Về thương hiệu**, **Liên hệ**.
   - Tìm kiếm quần áo theo thời gian thực (áo thun, sơ mi, blazer, đầm dự tiệc,...).
   - Túi đồ (Cart) kèm huy hiệu số lượng món hàng.
   - Tài khoản thành viên: **Đăng nhập nhanh 1-click với Demo**, **Lịch sử đơn hàng**, Đăng xuất.

2. **Bộ Sưu Tập Thời Trang Đa Dạng**:
   - 5 danh mục: Thời trang Nam, Thời trang Nữ, Quần & Chân Váy, Đồ Thể Thao, Phụ Kiện.
   - Thẻ sản phẩm: Ảnh người mẫu lookbook sắc nét, nhãn sale %, số sao đánh giá, xem trước các kích cỡ size sẵn có (S, M, L, XL,...), chất liệu vải.
   - **Modal Chi tiết Quần Áo**:
     - Tùy chọn **Màu sắc** & **Size trang phục** linh hoạt.
     - **Bảng tư vấn chọn size chuẩn người Việt** theo chiều cao (cm) và cân nặng (kg).
     - Chi tiết chất liệu vải (Cotton Compact 250GSM, lụa Mango, tuyết mưa Hàn,...), xuất xứ xưởng may, hướng dẫn giặt ủi.

3. **Túi Đồ & Mã Khuyến Mãi (Cart Drawer)**:
   - Ngăn kéo trượt thông minh từ bên phải.
   - Hiển thị rõ Size và Màu đã chọn của từng món đồ.
   - Tăng/giảm số lượng, xóa món.
   - Nhập mã voucher:
     - `XUANTINH`: Giảm 10% trên tổng đơn hàng.
     - `FREESHIP`: Miễn phí vận chuyển cho đơn từ 500.000đ.
     - `FASHION50`: Giảm 50.000đ cho đơn từ 600.000đ.

4. **Thanh toán (Checkout Modal)**:
   - Form thông tin giao hàng có ô ghi chú chiều cao/cân nặng để shop kiểm tra size.
   - Phương thức: **COD (Được mở kiểm tra chất vải trước khi thanh toán)** hoặc **Chuyển khoản VietQR** (sinh mã QR tự động kèm STK ngân hàng và mã đơn hàng `XT-XXXXXX`, chủ tài khoản `XUAN TINH FASHION`).
   - Màn hình thông báo Đặt hàng thành công sinh động.

5. **Khu Vực Quản Trị (Admin Dashboard - CRUD)**:
   - Truy cập trực tiếp tại: `http://localhost:3000/#admin` hoặc qua liên kết trang quản trị tại Footer.
   - Tài khoản quản trị Admin:
     - **Tài khoản:** `xuantinh` (hoặc `admin`)
     - **Mật khẩu:** `xuantinh` (hoặc `admin123`)
   - Đầy đủ tính năng: Thống kê doanh thu, Quản lý danh sách sản phẩm (Thêm/Sửa/Xóa), Quản lý đơn hàng, Sao lưu & Khôi phục dữ liệu JSON.

6. **Giới thiệu shop & 4 Cam kết vàng**:
   - 100% Chất vải tự nhiên tuyển chọn, mềm mát thấm hút mồ hôi.
   - **Đổi size miễn phí trong 30 ngày tận nhà**.
   - Bảo hành đường may và khóa kéo 12 tháng.
   - Được kiểm tra hàng trước khi nhận.

---

## 🚢 2. Quy Trình Tự Động Hóa CI/CD Lên Docker Hub & Render

### Bước 1: Đẩy mã nguồn lên GitHub của bạn
```bash
git add .
git commit -m "feat: rebrand to Xuan Tinh Fashion and update admin credentials"
git remote add origin https://github.com/XuantinhST23B/Devops.git
git push -u origin main
```

### Bước 2: Cài đặt GitHub Secrets
Vào repository trên GitHub ➔ **Settings** ➔ **Secrets and variables** ➔ **Actions**:
- `DOCKER_USERNAME`: Tên tài khoản Docker Hub của bạn.
- `DOCKER_PASSWORD`: Access Token Docker Hub (tạo tại `hub.docker.com` ➔ Account Settings ➔ Security ➔ New Access Token).
- `RENDER_DEPLOY_HOOK_URL`: (Tùy chọn) Webhook URL từ Render.

### Bước 3: Tạo Web Service trên Render (Free Tier)
1. Đăng nhập [Render.com](https://dashboard.render.com/) ➔ Bấm **New +** ➔ **Web Service**.
2. Kết nối với repo GitHub của bạn: `XuantinhST23B/Devops`.
3. Cấu hình:
   - **Runtime**: Chọn `Docker`
   - **Instance Type**: `Free`
   - **Environment Variables**: Thêm `PORT` = `3000`
4. Bấm **Create Web Service**. Ứng dụng sẽ tự động được build bằng Docker multi-stage và deploy ra đường link miễn phí dạng: `https://xuantinh-fashion.onrender.com`.

---

## 🔑 3. Tài Khoản & Mật Khẩu Hệ Thống

| Quyền hạn | Tên tài khoản / Email | Mật khẩu | Ghi chú |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | **`xuantinh`** (hoặc `admin`) | **`xuantinh`** (hoặc `admin123`) | Toàn quyền CRUD sản phẩm & đơn hàng |
| **Khách hàng (Demo)** | `demo@xuantinhstore.vn` | 1-Click tự động | Nguyễn Xuân Tính (Khách hàng) |

**Mã Voucher ưu đãi:**
- **`XUANTINH`** (Giảm 10% toàn sàn)
- **`FREESHIP`** (Miễn phí ship đơn từ 500k)
- **`FASHION50`** (Giảm 50k đơn từ 600k)

---
*Xuân Tính Fashion - Tự tin định hình phong cách thời trang của bạn!* ✨
