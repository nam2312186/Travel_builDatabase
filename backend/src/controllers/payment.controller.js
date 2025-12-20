const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPayment = async(req, res) => {
    const { MaSo, PhuongThucThanhToan } = req.body;

    try {
        const donDat = await prisma.donDat.findUnique({ where: { MaSo } });
        if (!donDat) return res.status(404).json({ message: 'Không tìm thấy đơn đặt' });
        if (donDat.TrangThai) return res.status(400).json({ message: 'Đơn đã thanh toán' });

        const thanhToan = await prisma.thanhToan.create({
            data: {
                ID: `TT${Date.now()}`,
                MaSo,
                NgayThanhToan: new Date(),
                SoTien: donDat.TongGia,
                PhuongThucThanhToan
            }
        });

        
        const TenNguoiDung = donDat.TenNguoiDung;
        const tk = await prisma.taiKhoan.findUnique({ where: { TenNguoiDung } });

        const diemthuongmoi = tk.DiemTichLuy +  donDat.TongGia / 10000;

        await prisma.taiKhoan.update({
            where: { TenNguoiDung },
            data: {
                DiemTichLuy: diemthuongmoi
            }
        });

        await prisma.donDat.update({
            where: { MaSo },
            data: { TrangThai: true }
        });

        res.status(201).json({ message: 'Thanh toán thành công', thanhToan });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thanh toán', error: error.message });
    }
};

module.exports = { createPayment };