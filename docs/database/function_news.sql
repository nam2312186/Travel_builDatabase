--  1.Tính Tổng Doanh Thu Của Tất Cả Các Đơn Đặt Vé Trong Một Khoảng Thời Gian
CREATE FUNCTION TinhDoanhThuTour(
    p_IDTour VARCHAR(50),
    NgayBatDau DATE,
    NgayKetThuc DATE
) RETURNS TEXT
DETERMINISTIC
BEGIN
    DECLARE TongDoanhThu DECIMAL(12, 2);
    DECLARE KetQua TEXT;

    -- Tính tổng doanh thu từ các đơn đặt vé liên quan đến tour trong khoảng thời gian
    SELECT SUM(DD.SoLuongVe_LON * T.GiaVeNguoiLon + DD.SoLuongVe_TRE * T.GiaVeTreEm)
    INTO TongDoanhThu
    FROM DonDat DD
    JOIN Trip T ON DD.IDTrip = T.ID AND DD.IDTour = T.IDTour
    WHERE DD.IDTour = p_IDTour
      AND DD.ThoiGianDat >= NgayBatDau
      AND DD.ThoiGianDat <= NgayKetThuc;

    -- Nếu không có doanh thu, trả về 0
    IF TongDoanhThu IS NULL THEN
        SET TongDoanhThu = 0;
    END IF;

    -- Kết hợp thông tin doanh thu và khoảng thời gian
    SET KetQua = CONCAT(
        'Doanh thu từ ', DATE_FORMAT(NgayBatDau, '%Y-%m-%d'),
        ' đến ', DATE_FORMAT(NgayKetThuc, '%Y-%m-%d'),
        ' là: ', FORMAT(TongDoanhThu, 2), ' VND'
    );
    RETURN KetQua;
END;

-- DROP FUNCTION IF EXISTS  TinhDoanhThuTour;

SELECT TinhDoanhThuTour('T01', '2025-01-01', '2025-12-31') AS DoanhThu;
SELECT TinhDoanhThuTour('T01', '2025-01-01', '2025-04-30') AS DoanhThu;


-- 2.Lấy danh sách khuyến mãi và số tiền giảm giá cho một đơn đặt vé
CREATE FUNCTION LayDanhSachKhuyenMaiVaGiamGia(
    p_MaSo VARCHAR(50)
) RETURNS TEXT
DETERMINISTIC
BEGIN
    DECLARE DanhSachKhuyenMai TEXT;

    -- Lấy danh sách khuyến mãi và số tiền giảm giá
    SELECT GROUP_CONCAT(
        CONCAT('Khuyến mãi: ', KM.MaKhuyenMai, ' - Giảm: ',
               CASE
                   WHEN KM.GiamPhanTram IS NOT NULL THEN CONCAT(KM.GiamPhanTram, '%')
                   WHEN KM.GiamSoTien IS NOT NULL THEN CONCAT(FORMAT(KM.GiamSoTien, 2), ' VND')
                   ELSE 'Không xác định'
               END
        ) SEPARATOR '; '
    )
    INTO DanhSachKhuyenMai
    FROM KhuyenMai KM
    JOIN ApDung AD ON KM.MaKhuyenMai = AD.MaKhuyenMai
    WHERE AD.MaSo = p_MaSo;

    -- Nếu không có khuyến mãi, trả về thông báo
    IF DanhSachKhuyenMai IS NULL THEN
        SET DanhSachKhuyenMai = CONCAT('Không có khuyến mãi phù hợp cho đơn ', p_MaSo);
    ELSE
        SET DanhSachKhuyenMai = CONCAT('Khuyến mãi cho đơn ', p_MaSo, ': ', DanhSachKhuyenMai);
    END IF;

    RETURN DanhSachKhuyenMai;
END;

-- DROP FUNCTION IF EXISTS LayDanhSachKhuyenMaiVaGiamGia;

-- Kiểm tra chức năng với các mã đơn đặt vé khác nhau
SELECT LayDanhSachKhuyenMaiVaGiamGia('DDT001') AS DanhSachKhuyenMai;
SELECT LayDanhSachKhuyenMaiVaGiamGia('DDT002') AS DanhSachKhuyenMai;
SELECT LayDanhSachKhuyenMaiVaGiamGia('DDT003') AS DanhSachKhuyenMai;