DROP DATABASE btl_test;
-- CREATE DATABASE btl;
-- USE btl;
-- Active: 1744311393966@@127.0.0.1@3306@AssignmentDB
CREATE TABLE
    TaiKhoan (
        CCCD VARCHAR(12) NOT NULL UNIQUE,
        DiaChi VARCHAR(100) NOT NULL,
        Email VARCHAR(100) NOT NULL,
        GioiTinh VARCHAR(10) NOT NULL CHECK (GioiTinh IN ('Nam', 'Nữ', 'Khác')),
        NgaySinh DATE NOT NULL,
        DiemTichLuy INT DEFAULT 0,
        TenNguoiDung VARCHAR(50) NOT NULL UNIQUE,
        MatKhau VARCHAR(255) NOT NULL,
        TrangThai BOOLEAN NOT NULL CHECK (
            TrangThai IN (0, 1)
        ),
        PRIMARY KEY (TenNguoiDung)
    );

CREATE TABLE
    SoDienThoai (
        TenNguoiDung VARCHAR(12) NOT NULL ,
        SoDienThoai VARCHAR(15) NOT NULL,
        PRIMARY KEY (TenNguoiDung, SoDienThoai),
        FOREIGN KEY (TenNguoiDung) REFERENCES TaiKhoan (TenNguoiDung) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    Tour (
        IDTour VARCHAR(50) NOT NULL,
        TenTour VARCHAR(100) NOT NULL,
        AnhTour TEXT,
        MoTa TEXT,
        ChiPhiTour DECIMAL(12, 2) NOT NULL,
        LuongKhachDuKien INT NOT NULL,
        PRIMARY KEY (IDTour)
    );

CREATE TABLE
    Trip (
        IDTour VARCHAR(50) NOT NULL,
        ID VARCHAR(50) NOT NULL,
        NgayKhoiHanh DATE NOT NULL,
        NgayKetThuc DATE NOT NULL,
        CHECK (NgayKhoiHanh <= NgayKetThuc),
        MoTa TEXT,
        ChiPhiThucTe DECIMAL(12, 2) NOT NULL,
        NoiDon TEXT NOT NULL,
        GiaVeNguoiLon DECIMAL(12, 2) NOT NULL,
        GiaVeTreEm DECIMAL(12, 2) NOT NULL,
        PRIMARY KEY (ID,IDTour),
        FOREIGN KEY (IDTour) REFERENCES Tour (IDTour) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    DonDat (
        MaSo VARCHAR(50) NOT NULL,
        TenNguoiDung VARCHAR(50) NOT NULL,
        IDTrip VARCHAR(50) NOT NULL,
        IDTour VARCHAR(50) NOT NULL,
        SoLuongVe_LON INT NOT NULL,
        SoLuongVe_TRE INT NOT NULL,
        TrangThai BOOLEAN NOT NULL CHECK (
            TrangThai IN (0, 1)
        ),
        GhiChu TEXT,
        ThoiGianDat DATETIME NOT NULL,
        TongGia DECIMAL(12, 2) DEFAULT 0,
        PRIMARY KEY (MaSo),
        FOREIGN KEY (TenNguoiDung) REFERENCES TaiKhoan (TenNguoiDung) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (IDTrip, IDTour) REFERENCES Trip (ID, IDTour) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    KhuyenMai (
        MaKhuyenMai VARCHAR(50) NOT NULL,
        TenUuDai VARCHAR(100) NOT NULL,
        DieuKien TEXT,
        SoLuong INT NOT NULL,
        NgayBatDau DATE NOT NULL,
        NgayKetThuc DATE NOT NULL,
        DiemThuong INT DEFAULT 0,
        GiamPhanTram DECIMAL(5, 2),
        GiamSoTien DECIMAL(12, 2),
        GiamToiDa DECIMAL(12, 2),
        TongDonToiThieu DECIMAL(12, 2),
        PRIMARY KEY (MaKhuyenMai)
    );

CREATE TABLE 
    ApDung (
        MaSo VARCHAR(50) NOT NULL,
        MaKhuyenMai VARCHAR(50) NOT NULL,
        PRIMARY KEY (MaSo),
        FOREIGN KEY (MaSo) REFERENCES DonDat (MaSo) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (MaKhuyenMai) REFERENCES KhuyenMai (MaKhuyenMai) ON DELETE CASCADE ON UPDATE CASCADE
    );


CREATE TABLE
    HuongDanVien (
        ID VARCHAR(50) NOT NULL,
        Ho VARCHAR(50) NOT NULL,
        TenDem VARCHAR(50),
        Ten VARCHAR(50) NOT NULL,
        IDQuanLy VARCHAR(50),
        FOREIGN KEY (IDQuanLy) REFERENCES HuongDanVien (ID) ON DELETE SET NULL ON UPDATE CASCADE,
        PRIMARY KEY (ID)
    );

CREATE TABLE
    NgoaiNgu (
        ID VARCHAR(50) NOT NULL,
        NgoaiNgu VARCHAR(50),
        PRIMARY KEY (ID, NgoaiNgu),
        FOREIGN KEY (ID) REFERENCES HuongDanVien (ID) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    PhuTrach (
        IDTour VARCHAR(50) NOT NULL,
        IDHuongDanVien VARCHAR(50) NOT NULL,
        IDTrip VARCHAR(50) NOT NULL,
        NgayBatDau DATE NOT NULL,
        NgayKetThuc DATE NOT NULL,
        CHECK (NgayBatDau <= NgayKetThuc),
        PRIMARY KEY (IDHuongDanVien, IDTrip,IDTour),
        FOREIGN KEY (IDHuongDanVien) REFERENCES HuongDanVien (ID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (IDTrip) REFERENCES Trip (ID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (IDTour) REFERENCES Tour (IDTour) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    ThanhToan (
        ID VARCHAR(50) NOT NULL,
        MaSo VARCHAR(50) NOT NULL,
        NgayThanhToan DATE NOT NULL,
        SoTien DECIMAL(12, 2) NOT NULL,
        PhuongThucThanhToan VARCHAR(50) NOT NULL CHECK (
            PhuongThucThanhToan IN ('Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng')
        ),
        PRIMARY KEY (ID),
        FOREIGN KEY (MaSo) REFERENCES DonDat (MaSo) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    DiaDiem (
        ID VARCHAR(50) NOT NULL,
        AnhMoTa LONGBLOB,
        GhiChuMoTa TEXT,
        Xa VARCHAR(50) NOT NULL,
        Huyen VARCHAR(50) NOT NULL,
        Tinh VARCHAR(50) NOT NULL,
        PRIMARY KEY (ID)
    );

CREATE TABLE
    Den (
        IDTour VARCHAR(50) NOT NULL,
        IDDiaDiem VARCHAR(50) NOT NULL,
        TrinhTu INT NOT NULL,
        PhuongTien VARCHAR(50) NOT NULL ,
        ThoiGianMoiDiaDiem TIME NOT NULL,
        PRIMARY KEY (IDTour, IDDiaDiem),
        FOREIGN KEY (IDTour) REFERENCES Tour (IDTour) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (IDDiaDiem) REFERENCES DiaDiem (ID) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    NhaHang (
        ID VARCHAR(50) NOT NULL,
        TenNhaHang VARCHAR(100) NOT NULL,
        PhongCachTrangTri TEXT,
        PhongCachAmThuc TEXT,
        PRIMARY KEY (ID),
        FOREIGN KEY (ID) REFERENCES DiaDiem (ID) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    KhachSan (
        ID VARCHAR(50) NOT NULL,
        TenKhachSan VARCHAR(100) NOT NULL,
        LoaiPhong VARCHAR(50) NOT NULL CHECK (
            LoaiPhong IN ('Phòng đơn', 'Phòng đôi', 'Phòng bốn')
        ),
        PRIMARY KEY (ID),
        FOREIGN KEY (ID) REFERENCES DiaDiem (ID) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    SDTLeTan (
        IDKhachSan VARCHAR(50) NOT NULL,
        SoDienThoai VARCHAR(20) NOT NULL,
        PRIMARY KEY (IDKhachSan, SoDienThoai),
        FOREIGN KEY (IDKhachSan) REFERENCES KhachSan (ID) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    DanhGia (
        Diem INT CHECK (Diem BETWEEN 1 AND 10),
        NhanXet TEXT,
        TenNguoiDanhGia VARCHAR(50) NOT NULL,
        IDTrip VARCHAR(50) NOT NULL,
        IDTour VARCHAR(50) NOT NULL,
        PRIMARY KEY (TenNguoiDanhGia, IDTrip, IDTour),
        FOREIGN KEY (TenNguoiDanhGia) REFERENCES TaiKhoan (TenNguoiDung) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (IDTrip, IDTour) REFERENCES Trip (ID, IDTour) ON DELETE CASCADE ON UPDATE CASCADE
    );