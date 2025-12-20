# 🌍 Traveloka Clone - Hệ Thống Quản Lý Tour Du Lịch

## 📋 Giới thiệu

Đây là một ứng dụng web đặt tour du lịch đầy đủ tính năng, được xây dựng với mục đích minh họa **thiết kế cơ sở dữ liệu** cho hệ thống quản lý du lịch thực tế. Dự án bao gồm các tính năng đặt tour, thanh toán, quản lý khuyến mãi, đánh giá chuyến đi và trang quản trị dành cho admin.

## 🎯 Mục tiêu dự án

- **Thiết kế cơ sở dữ liệu quan hệ** đầy đủ cho hệ thống du lịch
- Xây dựng **RESTful API** với Node.js và Express
- Sử dụng **Prisma ORM** để quản lý database
- Phát triển giao diện người dùng hiện đại với **React** và **Tailwind CSS**
- Triển khai **phân quyền** (User/Admin) và **xác thực JWT**
- Áp dụng các **stored procedures, triggers, functions** trong MySQL

## 🗄️ Thiết kế Database

### 📊 Sơ đồ quan hệ (ERD)

Cơ sở dữ liệu được thiết kế với các bảng chính:

```
TaiKhoan (User accounts with roles)
├── SoDienThoai (Phone numbers - 1:N)
├── DonDat (Bookings - 1:N)
└── DanhGia (Reviews - 1:N)

Tour (Tour packages)
├── Trip (Tour schedules - 1:N)
│   ├── DonDat (Bookings - 1:N)
│   └── DanhGia (Reviews - 1:N)
└── ChiPhiTrip (Trip costs - 1:N)

DonDat (Bookings)
├── ThanhToan (Payments - 1:1)
└── KhuyenMai (Promotions - N:M via ApDungKhuyenMai)

KhuyenMai (Promotions)
└── ApDungKhuyenMai (Applied promotions - N:M)
```

### 🔑 Các bảng chính

#### **TaiKhoan** (Accounts)
- `TenNguoiDung` (PK): Username
- `MatKhau`: Hashed password (bcrypt)
- `Email`: Email address
- `CCCD`: ID card number
- `Role`: 'user' hoặc 'admin'
- `DiemTichLuy`: Loyalty points
- `TrangThai`: Account status

#### **Tour** (Tour packages)
- `IDTour` (PK): Tour ID
- `TenTour`: Tour name
- `MoTa`: Description
- `ChiPhiTour`: Base tour cost
- `LuongKhachDuKien`: Expected capacity
- `AnhTour`: Tour image URL

#### **Trip** (Tour schedules)
- `ID` (PK): Trip ID
- `IDTour` (FK): Reference to Tour
- `NgayBatDau`: Start date
- `NgayKetThuc`: End date
- `GiaVeNguoiLon`: Adult ticket price
- `GiaVeTreEm`: Child ticket price
- `SoLuongDaDat`: Booked quantity

#### **DonDat** (Bookings)
- `MaSo` (PK): Booking ID
- `TenNguoiDung` (FK): Username
- `IDTour`, `IDTrip` (FK): Tour and trip references
- `SoLuongVe_LON`, `SoLuongVe_TRE`: Ticket quantities
- `TongGia`: Total price
- `TrangThai`: Payment status (boolean)

#### **ThanhToan** (Payments)
- `IDThanhToan` (PK): Payment ID
- `MaSo` (FK): Booking reference
- `SoTien`: Amount
- `PhuongThuc`: Payment method
- `ThoiGian`: Payment timestamp

#### **KhuyenMai** (Promotions)
- `MaKhuyenMai` (PK): Promotion code
- `TenUuDai`: Promotion name
- `PhanTramGiam`: Discount percentage
- `TongDonToiThieu`: Minimum order value
- `NgayBatDau`, `NgayKetThuc`: Valid period

#### **DanhGia** (Reviews)
- `IDDanhGia` (PK): Review ID
- `TenNguoiDung`, `IDTour`, `IDTrip` (FK): References
- `Diem`: Rating (1-10)
- `NhanXet`: Review text

### ⚙️ Database Features

#### **Triggers**
- `trg_UpdateSoLuongDaDat`: Tự động cập nhật số lượng đã đặt khi có booking mới
- `trg_UpdateDiemTichLuy`: Cộng điểm tích lũy sau khi thanh toán thành công
- `trg_PreventAdminDelete`: Ngăn chặn xóa tài khoản admin

#### **Stored Procedures**
- `sp_CreateBooking`: Tạo đơn đặt tour với validation
- `sp_ProcessPayment`: Xử lý thanh toán và cập nhật trạng thái
- `sp_ApplyPromotion`: Áp dụng mã khuyến mãi và tính giá giảm
- `sp_GetUserBookingHistory`: Lấy lịch sử đặt tour của người dùng

#### **Functions**
- `fn_CalculateTotalRevenue`: Tính tổng doanh thu theo khoảng thời gian
- `fn_GetAverageRating`: Tính điểm đánh giá trung bình của tour
- `fn_CheckPromotionValidity`: Kiểm tra tính hợp lệ của mã khuyến mãi

## 🚀 Công nghệ sử dụng

### Backend
- **Node.js** v18+ - JavaScript runtime
- **Express.js** - Web framework
- **Prisma ORM** v6.7.0 - Database toolkit
- **MySQL** - Relational database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing

### Frontend
- **React** v18 - UI library
- **Vite** v6.3.5 - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications

