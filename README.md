<div align="center">

# 🏖️ Viet_Travel - Travel Tour Booking System

### *Modern travel tour management platform with comprehensive database design*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.7.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🚀 Demo](http://localhost:5174) • [📖 Documentation](./docs) • [🐛 Report Bug](https://github.com/yourusername/viet-travel/issues)

</div>

---

## 📋 Overview

**Viet_Travel** is a tour management and booking system built primarily to **demonstrate relational database design** for real-world applications. The project integrates comprehensive features including tour booking, payment processing, promotion application, trip reviews, and admin management dashboard.

### ✨ Key Features

- 🎯 **Professional Database Design** with complete ERD, triggers, stored procedures, functions
- 🔐 **High Security** with JWT authentication, bcrypt password hashing, role-based access control
- 💳 **Multiple Payment Methods** supporting cash, QR code transfer, credit card
- 📊 **Admin Dashboard** with comprehensive statistics, user and tour management
- 🎨 **Modern UI/UX** with Tailwind CSS and React components
- ⚡ **Optimized Performance** with Vite build tool and React 18

---

## 🏗️ System Architecture

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

## 🗄️ Database Design

### 📊 Entity Relationship Diagram (ERD)

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

### 🔑 Detailed Data Tables

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

### ⚙️ Advanced Database Features

#### 🔄 Triggers

```sql
-- Automatically update booked quantity
CREATE TRIGGER trg_UpdateSoLuongDaDat
AFTER INSERT ON DonDat
FOR EACH ROW
BEGIN
    UPDATE Trip SET SoLuongDaDat = SoLuongDaDat + NEW.SoLuongVe_LON + NEW.SoLuongVe_TRE
    WHERE ID = NEW.IDTrip;
END;

-- Add loyalty points after payment
CREATE TRIGGER trg_UpdateDiemTichLuy
AFTER INSERT ON ThanhToan
FOR EACH ROW
BEGIN
    UPDATE TaiKhoan t
    JOIN DonDat d ON d.MaSo = NEW.MaSo
    SET t.DiemTichLuy = t.DiemTichLuy + FLOOR(NEW.SoTien / 100000)
    WHERE t.TenNguoiDung = d.TenNguoiDung;
END;

-- Prevent admin account deletion
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
-- Create booking with validation
CALL sp_CreateBooking(username, tour_id, trip_id, adult_qty, child_qty);

-- Process payment
CALL sp_ProcessPayment(booking_id, payment_method, amount);

-- Apply promotion code
CALL sp_ApplyPromotion(booking_id, promo_code);

-- Get user booking history
CALL sp_GetUserBookingHistory(username);
```

#### ⚡ Functions

```sql
-- Calculate total revenue
SELECT fn_CalculateTotalRevenue('2024-01-01', '2024-12-31');

-- Get average rating
SELECT fn_GetAverageRating('TOUR001');

-- Check promotion validity
SELECT fn_CheckPromotionValidity('SUMMER2024');
```

---

## 🚀 Technology Stack

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

## 📁 Project Structure

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

## ⚡ Quick Start

### 📋 System Requirements

