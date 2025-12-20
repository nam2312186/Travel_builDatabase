const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProfile = async (req, res) => {
  const { TenNguoiDung } = req.user; // có từ JWT middleware

  try {
    const user = await prisma.taiKhoan.findUnique({
      where: { TenNguoiDung },
      select: {
        TenNguoiDung: true,
        Email: true,
        GioiTinh: true,
        DiaChi: true,
        NgaySinh: true,
        CCCD: true,
        DiemTichLuy: true
      }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error: error.message });
  }
};

module.exports = { getProfile };
