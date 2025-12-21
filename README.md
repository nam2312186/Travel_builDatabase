<div align="center">

# 🏖️ Viet_Travel - Hệ Thống Đặt Tour Du Lịch

### *Nền tảng quản lý tour du lịch hiện đại với thiết kế database toàn diện*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.7.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🚀 Demo](http://localhost:5174) • [📖 Tài liệu](./docs) • [🐛 Báo lỗi](https://github.com/yourusername/viet-travel/issues)

</div>

---

## 📋 Tổng quan

**Viet_Travel** là một hệ thống quản lý và đặt tour du lịch được xây dựng với mục đích chính là **minh họa thiết kế cơ sở dữ liệu quan hệ** cho ứng dụng thực tế. Dự án tích hợp đầy đủ các tính năng từ đặt tour, thanh toán, áp dụng khuyến mãi, đánh giá chuyến đi đến trang quản trị dành cho admin.

### ✨ Điểm nổi bật

- 🎯 **Thiết kế Database chuyên nghiệp** với ERD đầy đủ, triggers, stored procedures, functions
- 🔐 **Bảo mật cao** với JWT authentication, bcrypt password hashing, role-based access control
- 💳 **Thanh toán đa dạng** hỗ trợ tiền mặt, chuyển khoản QR code, thẻ tín dụng
- 📊 **Admin Dashboard** với thống kê tổng quan, quản lý người dùng và tour
- 🎨 **UI/UX hiện đại** với Tailwind CSS và React components
- ⚡ **Performance tối ưu** với Vite build tool và React 18

---

## 🏗️ Kiến trúc hệ thống

<div align="center">

```mermaid
graph TB
    subgraph Frontend
        A[React + TypeScript + Tailwind]
        B[React Router]
        C[Axios + Toast]
    end
    
    subgraph Backend
        D[Express.js API]
        E[JWT Auth Middleware]
        F[Prisma ORM]
    end
    
    subgraph Database
        G[(MySQL 8.0)]
        H[Triggers]
        I[Stored Procedures]
        J[Functions]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    G --> I
    G --> J
```

</div>

---

## 🗄️ Thiết kế cơ sở dữ liệu

### 📊 Sơ đồ quan hệ (ERD)

<div align="center">

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   TaiKhoan      │         │      Tour       │         │   KhuyenMai     │
│  (Accounts)     │         │   (Packages)    │         │  (Promotions)   │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ TenNguoiDung PK │───┐     │ IDTour PK       │───┐     │ MaKhuyenMai PK  │
│ MatKhau         │   │     │ TenTour         │   │     │ TenUuDai        │
│ Email           │   │     │ MoTa            │   │     │ PhanTramGiam    │
│ CCCD            │   │     │ ChiPhiTour      │   │     │ NgayBatDau      │
│ Role            │   │     │ AnhTour         │   │     │ NgayKetThuc     │
│ DiemTichLuy     │   │     └─────────────────┘   │     └─────────────────┘
└─────────────────┘   │              │             │              │
        │             │              │             │              │
        │             │     ┌────────┴────────┐    │              │
        │             │     │      Trip       │    │              │
        │             │     │   (Schedules)   │    │              │
        │             │     ├─────────────────┤    │              │
        │             │     │ ID PK           │    │              │
        │             │     │ IDTour FK       │────┘              │
        │             │     │ NgayBatDau      │                   │
        │             │     │ NgayKetThuc     │                   │
        │             │     │ GiaVeNguoiLon   │                   │
        │             │     │ GiaVeTreEm      │                   │
        │             │     └─────────────────┘                   │
        │             │              │                             │
        │             └──────────────┼─────────────────────────────┤
        │                            │                             │
        │                   ┌────────┴────────┐           ┌────────┴────────┐
        └───────────────────┤     DonDat      │───────────┤   ApDung        │
                            │   (Bookings)    │           │  (Applied)      │
                            ├─────────────────┤           ├─────────────────┤
                            │ MaSo PK         │           │ MaSo FK         │
                            │ TenNguoiDung FK │           │ MaKhuyenMai FK  │
                            │ IDTour FK       │           │ ThoiGianApDung  │
                            │ IDTrip FK       │           └─────────────────┘
                            │ TongGia         │
                            │ TrangThai       │
                            └─────────────────┘
                                     │
                            ┌────────┴────────┐
                            │   ThanhToan     │
                            │   (Payments)    │
                            ├─────────────────┤
                            │ IDThanhToan PK  │
                            │ MaSo FK         │
                            │ SoTien          │
                            │ PhuongThuc      │
                            │ ThoiGian        │
                            └─────────────────┘
