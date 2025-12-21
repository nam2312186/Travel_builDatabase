const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Xem tất cả đơn đặt
const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.donDat.findMany({
      include: {
        taiKhoan: {
          select: {
            TenNguoiDung: true,
            Email: true,
            SoDienThoai: true
          }
        },
        trip: {
          include: {
            tour: {
              select: {
                TenTour: true
              }
            }
          }
        }
      },
      orderBy: {
        ThoiGianDat: 'desc'
      }
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Xem đơn đặt của một khách hàng
const getUserBookings = async (req, res) => {
  try {
    const { username } = req.params;
    
    const bookings = await prisma.donDat.findMany({
      where: { TenNguoiDung: username },
      include: {
        trip: {
          include: {
            tour: true
          }
        }
      },
      orderBy: {
        ThoiGianDat: 'desc'
      }
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Lấy tất cả tours
const getAllTours = async (req, res) => {
  try {
    const tours = await prisma.tour.findMany({
      include: {
        trips: true
      }
    });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Tạo tour mới
const createTour = async (req, res) => {
  try {
    const { IDTour, TenTour, MoTa, ChiPhiTour, LuongKhachDuKien, AnhTour } = req.body;

    // Kiểm tra IDTour đã tồn tại chưa
    const existing = await prisma.tour.findUnique({ where: { IDTour } });
    if (existing) {
      return res.status(400).json({ message: 'ID Tour đã tồn tại' });
    }

    const newTour = await prisma.tour.create({
      data: {
        IDTour,
        TenTour,
        MoTa,
        ChiPhiTour: parseFloat(ChiPhiTour),
        LuongKhachDuKien: parseInt(LuongKhachDuKien),
        AnhTour: AnhTour || null
      }
    });

    res.status(201).json({ message: 'Tạo tour thành công', tour: newTour });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Cập nhật tour
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { TenTour, MoTa, ChiPhiTour, LuongKhachDuKien, AnhTour } = req.body;

    const updatedTour = await prisma.tour.update({
      where: { IDTour: id },
      data: {
        ...(TenTour && { TenTour }),
        ...(MoTa && { MoTa }),
        ...(ChiPhiTour && { ChiPhiTour: parseFloat(ChiPhiTour) }),
        ...(LuongKhachDuKien && { LuongKhachDuKien: parseInt(LuongKhachDuKien) }),
        ...(AnhTour !== undefined && { AnhTour })
      }
    });

    res.json({ message: 'Cập nhật tour thành công', tour: updatedTour });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Xóa tour
const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.tour.delete({
      where: { IDTour: id }
    });

    res.json({ message: 'Xóa tour thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Cập nhật giá trip
const updateTripPricing = async (req, res) => {
  try {
    const { id } = req.params;
    const { GiaVeNguoiLon, GiaVeTreEm } = req.body;

    const updatedTrip = await prisma.trip.update({
      where: { ID: id },
      data: {
        ...(GiaVeNguoiLon && { GiaVeNguoiLon: parseFloat(GiaVeNguoiLon) }),
        ...(GiaVeTreEm && { GiaVeTreEm: parseFloat(GiaVeTreEm) })
      }
    });

    res.json({ message: 'Cập nhật giá thành công', trip: updatedTrip });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Thống kê tổng quan
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.taiKhoan.count({ where: { Role: 'user' } });
    const totalTours = await prisma.tour.count();
    const totalBookings = await prisma.donDat.count();
    const totalRevenue = await prisma.donDat.aggregate({
      _sum: { TongGia: true },
      where: { TrangThai: true }
    });

    res.json({
      totalUsers,
      totalTours,
      totalBookings,
      totalRevenue: totalRevenue._sum.TongGia || 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Lấy danh sách tất cả người dùng
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.taiKhoan.findMany({
      select: {
        TenNguoiDung: true,
        Email: true,
        CCCD: true,
        DiaChi: true,
        GioiTinh: true,
        NgaySinh: true,
        DiemTichLuy: true,
        TrangThai: true,
        SoDienThoai: true,
        Role: true,
        _count: {
          select: {
            DonDat: true,
            DanhGia: true
          }
        }
      },
      orderBy: {
        TenNguoiDung: 'asc'
      }
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Xóa tài khoản người dùng
const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Không cho phép xóa admin
    const user = await prisma.taiKhoan.findUnique({
      where: { TenNguoiDung: username },
      select: { Role: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    if (user.Role === 'admin') {
      return res.status(403).json({ message: 'Không thể xóa tài khoản admin' });
    }

    // Xóa các bản ghi liên quan trước theo thứ tự
    // 1. Lấy danh sách đơn đặt của user
    const userBookings = await prisma.donDat.findMany({
      where: { TenNguoiDung: username },
      select: { MaSo: true }
    });

    // 2. Xóa thanh toán và áp dụng khuyến mãi của các đơn đặt
    for (const booking of userBookings) {
      await prisma.thanhToan.deleteMany({ where: { MaSo: booking.MaSo } });
      await prisma.apDung.deleteMany({ where: { MaSo: booking.MaSo } });
    }

    // 3. Xóa các bản ghi còn lại
    await prisma.soDienThoai.deleteMany({ where: { TenNguoiDung: username } });
    await prisma.danhGia.deleteMany({ where: { TenNguoiDanhGia: username } });
    await prisma.donDat.deleteMany({ where: { TenNguoiDung: username } });

    // 4. Xóa tài khoản
    await prisma.taiKhoan.delete({
      where: { TenNguoiDung: username }
    });

    res.json({ message: 'Xóa tài khoản thành công' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Reset mật khẩu người dùng về mặc định
const resetUserPassword = async (req, res) => {
  try {
    const { username } = req.params;
    const bcrypt = require('bcrypt');
    const newPassword = '123456'; // Mật khẩu mặc định
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.taiKhoan.update({
      where: { TenNguoiDung: username },
      data: { MatKhau: hashedPassword }
    });

    res.json({ message: `Đã reset mật khẩu về: ${newPassword}` });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

module.exports = {
  getAllBookings,
  getUserBookings,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  updateTripPricing,
  getDashboardStats,
  getAllUsers,
  deleteUser,
  resetUserPassword
};
