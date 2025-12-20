const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async(req, res) => {
    const { TenNguoiDung, MatKhau, Email, DiaChi, GioiTinh, CCCD, NgaySinh } = req.body;
    try {
        const existing = await prisma.taiKhoan.findUnique({ where: { TenNguoiDung } });
        if (existing) return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });

        const hashedPassword = await bcrypt.hash(MatKhau, 10);
        await prisma.taiKhoan.create({
            data: {
                TenNguoiDung,
                MatKhau: hashedPassword,
                Email,
                DiaChi,
                GioiTinh,
                CCCD,
                NgaySinh: new Date(NgaySinh),
                TrangThai: true
            }
        });

        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};

const login = async(req, res) => {
    const { TenNguoiDung, MatKhau } = req.body;
    try {
        const user = await prisma.taiKhoan.findUnique({ 
            where: { TenNguoiDung },
            select: {
                TenNguoiDung: true,
                MatKhau: true,
                Email: true,
                TrangThai: true,
                Role: true
            }
        });
        if (!user || !user.TrangThai) return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });

        const match = await bcrypt.compare(MatKhau, user.MatKhau);
        if (!match) return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });

        const token = jwt.generateToken({ TenNguoiDung: user.TenNguoiDung, Role: user.Role });
        res.json({ 
            token, 
            user: { 
                TenNguoiDung: user.TenNguoiDung, 
                Email: user.Email,
                Role: user.Role
            } 
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};

module.exports = { register, login };