- ![Node.js](https://img.shields.io/badge/Node.js-18+-green) Node.js 18 or higher
- ![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue) MySQL 8.0 or higher
- ![npm](https://img.shields.io/badge/npm-9+-red) npm or yarn

### 🔧 Installation

#### 1️⃣ Clone repository

```bash
git clone https://github.com/yourusername/viet-travel.git
cd viet-travel
```

#### 2️⃣ Install dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

#### 3️⃣ Environment configuration

Create `.env` file in `backend` folder:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/btl"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this"

# Server
PORT=5000
NODE_ENV=development
```

#### 4️⃣ Database setup

```bash
cd backend

# Create database
mysql -u root -p
CREATE DATABASE btl;
exit;

# Run migrations
npx prisma migrate dev

# Or push schema directly
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed sample data (optional)
npx prisma db seed
```

#### 5️⃣ Run the application

```bash
# Terminal 1 - Backend (port 5000)
cd backend
npm start

# Terminal 2 - Frontend (port 5173)
cd frontend
npm run dev
```

#### 6️⃣ Access the application

🌐 **Frontend**: http://localhost:5173  
🔧 **Backend API**: http://localhost:5000  
📊 **Prisma Studio**: `npx prisma studio`

---

## 👥 Demo Accounts

<table>
<tr>
<td>

### 🔑 Admin Account

```
Username: nampham1401
Password: 14012005
```

**Permissions:**
- ✅ User management
- ✅ CRUD tours
- ✅ View all bookings
- ✅ Dashboard statistics

</td>
<td>

### 👤 User Account

```
Username: user1
Password: 123456
```

**Permissions:**
- ✅ Book tours
- ✅ Make payments
- ✅ View history
- ✅ Review tours

</td>
</tr>
</table>

---

## ✨ Detailed Features

### 🎯 For Users

<div align="center">

| Tính năng | Mô tả | Trạng thái |
|-----------|-------|-----------|
| 🔐 **Register/Login** | Authentication with full validation (email, ID card, password strength) | ✅ |
| 🏖️ **Browse tours** | Browse tour list with images, descriptions, prices | ✅ |
| 📅 **Tour details** | View itinerary, adult/child prices, reviews | ✅ |
| 🎫 **Book tour** | Select ticket quantity, departure date | ✅ |
| 🎁 **Promo codes** | Enter code or select from suggested matches | ✅ |
| 💳 **Payment** | Cash / QR transfer / Credit card | ✅ |
| 📜 **History** | View booked orders, payment status | ✅ |
| ⭐ **Reviews** | Rate and review completed tours | ✅ |
| 👤 **Profile** | View info, loyalty points, quick payment | ✅ |
| ⏰ **Auto-logout** | Automatically logout after 15 minutes of inactivity | ✅ |

</div>

### 🛡️ For Administrators

<div align="center">

| Tính năng | Mô tả | Trạng thái |
|-----------|-------|-----------|
| 📊 **Dashboard** | Overview statistics: revenue, bookings, users, tours | ✅ |
| 👥 **User management** | View list, delete users, reset password | ✅ |
| 🏖️ **Tour management** | CRUD operations: Create, Read, Update, Delete | ✅ |
| 📅 **Trip management** | Add new schedules, update prices per trip | ✅ |
| 📝 **View bookings** | List all bookings, filter by status | ✅ |
| 🎁 **Promotion management** | Create, edit, delete discount codes | ✅ |
| 📈 **Reports** | Export data, statistics by time period | 🚧 |

</div>

### 🔒 Security

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
POST   /api/auth/register          // Register new account
POST   /api/auth/login             // Login
GET    /api/auth/profile           // Get user info (protected)
```

</details>

<details>
<summary><b>🏖️ Tours & Trips</b></summary>

```javascript
GET    /api/tours                  // List tours
GET    /api/tours/:id              // Tour details
GET    /api/tours/:id/trips        // Tour schedules
POST   /api/admin/tours            // Create new tour (admin only)
PUT    /api/admin/tours/:id        // Update tour (admin only)
DELETE /api/admin/tours/:id        // Delete tour (admin only)
```

</details>

<details>
<summary><b>📝 Bookings</b></summary>

```javascript
POST   /api/bookings               // Create booking
GET    /api/bookings/user          // User booking history
GET    /api/admin/bookings         // All bookings (admin only)
```

</details>

<details>
<summary><b>💳 Payments</b></summary>

```javascript
POST   /api/payments               // Process payment
GET    /api/payments/history       // Payment history
```

</details>

<details>
<summary><b>🎁 Promotions</b></summary>

```javascript
GET    /api/promotions             // List promotions
POST   /api/promotions/apply       // Apply code
POST   /api/admin/promotions       // Create promotion (admin only)
```

</details>

<details>
<summary><b>⭐ Reviews</b></summary>

```javascript
POST   /api/reviews                // Submit review
GET    /api/reviews/tour/:id       // Tour reviews
```

</details>

<details>
<summary><b>🛡️ Admin</b></summary>

```javascript
GET    /api/admin/stats            // Dashboard statistics
GET    /api/admin/users            // List users
DELETE /api/admin/users/:username  // Delete user
POST   /api/admin/users/:username/reset-password  // Reset password
```

</details>

---

## 🎨 Screenshots

<div align="center">

### 🏠 Home Page
![Home Page](./docs/images/home.png)

### 📝 Booking & Payment
![Booking](./docs/images/booking.png)

</div>

---

## 🚀 Deployment

### Render.com (Recommended)

1. **Create account** at [Render.com](https://render.com)
2. **Connect GitHub** repository
3. **Create Web Service** for backend
4. **Create Static Site** for frontend
5. **Configure environment variables**

See `render.yaml` for details

### Other platforms

- **Vercel**: Frontend deployment
- **Railway**: Full-stack deployment
- **Heroku**: Backend + Database
- **AWS**: Production-grade deployment

---

## 📊 Database Scripts

In the `docs/database/` folder:

| File | Description |
|------|-------|
| `createtable_new.sql` | 🏭️ Create table structure |
| `createValue_new.sql` | 💾 Insert sample data |
| `triggers_new.sql` | ⚡ Database triggers |
| `procedure_new.sql` | 📦 Stored procedures |
| `function_news.sql` | ⚙️ User-defined functions |
| `test_procedure.sql` | 🧪 Test procedures |
| `test_function_news.sql` | 🧪 Test functions |
| `deleteTable.sql` | 🗑️ Drop tables |

---

## 🔮 Roadmap

- [ ] 📸 Upload tour images from admin panel
- [ ] 🔍 Advanced tour search and filtering (by price, date, location)
- [ ] 💬 Live chat support
- [ ] 💰 Online payment integration (VNPay, Momo, ZaloPay)
- [ ] 📄 Export PDF reports
- [ ] 📧 Booking confirmation email
- [ ] ⭐ Reviews with image upload
- [ ] 🤖 AI recommender system
- [ ] 📱 Mobile app (React Native)
- [ ] 🌐 Multi-language support (EN, VI)

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 👨‍💻 Author

<div align="center">

**Student Team - Database Course Project**

🏫 University: Ho Chi Minh City University of Technology
📚 Course: Database Systems
📅 Academic Year: 2024-2025

</div>

---

## 📝 License

This project was developed for **educational** and **research** purposes.

---

## 🙏 Acknowledgements

- 👨‍🏫 Thanks to our supervising instructor
- 💡 Design inspired by [Traveloka.com](https://www.traveloka.com)
- 🛠️ [Prisma](https://www.prisma.io/), [React](https://react.dev/), [Express.js](https://expressjs.com/) communities
- 📚 Stack Overflow, GitHub, and technical documentation

---

<div align="center">

### ⭐ If this project is helpful, please give it a star! ⭐

Made with ❤️ by HCMUT Student Team

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=viet-travel)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/viet-travel?style=social)](https://github.com/yourusername/viet-travel)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/viet-travel?style=social)](https://github.com/yourusername/viet-travel/fork)

[⬆ Back to top](#-viet_travel---travel-tour-booking-system)

</div>
