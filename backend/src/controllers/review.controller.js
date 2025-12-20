const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const createReview = async(req, res) => {
//     const { TenNguoiDanhGia, IDTour, IDTrip, Diem, NhanXet } = req.body;

//     try {
//         // Kiểm tra tồn tại đơn đặt hợp lệ và đã thanh toán
//         const donDat = await prisma.donDat.findFirst({
//             where: {
//                 TenNguoiDung: TenNguoiDanhGia,
//                 IDTour,
//                 IDTrip,
//                 TrangThai: true
//             }
//         });

//         if (!donDat) return res.status(400).json({ message: 'Bạn chưa đặt hoặc chưa thanh toán tour này' });

//         // Kiểm tra ngày kết thúc trip
//         const trip = await prisma.trip.findUnique({
//             where: {
//                 ID_IDTour: {
//                     ID: IDTrip,
//                     IDTour
//                 }
//             }
//         });

//         if (new Date() < new Date(trip.NgayKetThuc)) {
//             return res.status(400).json({ message: 'Chuyến đi chưa kết thúc, chưa thể đánh giá' });
//         }


//         // Kiểm tra đánh giá đã tồn tại chưa
//         const existingReview = await prisma.danhGia.findUnique({
//             where: {
//                 TenNguoiDanhGia_IDTrip_IDTour: {
//                     TenNguoiDanhGia,
//                     IDTrip,
//                     IDTour
//                 }
//             }
//         });

//         if (existingReview) {
//             // Cập nhật đánh giá
//             await prisma.danhGia.update({
//                 where: {
//                     TenNguoiDanhGia_IDTrip_IDTour: {
//                         TenNguoiDanhGia,
//                         IDTrip,
//                         IDTour
//                     }
//                 },
//                 data: {
//                     Diem,
//                     NhanXet
//                 }
//             });
//         } else {
//             // Tạo đánh giá mới
//             await prisma.danhGia.create({
//                 data: {
//                     TenNguoiDanhGia,
//                     IDTour,
//                     IDTrip,
//                     Diem,
//                     NhanXet
//                 }
//             });
//         }

//         res.status(201).json({ message: 'Đánh giá thành công' });
//     } catch (error) {
//         res.status(500).json({ message: 'Lỗi khi gửi đánh giá', error: error.message });
//     }
// };

const createReview = async (req, res) => {
    const { TenNguoiDanhGia, IDTour, IDTrip, Diem, NhanXet } = req.body;
    const prisma = new PrismaClient();

    try {
        // Kiểm tra đơn hàng đã thanh toán
        const donDat = await prisma.donDat.findFirst({
        where: {
            TenNguoiDung: TenNguoiDanhGia,
            IDTour,
            IDTrip,
            TrangThai: true
        }
        });

        if (!donDat) return res.status(400).json({ message: 'Bạn chưa đặt hoặc chưa thanh toán tour này' });

        // Kiểm tra đã kết thúc chuyến chưa
        const trip = await prisma.trip.findUnique({
        where: {
            ID_IDTour: { ID: IDTrip, IDTour }
        }
        });

        if (new Date() < new Date(trip.NgayKetThuc)) {
        return res.status(400).json({ message: 'Chuyến đi chưa kết thúc, chưa thể đánh giá' });
        }

        // Kiểm tra đã đánh giá chưa
        const existing = await prisma.danhGia.findUnique({
        where: {
            TenNguoiDanhGia_IDTrip_IDTour: {
            TenNguoiDanhGia,
            IDTrip,
            IDTour
            }
        }
        });

        if (existing) {
        return res.status(400).json({ message: 'Bạn đã đánh giá chuyến này rồi' });
        }

        // Tạo đánh giá
        await prisma.danhGia.create({
        data: { TenNguoiDanhGia, IDTour, IDTrip, Diem, NhanXet }
        });

        res.status(201).json({ message: 'Đánh giá thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đánh giá', error: error.message });
    }
};
  

const getReviewsByTour = async (req, res) => {
    const { IDTour } = req.params;
    const prisma = new PrismaClient();
  
    try {
      const reviews = await prisma.danhGia.findMany({
        where: { IDTour },
        orderBy: { Diem: 'desc' },
        select: {
          TenNguoiDanhGia: true,
          Diem: true,
          NhanXet: true,
          IDTrip: true
        }
      });
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Lỗi khi lấy đánh giá', error: err.message });
    }
  };
  

module.exports = { createReview, getReviewsByTour };