```

</div>

### 🔑 Bảng dữ liệu chi tiết

<details>
<summary><b>📌 TaiKhoan (User Accounts)</b></summary>

| Field | Type | Description |
|-------|------|-------------|
| `TenNguoiDung` | VARCHAR(255) PK | Username (unique) |
| `MatKhau` | VARCHAR(255) | Bcrypt hashed password |
| `Email` | VARCHAR(255) | Email address |
| `CCCD` | VARCHAR(12) | ID card number |
| `Role` | ENUM('user','admin') | User role |
| `DiemTichLuy` | INT | Loyalty points |
| `TrangThai` | BOOLEAN | Account status |

</details>

<details>
<summary><b>🎫 Tour & Trip (Packages & Schedules)</b></summary>

**Tour (Tour Packages)**

| Field | Type | Description |
|-------|------|-------------|
| `IDTour` | VARCHAR(50) PK | Tour ID |
| `TenTour` | VARCHAR(255) | Tour name |
| `MoTa` | TEXT | Description |
| `ChiPhiTour` | DECIMAL(10,2) | Base cost |
| `AnhTour` | VARCHAR(500) | Image URL |

**Trip (Schedules)**

| Field | Type | Description |
|-------|------|-------------|
| `ID` | VARCHAR(50) PK | Trip ID |
| `IDTour` | VARCHAR(50) FK | Tour reference |
| `NgayBatDau` | DATE | Start date |
| `NgayKetThuc` | DATE | End date |
| `GiaVeNguoiLon` | DECIMAL(10,2) | Adult price |
| `GiaVeTreEm` | DECIMAL(10,2) | Child price |
| `SoLuongDaDat` | INT | Booked count |

</details>

<details>
<summary><b>📝 DonDat & ThanhToan (Bookings & Payments)</b></summary>

**DonDat (Bookings)**

| Field | Type | Description |
|-------|------|-------------|
| `MaSo` | VARCHAR(50) PK | Booking ID |
| `TenNguoiDung` | VARCHAR(255) FK | Username |
| `IDTour/IDTrip` | VARCHAR(50) FK | Tour/Trip ref |
| `SoLuongVe_LON` | INT | Adult tickets |
| `SoLuongVe_TRE` | INT | Child tickets |
| `TongGia` | DECIMAL(10,2) | Total price |
| `TrangThai` | BOOLEAN | Payment status |

**ThanhToan (Payments)**

| Field | Type | Description |
|-------|------|-------------|
| `IDThanhToan` | INT PK AUTO | Payment ID |
| `MaSo` | VARCHAR(50) FK | Booking ref |
| `SoTien` | DECIMAL(10,2) | Amount |
| `PhuongThuc` | VARCHAR(50) | Payment method |
| `ThoiGian` | TIMESTAMP | Payment time |

</details>

<details>
<summary><b>🎁 KhuyenMai & ApDung (Promotions)</b></summary>

**KhuyenMai (Promotions)**

| Field | Type | Description |
|-------|------|-------------|
| `MaKhuyenMai` | VARCHAR(50) PK | Promo code |
| `TenUuDai` | VARCHAR(255) | Promo name |
| `PhanTramGiam` | INT | Discount % |
| `TongDonToiThieu` | DECIMAL(10,2) | Min order value |
| `NgayBatDau/KetThuc` | DATE | Valid period |

**ApDung (Applied Promotions)**

| Field | Type | Description |
|-------|------|-------------|
| `MaSo` | VARCHAR(50) FK | Booking ref |
| `MaKhuyenMai` | VARCHAR(50) FK | Promo code |
| `ThoiGianApDung` | TIMESTAMP | Applied time |

</details>

### ⚙️ Tính năng Database nâng cao

#### 🔄 Triggers

```sql
-- Tự động cập nhật số lượng đã đặt
CREATE TRIGGER trg_UpdateSoLuongDaDat
AFTER INSERT ON DonDat
FOR EACH ROW
BEGIN
    UPDATE Trip SET SoLuongDaDat = SoLuongDaDat + NEW.SoLuongVe_LON + NEW.SoLuongVe_TRE
    WHERE ID = NEW.IDTrip;
