-- 1.Huấn luyện viên không được phụ trách hai Trip bị trùng ngày
CREATE TRIGGER trg_KiemTraLichPhuTrach
BEFORE INSERT ON PhuTrach
FOR EACH ROW
BEGIN
    DECLARE count_trung INT;
    DECLARE trip_exists INT;

    -- Kiểm tra nếu Trip tồn tại
    SELECT COUNT(*) INTO trip_exists
    FROM Trip
    WHERE ID = NEW.IDTrip;

    IF trip_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Trip không tồn tại.';
    END IF;

    -- Kiểm tra ngày hợp lệ
    IF NEW.NgayBatDau > NEW.NgayKetThuc THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ngày bắt đầu không được lớn hơn ngày kết thúc.';
    END IF;

    -- Kiểm tra lịch trùng
    SELECT COUNT(*) INTO count_trung
    FROM PhuTrach P
    WHERE P.IDHuongDanVien = NEW.IDHuongDanVien
      AND (
            P.NgayBatDau <= NEW.NgayKetThuc AND
            P.NgayKetThuc >= NEW.NgayBatDau
          );

    IF count_trung > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Hướng dẫn viên đã có lịch trùng cho chuyến đi khác.';
    END IF;
END;


-- DROP TRIGGER IF EXISTS trg_KiemTraLichPhuTrach;

INSERT INTO PhuTrach (IDTour, IDHuongDanVien, IDTrip, NgayBatDau, NgayKetThuc)
VALUES ('T01', 'HDV01', 'TR02', '2025-04-04', '2025-04-06')
       



-- 2.Tính tổng giá đơn hàng ( có tính đến khuyến mãi)

CREATE TRIGGER trg_CalculateTotalPrice_BeforeInsert_DonDat
BEFORE INSERT ON  DonDat
FOR EACH ROW
BEGIN
    DECLARE totalPrice DECIMAL(12, 2);
    DECLARE discountAmount DECIMAL(12, 2) DEFAULT 0;
    DECLARE maxDiscount DECIMAL(12, 2);
    DECLARE discountPercent DECIMAL(5, 2);
    DECLARE discountFixed DECIMAL(12, 2);
    DECLARE giaNguoiLon DECIMAL(12, 2);
    DECLARE giaTreEm DECIMAL(12, 2);

    -- Kiểm tra giá trị bắt buộc
    IF NEW.SoLuongVe_LON IS NULL OR NEW.SoLuongVe_TRE IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SoLuongVe_LON hoặc SoLuongVe_TRE bị NULL';
    END IF;

    IF NEW.IDTrip IS NULL OR NEW.IDTour IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Không tìm thấy Trip';
    END IF;

    -- Lấy giá vé
    SELECT GiaVeNguoiLon, GiaVeTreEm
    INTO giaNguoiLon, giaTreEm
    FROM Trip
    WHERE ID = NEW.IDTrip AND IDTour = NEW.IDTour;

    IF giaNguoiLon IS NULL OR giaTreEm IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Không tìm thấy giá vé trong bảng Trip';
    END IF;

    -- Tính tổng giá gốc
    SET totalPrice = (NEW.SoLuongVe_LON * giaNguoiLon) + (NEW.SoLuongVe_TRE * giaTreEm);

    IF totalPrice IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tổng giá ban đầu bị NULL';
    END IF;

    IF totalPrice IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tổng giá sau giảm giá bị lỗi';
    END IF;

    SET NEW.TongGia = totalPrice;
END;
--
CREATE TRIGGER trg_CalculateTotalPrice_BeforeInsert_Apdung
BEFORE INSERT ON ApDung
FOR EACH ROW
BEGIN
    DECLARE totalPrice DECIMAL(12, 2);
    DECLARE discountAmount DECIMAL(12, 2) DEFAULT 0;
    DECLARE maxDiscount DECIMAL(12, 2);
    DECLARE discountPercent DECIMAL(5, 2);
    DECLARE discountFixed DECIMAL(12, 2);
    DECLARE mintotalPrice DECIMAL(12, 2);

        -- Lay tong gia hien tai
            SELECT TongGia 
            INTO totalPrice
            FROM DonDat 
            WHERE MaSo = NEW.MaSo;  
        -- Lay ma khuyen mai 
        SELECT GiamPhanTram, GiamSoTien, GiamToiDa, TongDonToiThieu
        INTO discountPercent, discountFixed, maxDiscount, mintotalPrice
        FROM KhuyenMai KM
        WHERE KM.MaKhuyenMai = NEW.MaKhuyenMai
        LIMIT 1;

        IF  totalPrice < mintotalPrice THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tổng giá hiện tại nhỏ hơn tổng đơn tối thiểu';
        END IF;

        IF discountPercent IS NULL AND discountFixed IS NULL AND maxDiscount IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Không tìm thấy thông tin khuyến mã';
        END IF;
        -- Tính số tiền giảm giá
        IF discountPercent IS NOT NULL THEN
            SET discountAmount = totalPrice * (discountPercent / 100);
        ELSE
        IF discountFixed IS NOT NULL THEN
            SET discountAmount = discountFixed;
        ELSE
            SET discountAmount = 0;
        END IF;

        -- Giới hạn tối đa
        IF maxDiscount IS NOT NULL AND discountAmount > maxDiscount THEN
            SET discountAmount = maxDiscount;
        END IF;
    END IF;

    -- Trừ giảm giá
    SET totalPrice = totalPrice - discountAmount;
    -- Gan lai vao TongGia cua don dat
    UPDATE DonDat 
    SET TongGia = totalPrice
    WHERE MaSo = NEW.MaSo;
    -- Giam so luong khuyen mai
    UPDATE KhuyenMai
    SET SoLuong = SoLuong - 1
    WHERE MaKhuyenMai = NEW.MaKhuyenMai;
END;

