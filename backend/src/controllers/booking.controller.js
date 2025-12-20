const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBooking = async(req, res) => {
    const {
        TenNguoiDung,
        IDTour,
        IDTrip,
        SoLuongVe_LON,
        SoLuongVe_TRE,
        GhiChu
    } = req.body;

    try {
        const trip = await prisma.trip.findUnique({
            where: {
                ID_IDTour: {
                    ID: IDTrip,
                    IDTour: IDTour
                }
            }
        });

        if (!trip) {
            return res.status(404).json({ message: 'Không tìm thấy chuyến đi' });
        }

        const tongGia =
            SoLuongVe_LON * Number(trip.GiaVeNguoiLon) +
            SoLuongVe_TRE * Number(trip.GiaVeTreEm);

        const donDat = await prisma.donDat.create({
            data: {
                MaSo: `DD${Date.now()}`, // mã đơn sinh ngẫu nhiên
                TenNguoiDung,
                IDTour,
                IDTrip,
                SoLuongVe_LON,
                SoLuongVe_TRE,
                GhiChu,
                TrangThai: false, // chưa thanh toán
                ThoiGianDat: new Date(),
                TongGia: tongGia
            }
        });

        res.status(201).json({ message: 'Đặt tour thành công', donDat });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đặt tour', error: error.message });
    }
};

const getUserBookings = async (req, res) => {
    const { TenNguoiDung } = req.query;
    try {
    //   const donDat = await prisma.donDat.findMany({
    //     where: { TenNguoiDung },
    //     orderBy: { ThoiGianDat: 'desc' }
    //   });
    const donDat = await prisma.donDat.findMany({
        where: { TenNguoiDung },
        include: {
          trip: {
            select: {
              GiaVeNguoiLon: true,
              GiaVeTreEm: true
            }
          }
        }
      });
      
      res.json(donDat);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy đơn đặt', error: error.message });
    }
  };
  
  module.exports = {
    createBooking,
    getUserBookings,  
  };