END;

-- Cộng điểm tích lũy sau thanh toán
CREATE TRIGGER trg_UpdateDiemTichLuy
AFTER INSERT ON ThanhToan
FOR EACH ROW
BEGIN
    UPDATE TaiKhoan t
    JOIN DonDat d ON d.MaSo = NEW.MaSo
    SET t.DiemTichLuy = t.DiemTichLuy + FLOOR(NEW.SoTien / 100000)
    WHERE t.TenNguoiDung = d.TenNguoiDung;
END;

-- Ngăn xóa tài khoản admin
CREATE TRIGGER trg_PreventAdminDelete
BEFORE DELETE ON TaiKhoan
FOR EACH ROW
BEGIN
    IF OLD.Role = 'admin' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete admin account';
    END IF;
END;
```

#### 📦 Stored Procedures

```sql
-- Tạo đơn đặt với validation
CALL sp_CreateBooking(username, tour_id, trip_id, adult_qty, child_qty);

-- Xử lý thanh toán
CALL sp_ProcessPayment(booking_id, payment_method, amount);

-- Áp dụng mã khuyến mãi
CALL sp_ApplyPromotion(booking_id, promo_code);

-- Lấy lịch sử đặt tour
CALL sp_GetUserBookingHistory(username);
```

#### ⚡ Functions

```sql
-- Tính tổng doanh thu
SELECT fn_CalculateTotalRevenue('2024-01-01', '2024-12-31');

-- Điểm đánh giá trung bình
SELECT fn_GetAverageRating('TOUR001');

