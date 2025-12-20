-- CreateTable
CREATE TABLE `TaiKhoan` (
    `TenNguoiDung` VARCHAR(191) NOT NULL,
    `CCCD` VARCHAR(191) NOT NULL,
    `DiaChi` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `GioiTinh` VARCHAR(191) NOT NULL,
    `NgaySinh` DATETIME(3) NOT NULL,
    `DiemTichLuy` INTEGER NOT NULL DEFAULT 0,
    `MatKhau` VARCHAR(191) NOT NULL,
    `TrangThai` BOOLEAN NOT NULL,

    UNIQUE INDEX `TaiKhoan_CCCD_key`(`CCCD`),
    PRIMARY KEY (`TenNguoiDung`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SoDienThoai` (
    `TenNguoiDung` VARCHAR(191) NOT NULL,
    `SoDienThoai` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`TenNguoiDung`, `SoDienThoai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour` (
    `IDTour` VARCHAR(191) NOT NULL,
    `TenTour` VARCHAR(191) NOT NULL,
    `AnhTour` VARCHAR(191) NULL,
    `MoTa` VARCHAR(191) NULL,
    `ChiPhiTour` DECIMAL(65, 30) NOT NULL,
    `LuongKhachDuKien` INTEGER NOT NULL,

    PRIMARY KEY (`IDTour`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trip` (
    `IDTour` VARCHAR(191) NOT NULL,
    `ID` VARCHAR(191) NOT NULL,
    `NgayKhoiHanh` DATETIME(3) NOT NULL,
    `NgayKetThuc` DATETIME(3) NOT NULL,
    `MoTa` VARCHAR(191) NULL,
    `ChiPhiThucTe` DECIMAL(65, 30) NOT NULL,
    `NoiDon` VARCHAR(191) NOT NULL,
    `GiaVeNguoiLon` DECIMAL(65, 30) NOT NULL,
    `GiaVeTreEm` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Trip_ID_key`(`ID`),
    PRIMARY KEY (`ID`, `IDTour`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DonDat` (
    `MaSo` VARCHAR(191) NOT NULL,
    `TenNguoiDung` VARCHAR(191) NOT NULL,
    `IDTrip` VARCHAR(191) NOT NULL,
    `IDTour` VARCHAR(191) NOT NULL,
    `SoLuongVe_LON` INTEGER NOT NULL,
    `SoLuongVe_TRE` INTEGER NOT NULL,
    `TrangThai` BOOLEAN NOT NULL,
    `GhiChu` VARCHAR(191) NULL,
    `ThoiGianDat` DATETIME(3) NOT NULL,
    `TongGia` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    PRIMARY KEY (`MaSo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KhuyenMai` (
    `MaKhuyenMai` VARCHAR(191) NOT NULL,
    `TenUuDai` VARCHAR(191) NOT NULL,
    `DieuKien` VARCHAR(191) NULL,
    `SoLuong` INTEGER NOT NULL,
    `NgayBatDau` DATETIME(3) NOT NULL,
    `NgayKetThuc` DATETIME(3) NOT NULL,
    `DiemThuong` INTEGER NOT NULL DEFAULT 0,
    `GiamPhanTram` DECIMAL(65, 30) NULL,
    `GiamSoTien` DECIMAL(65, 30) NULL,
    `GiamToiDa` DECIMAL(65, 30) NULL,
    `TongDonToiThieu` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`MaKhuyenMai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApDung` (
    `MaSo` VARCHAR(191) NOT NULL,
    `MaKhuyenMai` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ApDung_MaSo_key`(`MaSo`),
    PRIMARY KEY (`MaSo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HuongDanVien` (
    `ID` VARCHAR(191) NOT NULL,
    `Ho` VARCHAR(191) NOT NULL,
    `TenDem` VARCHAR(191) NULL,
    `Ten` VARCHAR(191) NOT NULL,
    `IDQuanLy` VARCHAR(191) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NgoaiNgu` (
    `ID` VARCHAR(191) NOT NULL,
    `NgoaiNgu` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`, `NgoaiNgu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhuTrach` (
    `IDTour` VARCHAR(191) NOT NULL,
    `IDHuongDanVien` VARCHAR(191) NOT NULL,
    `IDTrip` VARCHAR(191) NOT NULL,
    `NgayBatDau` DATETIME(3) NOT NULL,
    `NgayKetThuc` DATETIME(3) NOT NULL,

    PRIMARY KEY (`IDHuongDanVien`, `IDTrip`, `IDTour`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ThanhToan` (
    `ID` VARCHAR(191) NOT NULL,
    `MaSo` VARCHAR(191) NOT NULL,
    `NgayThanhToan` DATETIME(3) NOT NULL,
    `SoTien` DECIMAL(65, 30) NOT NULL,
    `PhuongThucThanhToan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ThanhToan_MaSo_key`(`MaSo`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiaDiem` (
    `ID` VARCHAR(191) NOT NULL,
    `AnhMoTa` LONGBLOB NULL,
    `GhiChuMoTa` VARCHAR(191) NULL,
    `Xa` VARCHAR(191) NOT NULL,
    `Huyen` VARCHAR(191) NOT NULL,
    `Tinh` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Den` (
    `IDTour` VARCHAR(191) NOT NULL,
    `IDDiaDiem` VARCHAR(191) NOT NULL,
    `TrinhTu` INTEGER NOT NULL,
    `PhuongTien` VARCHAR(191) NOT NULL,
    `ThoiGianMoiDiaDiem` DATETIME(3) NOT NULL,

    PRIMARY KEY (`IDTour`, `IDDiaDiem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NhaHang` (
    `ID` VARCHAR(191) NOT NULL,
    `TenNhaHang` VARCHAR(191) NOT NULL,
    `PhongCachTrangTri` VARCHAR(191) NULL,
    `PhongCachAmThuc` VARCHAR(191) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KhachSan` (
    `ID` VARCHAR(191) NOT NULL,
    `TenKhachSan` VARCHAR(191) NOT NULL,
    `LoaiPhong` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SDTLeTan` (
    `IDKhachSan` VARCHAR(191) NOT NULL,
    `SoDienThoai` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IDKhachSan`, `SoDienThoai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DanhGia` (
    `Diem` INTEGER NOT NULL,
    `NhanXet` VARCHAR(191) NULL,
    `TenNguoiDanhGia` VARCHAR(191) NOT NULL,
    `IDTrip` VARCHAR(191) NOT NULL,
    `IDTour` VARCHAR(191) NOT NULL,
    `tourIDTour` VARCHAR(191) NULL,

    PRIMARY KEY (`TenNguoiDanhGia`, `IDTrip`, `IDTour`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SoDienThoai` ADD CONSTRAINT `SoDienThoai_TenNguoiDung_fkey` FOREIGN KEY (`TenNguoiDung`) REFERENCES `TaiKhoan`(`TenNguoiDung`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_IDTour_fkey` FOREIGN KEY (`IDTour`) REFERENCES `Tour`(`IDTour`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonDat` ADD CONSTRAINT `DonDat_TenNguoiDung_fkey` FOREIGN KEY (`TenNguoiDung`) REFERENCES `TaiKhoan`(`TenNguoiDung`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonDat` ADD CONSTRAINT `DonDat_IDTrip_IDTour_fkey` FOREIGN KEY (`IDTrip`, `IDTour`) REFERENCES `Trip`(`ID`, `IDTour`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApDung` ADD CONSTRAINT `ApDung_MaSo_fkey` FOREIGN KEY (`MaSo`) REFERENCES `DonDat`(`MaSo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApDung` ADD CONSTRAINT `ApDung_MaKhuyenMai_fkey` FOREIGN KEY (`MaKhuyenMai`) REFERENCES `KhuyenMai`(`MaKhuyenMai`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HuongDanVien` ADD CONSTRAINT `HuongDanVien_IDQuanLy_fkey` FOREIGN KEY (`IDQuanLy`) REFERENCES `HuongDanVien`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NgoaiNgu` ADD CONSTRAINT `NgoaiNgu_ID_fkey` FOREIGN KEY (`ID`) REFERENCES `HuongDanVien`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhuTrach` ADD CONSTRAINT `PhuTrach_IDTour_fkey` FOREIGN KEY (`IDTour`) REFERENCES `Tour`(`IDTour`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhuTrach` ADD CONSTRAINT `PhuTrach_IDHuongDanVien_fkey` FOREIGN KEY (`IDHuongDanVien`) REFERENCES `HuongDanVien`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhuTrach` ADD CONSTRAINT `PhuTrach_IDTrip_fkey` FOREIGN KEY (`IDTrip`) REFERENCES `Trip`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThanhToan` ADD CONSTRAINT `ThanhToan_MaSo_fkey` FOREIGN KEY (`MaSo`) REFERENCES `DonDat`(`MaSo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Den` ADD CONSTRAINT `Den_IDTour_fkey` FOREIGN KEY (`IDTour`) REFERENCES `Tour`(`IDTour`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Den` ADD CONSTRAINT `Den_IDDiaDiem_fkey` FOREIGN KEY (`IDDiaDiem`) REFERENCES `DiaDiem`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhaHang` ADD CONSTRAINT `NhaHang_ID_fkey` FOREIGN KEY (`ID`) REFERENCES `DiaDiem`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KhachSan` ADD CONSTRAINT `KhachSan_ID_fkey` FOREIGN KEY (`ID`) REFERENCES `DiaDiem`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SDTLeTan` ADD CONSTRAINT `SDTLeTan_IDKhachSan_fkey` FOREIGN KEY (`IDKhachSan`) REFERENCES `KhachSan`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DanhGia` ADD CONSTRAINT `DanhGia_TenNguoiDanhGia_fkey` FOREIGN KEY (`TenNguoiDanhGia`) REFERENCES `TaiKhoan`(`TenNguoiDung`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DanhGia` ADD CONSTRAINT `DanhGia_IDTrip_IDTour_fkey` FOREIGN KEY (`IDTrip`, `IDTour`) REFERENCES `Trip`(`ID`, `IDTour`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DanhGia` ADD CONSTRAINT `DanhGia_tourIDTour_fkey` FOREIGN KEY (`tourIDTour`) REFERENCES `Tour`(`IDTour`) ON DELETE SET NULL ON UPDATE CASCADE;
