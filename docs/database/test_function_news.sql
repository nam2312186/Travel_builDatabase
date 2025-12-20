-- 1. Test hàm TinhDoanhThuDonDat
SELECT TinhDoanhThuDonDat(2, 3, 500000, 300000) AS DoanhThu;


-- 2. Test hàm TinhTongSoVe
SELECT TinhTongSoVe(5, 7) AS TongSoVe;


-- 3. Test hàm TinhTongDoanhThu trong khoảng thời gian
SELECT TinhTongDoanhThu('2025-01-01', '2025-12-31') AS TongDoanhThu;

-- 4. Test hàm CapNhatGiaVe
SELECT CapNhatGiaVe('TRiP001', 600000, 400000) AS KetQua;
-- Kỳ vọng: 'Cập nhật giá vé thành công' nếu TOUR001 tồn tại, hoặc 'Không tìm thấy tour để cập nhật' nếu không tồn 