-- Kiểm tra mã khuyến mãi
SELECT fn_CheckPromotionValidity('SUMMER2024');
```

---

## 🚀 Công nghệ sử dụng

<div align="center">

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | 18+ | JavaScript Runtime |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | 4.18+ | Web Framework |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) | 6.7.0 | ORM Database Toolkit |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) | 8.0+ | Relational Database |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | - | Authentication |
| ![bcrypt](https://img.shields.io/badge/bcrypt-338833?style=flat) | - | Password Hashing |

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | 18+ | UI Library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | 5+ | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | 6.3.5 | Build Tool |
| ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white) | 3+ | CSS Framework |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=reactrouter&logoColor=white) | 6+ | Routing |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) | - | HTTP Client |

</div>

---

## 📁 Cấu trúc dự án

```bash
viet-travel/
│
├── 📂 backend/                 # Node.js + Express API
│   ├── 📂 src/
│   │   ├── 📂 controllers/     # Business logic handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── tour.controller.js
│   │   │   ├── booking.controller.js
│   │   │   ├── payment.controller.js
│   │   │   └── admin.controller.js
│   │   ├── 📂 middlewares/     # Auth & validation
│   │   │   └── auth.middleware.js
│   │   ├── 📂 routes/          # API endpoints
│   │   │   ├── auth.routes.js
│   │   │   ├── tour.routes.js
│   │   │   └── admin.routes.js
│   │   ├── 📂 utils/           # Helper functions
│   │   │   └── jwt.js
│   │   └── 📄 app.js           # Express setup
│   ├── 📄 server.js            # Server entry point
│   ├── 📄 package.json
│   └── 📄 .env                 # Environment variables
│
├── 📂 frontend/                # React + TypeScript
│   ├── 📂 src/
│   │   ├── 📂 assets/          # Images, fonts, icons
│   │   │   └── backgroundLogin.png
│   │   ├── 📂 components/      # Reusable components
│   │   │   ├── Header.jsx
│   │   │   └── PageLayout.jsx
│   │   ├── 📂 pages/           # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── TourDetail.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── History.jsx
│   │   ├── 📂 utils/           # Frontend utilities
│   │   │   └── autoLogout.js
│   │   ├── 📄 App.jsx          # Main app
│   │   ├── 📄 main.tsx         # Entry point
│   │   └── 📄 index.css        # Global styles
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   ├── 📄 tailwind.config.js
│   └── 📄 tsconfig.json
│
├── 📂 prisma/                  # Database ORM
│   ├── 📄 schema.prisma        # Database schema
│   ├── 📄 seed.js              # Sample data seeder
│   └── 📂 migrations/          # Migration history
│
├── 📂 docs/                    # Documentation
│   ├── 📂 database/            # SQL scripts
│   │   ├── createtable_new.sql
│   │   ├── createValue_new.sql
│   │   ├── triggers_new.sql
│   │   ├── procedure_new.sql
│   │   └── function_news.sql
│   ├── 📂 images/              # Screenshots, ERD
│   └── 📂 report/              # Project reports
│
├── 📄 README.md                # This file
├── 📄 .gitignore
└── 📄 render.yaml              # Deployment config
```

---

## ⚡ Bắt đầu nhanh

### 📋 Yêu cầu hệ thống

- ![Node.js](https://img.shields.io/badge/Node.js-18+-green) Node.js 18 hoặc cao hơn
- ![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue) MySQL 8.0 hoặc cao hơn
- ![npm](https://img.shields.io/badge/npm-9+-red) npm hoặc yarn

### 🔧 Cài đặt

#### 1️⃣ Clone repository

```bash
git clone https://github.com/yourusername/viet-travel.git
cd viet-travel
```

#### 2️⃣ Cài đặt dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

#### 3️⃣ Cấu hình môi trường

Tạo file `.env` trong thư mục `backend`:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/btl"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this"

# Server
PORT=5000
NODE_ENV=development
```

#### 4️⃣ Thiết lập database

```bash
cd backend

# Tạo database
mysql -u root -p
CREATE DATABASE btl;
exit;

# Chạy migrations
npx prisma migrate dev

# Hoặc push schema trực tiếp
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed dữ liệu mẫu (optional)
npx prisma db seed
```

#### 5️⃣ Chạy ứng dụng

```bash
# Terminal 1 - Backend (port 5000)
cd backend
npm start

# Terminal 2 - Frontend (port 5173)
cd frontend
npm run dev
```

#### 6️⃣ Truy cập ứng dụng

🌐 **Frontend**: http://localhost:5173  
🔧 **Backend API**: http://localhost:5000  
📊 **Prisma Studio**: `npx prisma studio`

---

## 👥 Tài khoản demo

<table>
<tr>
<td>

### 🔑 Admin Account

```
Username: nampham1401
Password: 14012005
```

**Quyền hạn:**
- ✅ Quản lý người dùng
- ✅ CRUD tours
- ✅ Xem tất cả bookings
- ✅ Thống kê dashboard

</td>
<td>

### 👤 User Account

```
Username: user1
Password: 123456
```

**Quyền hạn:**
- ✅ Đặt tour
- ✅ Thanh toán
- ✅ Xem lịch sử
- ✅ Đánh giá tour

</td>
</tr>
</table>

---

## ✨ Tính năng chi tiết

### 🎯 Dành cho người dùng (User)

<div align="center">

