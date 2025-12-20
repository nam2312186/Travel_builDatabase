-- Insert Mot Tai Khoan
CREATE PROCEDURE Tao_TaiKhoan(
    IN p_CCCD VARCHAR(12),
    IN p_DiaChi VARCHAR(100),
    IN p_Email VARCHAR(100),
    IN p_GioiTinh VARCHAR(10),
    IN p_NgaySinh DATE,
    IN p_DiemTichLuy INT,
    IN p_TenNguoiDung VARCHAR(50),
    IN p_MatKhau VARCHAR(255),
    IN p_TrangThai BOOLEAN,
    IN p_SoDienThoai VARCHAR(20)
)
BEGIN
    INSERT INTO TaiKhoan (CCCD, DiaChi, Email, GioiTinh, NgaySinh, DiemTichLuy, TenNguoiDung, MatKhau,TrangThai)
    VALUES (p_CCCD, p_DiaChi, p_Email, p_GioiTinh, p_NgaySinh, p_DiemTichLuy, p_TenNguoiDung, p_MatKhau,p_TrangThai);
    INSERT INTO SoDienThoai (TenNguoiDung, SoDienThoai)
    VALUES (p_TenNguoiDung, p_SoDienThoai);
END;
-- DROP PROCEDURE Tao_TaiKhoan;
CALL Tao_TaiKhoan('083205007647','233 Hưng Nhượng Giồng Trôm Bến Tre','trinhnguyenphat257@gmail.com','Nam','2005-08-20',1000,'Em Anh Jack','Phat',1,'0326222435');
-- Update Mot Tai Khoan 
CREATE PROCEDURE Capnhat_TaiKhoan(
    IN p_CCCD VARCHAR(12),
    IN p_DiaChi VARCHAR(100),
    IN p_Email VARCHAR(100),
    IN p_GioiTinh VARCHAR(10),
    IN p_NgaySinh DATE,
    IN p_DiemTichLuy INT,
    IN p_TenNguoiDung VARCHAR(50),
    IN p_MatKhau VARCHAR(255)
)
BEGIN
    UPDATE TaiKhoan
    SET
        CCCD = p_CCCD,
        DiaChi = p_DiaChi,
        Email = p_Email,
        GioiTinh = p_GioiTinh,
        NgaySinh = p_NgaySinh,
        DiemTichLuy = p_DiemTichLuy,
        MatKhau = p_MatKhau
    WHERE p_TenNguoiDung = TenNguoiDung;
END;
DROP PROCEDURE Capnhat_TaiKhoan;
CALL Capnhat_TaiKhoan('083205007647','233* Hưng Nhượng Giồng Trôm Bến Tre','trinhnguyenphat257@gmail.com','Nam','2005-08-20',300,'Em Anh Jack','DomDom');
-- Delete mot tai khoan
CREATE PROCEDURE Xoa_TaiKhoan(IN p_TenNguoiDung VARCHAR(50))
    BEGIN
        DELETE FROM TaiKhoan
        WHERE TenNguoiDung = p_TenNguoiDung;
    END;
-- DROP PROCEDURE Xoa_TaiKhoan;
CALL Xoa_TaiKhoan('Em Anh Jack');