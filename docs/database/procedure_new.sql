-- 1. Thủ tục tính tổng số lượng vé hiện tại của trip và số chỗ còn lại
CREATE PROCEDURE TinhSoLuongVeVaChoConLai(IN p_IDTrip VARCHAR(50), IN p_IDTour VARCHAR(50))
BEGIN
    DECLARE sl_lon INT DEFAULT 0;
    DECLARE sl_tre INT DEFAULT 0;
    DECLARE tongSoLuong INT DEFAULT 0;
    DECLARE pluongKhachDuKien INT DEFAULT 0;
    DECLARE soChoConLai INT DEFAULT 0;
    -- Tính tổng số lượng vé người lớn và trẻ em đã đặt
    SELECT SUM(SoLuongVe_LON) INTO sl_lon
    FROM DonDat 
    WHERE IDTrip = p_IDTrip AND IDTour = p_IDTour;
    SELECT SUM(SoLuongVe_TRE) INTO sl_tre
    FROM DonDat 
    WHERE IDTrip = p_IDTrip AND IDTour = p_IDTour;
    -- Nếu không có vé nào được đặt, đặt giá trị mặc định là 0
    IF sl_lon IS NULL THEN SET sl_lon = 0; END IF;
    IF sl_tre IS NULL THEN SET sl_tre = 0; END IF;
    -- Tính tổng số lượng vé đã đặt
    SET tongSoLuong = sl_lon + sl_tre;
    -- Lấy tổng số lượng khách dự kiến từ bảng Trip
    SELECT LuongKhachDuKien INTO pluongKhachDuKien
    FROM Tour 
    WHERE IDTour = p_IDTour;
    -- Nếu không tìm thấy hoặc giá trị NULL, đặt mặc định là 0
    IF pluongKhachDuKien IS NULL THEN
        SET pluongKhachDuKien = 0;
    END IF;
    -- Tính số chỗ còn lại
    SET soChoConLai = pluongKhachDuKien - tongSoLuong;
    -- Đảm bảo số chỗ còn lại không âm
    IF soChoConLai < 0 THEN
        SET soChoConLai = 0;
    END IF;
    -- Trả về kết quả
    SELECT p_IDTrip AS MaTrip, 
           p_IDTour AS MaTour,
           sl_lon AS SoLuongVeLon, 
           sl_tre AS SoLuongVeTre, 
           tongSoLuong AS TongSoLuongVe, 
           pluongKhachDuKien AS TongSoLuongKhachDuKien, 
           soChoConLai AS SoChoConLai;
END;

-- DROP PROCEDURE IF EXISTS TinhSoLuongVeVaChoConLai;

CALL TinhSoLuongVeVaChoConLai('TR01', 'T01');
CALL TinhSoLuongVeVaChoConLai('TR02', 'T02');
CALL TinhSoLuongVeVaChoConLai('TR03', 'T03');




-- 2. Xuất Thông Tin Chi Tiết Của Tour Dùng Cursor
CREATE PROCEDURE XuatThongTinChiTietTour(IN p_IDTour VARCHAR(50))
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_IDTrip VARCHAR(50);
    DECLARE v_IDTour VARCHAR(50);
    DECLARE v_MaSo VARCHAR(50);
    DECLARE v_TenNguoiDung VARCHAR(50);
    DECLARE v_SoLuongVe_LON INT;
    DECLARE v_SoLuongVe_TRE INT;
    DECLARE v_GiaVeNguoiLon DECIMAL(12, 2);
    DECLARE v_GiaVeTreEm DECIMAL(12, 2);
    DECLARE v_DoanhThu DECIMAL(12, 2);

    -- Khai báo con trỏ để lấy thông tin chi tiết
    DECLARE tour_cursor CURSOR FOR
        SELECT DD.IDTrip, DD.IDTour, DD.MaSo, DD.TenNguoiDung, DD.SoLuongVe_LON, DD.SoLuongVe_TRE, 
               T.GiaVeNguoiLon, T.GiaVeTreEm,
               (
                   SELECT SUM(DD.TongGia)
                   FROM DonDat DD 
                   JOIN Trip T ON DD.IDTrip = T.ID AND DD.IDTour = T.IDTour
                   WHERE DD.IDTour = p_IDTour
               ) AS DoanhThu
        FROM DonDat DD 
        JOIN Trip T ON DD.IDTrip = T.ID AND DD.IDTour = T.IDTour
        WHERE DD.IDTour = p_IDTour;

    -- Khai báo trình xử lý khi con trỏ kết thúc
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Mở con trỏ
    OPEN tour_cursor;

    -- Tạo bảng tạm để lưu kết quả (tùy chọn)
    CREATE TEMPORARY TABLE IF NOT EXISTS TempTourDetails (
        IDTrip VARCHAR(50),
        IDTour VARCHAR(50),
        MaSo VARCHAR(50),
        TenNguoiDung VARCHAR(50),
        SoLuongVe_LON INT,
        SoLuongVe_TRE INT,
        GiaVeNguoiLon DECIMAL(12, 2),
        GiaVeTreEm DECIMAL(12, 2),
        DoanhThu DECIMAL(12, 2)
    );

    -- Vòng lặp qua các bản ghi từ con trỏ và chèn kết quả vào bảng tạm
    read_loop: LOOP
        FETCH tour_cursor INTO v_IDTrip, v_IDTour, v_MaSo, v_TenNguoiDung, v_SoLuongVe_LON, v_SoLuongVe_TRE, 
                            v_GiaVeNguoiLon, v_GiaVeTreEm, v_DoanhThu;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Chèn dữ liệu vào bảng tạm
        INSERT INTO TempTourDetails (IDTrip, IDTour, MaSo, TenNguoiDung, SoLuongVe_LON, SoLuongVe_TRE, 
                                     GiaVeNguoiLon, GiaVeTreEm, DoanhThu)
        VALUES (v_IDTrip, v_IDTour, v_MaSo, v_TenNguoiDung, v_SoLuongVe_LON, v_SoLuongVe_TRE, 
                v_GiaVeNguoiLon, v_GiaVeTreEm, v_DoanhThu);
    END LOOP;

    -- Đóng con trỏ
    CLOSE tour_cursor;

    -- Lấy tất cả kết quả từ bảng tạm
    SELECT * FROM TempTourDetails;

    -- Xóa bảng tạm (tùy chọn)
    DROP TEMPORARY TABLE IF EXISTS TempTourDetails;
END;

-- Xóa thủ tục nếu đã tồn tại
-- DROP PROCEDURE IF EXISTS XuatThongTinChiTietTour;

-- Gọi thủ tục để xuất thông tin chi tiết của tour
CALL XuatThongTinChiTietTour('T02');
CALL XuatThongTinChiTietTour('T01');