| Tính năng | Mô tả | Trạng thái |
|-----------|-------|-----------|
| 🔐 **Đăng ký/Đăng nhập** | Xác thực với validation đầy đủ (email, CCCD, password strength) | ✅ |
| 🏖️ **Xem tour** | Browse danh sách tour với hình ảnh, mô tả, giá vé | ✅ |
| 📅 **Chi tiết tour** | Xem lịch trình, giá vé người lớn/trẻ em, đánh giá | ✅ |
| 🎫 **Đặt tour** | Chọn số lượng vé, ngày khởi hành | ✅ |
| 🎁 **Mã khuyến mãi** | Nhập mã hoặc chọn từ gợi ý phù hợp | ✅ |
| 💳 **Thanh toán** | Tiền mặt / Chuyển khoản QR / Thẻ tín dụng | ✅ |
| 📜 **Lịch sử** | Xem đơn đã đặt, trạng thái thanh toán | ✅ |
| ⭐ **Đánh giá** | Rate và review tour đã tham gia | ✅ |
| 👤 **Hồ sơ** | Xem thông tin, điểm tích lũy, thanh toán nhanh | ✅ |
| ⏰ **Auto-logout** | Tự động đăng xuất sau 15 phút không hoạt động | ✅ |

</div>

### 🛡️ Dành cho quản trị viên (Admin)

<div align="center">

| Tính năng | Mô tả | Trạng thái |
|-----------|-------|-----------|
| 📊 **Dashboard** | Thống kê tổng quan: doanh thu, booking, users, tours | ✅ |
| 👥 **Quản lý user** | Xem danh sách, xóa user, reset password | ✅ |
| 🏖️ **Quản lý tour** | CRUD operations: Create, Read, Update, Delete | ✅ |
| 📅 **Quản lý trip** | Thêm lịch trình mới, cập nhật giá vé theo trip | ✅ |
| 📝 **Xem bookings** | Danh sách tất cả đơn đặt, filter theo trạng thái | ✅ |
| 🎁 **Quản lý khuyến mãi** | Tạo, sửa, xóa mã giảm giá | ✅ |
| 📈 **Báo cáo** | Export dữ liệu, thống kê theo khoảng thời gian | 🚧 |

</div>

### 🔒 Bảo mật

- ✅ **Password hashing** với bcrypt (salt rounds: 10)
- ✅ **JWT authentication** với access tokens
- ✅ **Role-based access control** (RBAC)
- ✅ **Protected API routes** với middleware
- ✅ **Input validation** trên cả frontend và backend
- ✅ **SQL injection prevention** với Prisma ORM
- ✅ **XSS protection** với React escaping
- ✅ **CORS configuration** cho production

---

## 📡 API Endpoints

<details>
<summary><b>🔐 Authentication</b></summary>

```javascript
POST   /api/auth/register          // Đăng ký tài khoản mới
POST   /api/auth/login             // Đăng nhập
GET    /api/auth/profile           // Lấy thông tin user (protected)
```

</details>

<details>
<summary><b>🏖️ Tours & Trips</b></summary>

```javascript
GET    /api/tours                  // Danh sách tours
GET    /api/tours/:id              // Chi tiết tour
GET    /api/tours/:id/trips        // Lịch trình của tour
POST   /api/admin/tours            // Tạo tour mới (admin only)
PUT    /api/admin/tours/:id        // Cập nhật tour (admin only)
DELETE /api/admin/tours/:id        // Xóa tour (admin only)
```

</details>

<details>
<summary><b>📝 Bookings</b></summary>

```javascript
POST   /api/bookings               // Tạo đơn đặt
GET    /api/bookings/user          // Lịch sử đặt tour của user
GET    /api/admin/bookings         // Tất cả bookings (admin only)
```

</details>

<details>
<summary><b>💳 Payments</b></summary>

```javascript
POST   /api/payments               // Thanh toán đơn hàng
GET    /api/payments/history       // Lịch sử thanh toán
```

</details>

<details>
<summary><b>🎁 Promotions</b></summary>

```javascript
GET    /api/promotions             // Danh sách khuyến mãi
POST   /api/promotions/apply       // Áp dụng mã
POST   /api/admin/promotions       // Tạo khuyến mãi (admin only)
```

</details>

<details>
<summary><b>⭐ Reviews</b></summary>

