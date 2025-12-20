const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const applyPromotion = async(req, res) => {
    const { MaSo, MaKhuyenMai } = req.body;

    try {
        const check = await prisma.apDung.findUnique({ where: { MaSo, MaKhuyenMai } });
        if (check) return res.status(400).json({ message: 'Đã áp dụng khuyến mãi' });

        const donDat = await prisma.donDat.findUnique({ where: { MaSo } });
        if (!donDat) return res.status(404).json({ message: 'Không tìm thấy đơn đặt' });

        const km = await prisma.khuyenMai.findUnique({ where: { MaKhuyenMai } });
        if (!km) return res.status(404).json({ message: 'Mã khuyến mãi không tồn tại' });

        // Kiểm tra ngày hiệu lực
        const today = new Date();
        if (today < km.NgayBatDau || today > km.NgayKetThuc) {
            return res.status(400).json({ message: 'Mã khuyến mãi đã hết hạn hoặc chưa bắt đầu' });
        }

        // Kiểm tra tổng đơn
        if (km.TongDonToiThieu && donDat.TongGia < km.TongDonToiThieu) {
            return res.status(400).json({ message: 'Chưa đủ điều kiện giá trị đơn tối thiểu' });
        }

        const TenNguoiDung = donDat.TenNguoiDung;
        const tk = await prisma.taiKhoan.findUnique({ where: { TenNguoiDung } });
        if (tk.DiemTichLuy < km.DiemThuong) {
            return res.status(400).json({ message: 'Chưa đủ điều kiện tích lũy' });
        }

        if (km.SoLuong == 0) {
            return res.status(400).json({ message: 'Khuyến mãi đã hết số lượng' });
        }

        // Tính giảm giá
        let giam = 0;
        if (km.GiamPhanTram) giam = donDat.TongGia * Number(km.GiamPhanTram) / 100;
        if (km.GiamSoTien) giam += Number(km.GiamSoTien);
        if (km.GiamToiDa) giam = Math.min(giam, Number(km.GiamToiDa));

        const tongGiaMoi = Math.max(donDat.TongGia - giam, 0);

        const soLuongmoi = km.SoLuong - 1;
        const diemthuongmoi = tk.DiemTichLuy - km.DiemThuong;

        await prisma.taiKhoan.update({
            where: { TenNguoiDung },
            data: {
                DiemTichLuy: diemthuongmoi
            }
        });

        await prisma.khuyenMai.update({
            where: { MaKhuyenMai },
            data: { SoLuong: soLuongmoi }
        });


        // Tạo bản ghi ApDung
        await prisma.apDung.create({
            data: {
                MaSo,
                MaKhuyenMai
            }
        });

        // Cập nhật đơn đặt với giá mới
        await prisma.donDat.update({
            where: { MaSo },
            data: { TongGia: tongGiaMoi }
        });

        res.status(200).json({ message: 'Áp dụng khuyến mãi thành công', TongGiaSauKhiGiam: tongGiaMoi });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi áp dụng khuyến mãi', error: error.message });
    }
};

const getAllPromotions = async (req, res) => {
    try {
    const now = new Date();

    const promos = await prisma.khuyenMai.findMany({
        where: {
        NgayBatDau: { lte: now },
        NgayKetThuc: { gte: now }
        // Nếu bạn vẫn muốn kiểm tra số lượng, dùng: SoLuong: { gt: 0 }
        },
        orderBy: { NgayKetThuc: 'asc' }
    });

    res.json(promos);
    } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy khuyến mãi', error: err.message });
    }
};
    
// const getAllPromotions = async (req, res) => {
//     try {
//       const promos = await prisma.khuyenMai.findMany(); // không lọc gì
//       res.json(promos);
//     } catch (err) {
//       res.status(500).json({ message: 'Lỗi khi lấy khuyến mãi', error: err.message });
//     }
//   };
  module.exports = { getAllPromotions, applyPromotion };