const jwt = require('../utils/jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Thiếu token' });

  try {
    const decoded = await jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Thiếu token' });

  try {
    const decoded = await jwt.verifyToken(token);
    
    // Kiểm tra role trong database
    const user = await prisma.taiKhoan.findUnique({ 
      where: { TenNguoiDung: decoded.TenNguoiDung },
      select: { Role: true, TrangThai: true }
    });

    if (!user || !user.TrangThai) {
      return res.status(403).json({ message: 'Tài khoản không hợp lệ' });
    }

    if (user.Role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền admin' });
    }

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

module.exports = { verifyAuth, verifyAdmin };