```javascript
POST   /api/reviews                // Gửi đánh giá
GET    /api/reviews/tour/:id       // Đánh giá của tour
```

</details>

<details>
<summary><b>🛡️ Admin</b></summary>

```javascript
GET    /api/admin/stats            // Thống kê dashboard
GET    /api/admin/users            // Danh sách users
DELETE /api/admin/users/:username  // Xóa user
POST   /api/admin/users/:username/reset-password  // Reset password
```

</details>

---

## 🎨 Screenshots

<div align="center">

### 🏠 Trang chủ
![Home Page](./docs/images/home.png)

### 📝 Đặt tour & Thanh toán
![Booking](./docs/images/booking.png)

</div>

---

## 🚀 Deployment

### Render.com (Recommended)

1. **Tạo tài khoản** tại [Render.com](https://render.com)
2. **Connect GitHub** repository
3. **Tạo Web Service** cho backend
4. **Tạo Static Site** cho frontend
5. **Cấu hình environment variables**

Chi tiết xem file `render.yaml`

### Các nền tảng khác

- **Vercel**: Frontend deployment
- **Railway**: Full-stack deployment
- **Heroku**: Backend + Database
- **AWS**: Production-grade deployment

---

## 📊 Database Scripts

Trong thư mục `docs/database/`:

| File | Mô tả |
|------|-------|
| `createtable_new.sql` | 🏗️ Tạo cấu trúc bảng |
| `createValue_new.sql` | 💾 Insert dữ liệu mẫu |
| `triggers_new.sql` | ⚡ Database triggers |
| `procedure_new.sql` | 📦 Stored procedures |
| `function_news.sql` | ⚙️ User-defined functions |
| `test_procedure.sql` | 🧪 Test procedures |
| `test_function_news.sql` | 🧪 Test functions |
| `deleteTable.sql` | 🗑️ Drop tables |

---

## 🔮 Roadmap

- [ ] 📸 Upload ảnh tour từ admin panel
- [ ] 🔍 Tìm kiếm và lọc tour nâng cao (theo giá, ngày, địa điểm)
- [ ] 💬 Chat hỗ trợ trực tuyến
- [ ] 💰 Tích hợp thanh toán online (VNPay, Momo, ZaloPay)
- [ ] 📄 Xuất báo cáo PDF
- [ ] 📧 Email xác nhận đặt tour
- [ ] ⭐ Review với upload ảnh
- [ ] 🤖 AI recommender system
- [ ] 📱 Mobile app (React Native)
- [ ] 🌐 Multi-language support (EN, VI)

---

## 🤝 Đóng góp

Contributions, issues và feature requests đều được chào đón!

1. Fork dự án
2. Tạo branch tính năng (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 👨‍💻 Tác giả

<div align="center">

**Nhóm sinh viên - Đồ án BTL Database**

🏫 Trường: Đại học Bách Khoa TP.HCM  
📚 Môn học: Cơ sở dữ liệu  
📅 Năm học: 2024-2025

</div>

---

## 📝 License

Dự án này được phát triển cho mục đích **học tập** và **nghiên cứu**.

---

## 🙏 Lời cảm ơn

- 👨‍🏫 Cảm ơn giảng viên hướng dẫn
- 💡 Tham khảo thiết kế từ [Traveloka.com](https://www.traveloka.com)
- 🛠️ Cộng đồng [Prisma](https://www.prisma.io/), [React](https://react.dev/), [Express.js](https://expressjs.com/)
- 📚 Stack Overflow, GitHub, và các tài liệu kỹ thuật

---

<div align="center">

### ⭐ Nếu dự án hữu ích, hãy cho một star! ⭐

Made with ❤️ by Nhóm sinh viên HCMUT

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=viet-travel)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/viet-travel?style=social)](https://github.com/yourusername/viet-travel)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/viet-travel?style=social)](https://github.com/yourusername/viet-travel/fork)

[⬆ Về đầu trang](#-viet_travel---hệ-thống-đặt-tour-du-lịch)

</div>
