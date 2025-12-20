const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/tours
const getAllTours = async(req, res) => {
    try {
        const tours = await prisma.tour.findMany({
            select: {
                IDTour: true,
                TenTour: true,
                AnhTour: true,
                MoTa: true,
                ChiPhiTour: true,
                LuongKhachDuKien: true
            }
        });
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách tour', error });
    }
};

// GET /api/tours/:id
const getTourDetail = async(req, res) => {
    const { id } = req.params;
    try {
        const tour = await prisma.tour.findUnique({
            where: { IDTour: id },
            include: {
                trips: {
                    select: {
                        ID: true,
                        NgayKhoiHanh: true,
                        NgayKetThuc: true,
                        NoiDon: true,
                        GiaVeNguoiLon: true,
                        GiaVeTreEm: true
                    }
                },
                diemDen: {
                    select: {
                        IDDiaDiem: true,
                        TrinhTu: true,
                        PhuongTien: true,
                        ThoiGianMoiDiaDiem: true,
                        diaDiem: {
                            select: {
                                Xa: true,
                                Huyen: true,
                                Tinh: true,
                                GhiChuMoTa: true
                            }
                        }
                    }
                }
            }
        });

        if (!tour) return res.status(404).json({ message: 'Không tìm thấy tour' });
        res.json(tour);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy chi tiết tour', error });
    }
};


module.exports = { getAllTours, getTourDetail };