## 📁 Cấu trúc dự án

```
traveloka-clone/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── middlewares/     # Auth, validation
│   │   ├── models/          # (Prisma handles this)
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # External services
│   │   ├── utils/           # Helper functions
│   │   └── app.js           # Express app setup
│   ├── server.js            # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/          # Images, fonts
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   └── package.json
│
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.js              # Sample data
│   └── migrations/          # Database migrations
│
└── docs/
    ├── database/            # SQL scripts
    ├── images/              # ERD diagrams
    └── report/              # Project documentation
```

## 🔧 Cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone <repository-url>
cd traveloka-clone
```

### 2. Cài đặt dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Cấu hình database

Tạo file `.env` trong thư mục `backend`:

```env
DATABASE_URL="mysql://username:password@localhost:3306/btl"
JWT_SECRET="your-secret-key"
PORT=5000
```

### 4. Thiết lập database

```bash
# Chạy migrations
npx prisma migrate dev

# Hoặc push schema trực tiếp
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed dữ liệu mẫu
npx prisma db seed
```

### 5. Chạy ứng dụng

```bash
# Terminal 1 - Backend (port 5000)
cd backend
npm start

# Terminal 2 - Frontend (port 5173)
cd frontend
npm run dev
```

Truy cập: http://localhost:5173

## 👥 Tài khoản mẫu

### Admin
- **Username**: nampham1401
- **Password**: 14012005

### User
- **Username**: user1
- **Password**: 123456

## ✨ Tính năng chính

### Người dùng (User)
- ✅ Đăng ký/Đăng nhập với validation đầy đủ
- ✅ Xem danh sách tour và chi tiết tour
- ✅ Đặt tour với chọn số lượng vé người lớn/trẻ em
- ✅ Áp dụng mã khuyến mãi
- ✅ Thanh toán đơn hàng (Tiền mặt/Chuyển khoản/Thẻ tín dụng)
- ✅ Xem lịch sử đặt tour
- ✅ Đánh giá tour đã tham gia
- ✅ Quản lý thông tin cá nhân và điểm tích lũy

### Quản trị viên (Admin)
- ✅ Dashboard thống kê tổng quan
- ✅ Quản lý người dùng (xem, xóa, reset mật khẩu)
- ✅ Quản lý tour (CRUD operations)
- ✅ Xem danh sách đơn đặt
- ✅ Quản lý giá vé theo trip
- ✅ Báo cáo doanh thu và thống kê

### Bảo mật
- 🔒 Mã hóa mật khẩu với bcrypt
- 🔒 JWT authentication
- 🔒 Role-based access control (RBAC)
- 🔒 Protected routes cho admin
- 🔒 Validation đầu vào đầy đủ

## 📊 Database Scripts

Các file SQL quan trọng trong `docs/database/`:

- `createtable_new.sql` - Tạo cấu trúc bảng
- `createValue_new.sql` - Dữ liệu mẫu
- `procedure_new.sql` - Stored procedures
- `function_news.sql` - User-defined functions
- `triggers_new.sql` - Database triggers
- `test_procedure.sql` - Test cases cho procedures
- `test_function_news.sql` - Test cases cho functions

## 🎨 Screenshots

_(Thêm ảnh chụp màn hình vào thư mục `docs/images/`)_

- Trang chủ và danh sách tour
- Chi tiết tour và đặt vé
- Trang thanh toán
- Admin dashboard
- Quản lý người dùng

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập

### Tours
- `GET /api/tours` - Lấy danh sách tours
- `GET /api/tours/:id` - Chi tiết tour

### Bookings
- `POST /api/bookings` - Tạo đơn đặt
- `GET /api/bookings/user` - Lịch sử đặt tour

### Payments
- `POST /api/payments` - Thanh toán đơn hàng

### Promotions
- `GET /api/promotions` - Danh sách khuyến mãi
- `POST /api/promotions/apply` - Áp dụng mã

### Reviews
- `POST /api/reviews` - Gửi đánh giá
- `GET /api/reviews/tour/:id` - Đánh giá của tour

### Admin (Protected)
- `GET /api/admin/stats` - Thống kê tổng quan
- `GET /api/admin/users` - Danh sách người dùng
- `DELETE /api/admin/users/:username` - Xóa người dùng
- `POST /api/admin/tours` - Tạo tour mới
- `PUT /api/admin/tours/:id` - Cập nhật tour

## 🔮 Tính năng tương lai

- [ ] Upload ảnh tour từ admin
- [ ] Tìm kiếm và lọc tour nâng cao
- [ ] Chat hỗ trợ trực tuyến
- [ ] Tích hợp thanh toán online (VNPay, Momo)
- [ ] Xuất báo cáo PDF
- [ ] Email xác nhận đặt tour
- [ ] Đánh giá với ảnh
- [ ] Recommender system dựa trên lịch sử

## 👨‍💻 Tác giả

**Nhóm sinh viên - BTL Database**
- Trường: [Tên trường]
- Môn học: Cơ sở dữ liệu
- Năm học: 2024-2025

## 📄 License

Dự án này được phát triển cho mục đích học tập.

## 🙏 Lời cảm ơn

- Cảm ơn giảng viên hướng dẫn
- Tham khảo thiết kế từ Traveloka.com
- Cộng đồng Prisma và React

---

⭐ **Nếu dự án hữu ích, hãy cho một star!** ⭐
