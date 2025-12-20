const { PrismaClient } = require('@prisma/client');
const path = require('path');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  console.log('🌱 Bắt đầu seed dữ liệu...');

  // 1. Tạo tài khoản admin
  const adminPassword = await bcrypt.hash('14012005', 10);
  await prisma.taiKhoan.upsert({
    where: { TenNguoiDung: 'nampham1401' },
    update: {},
    create: {
      TenNguoiDung: 'nampham1401',
      CCCD: '000000000000',
      DiaChi: 'Admin Address',
      Email: 'admin@traveloka.com',
      GioiTinh: 'Nam',
      NgaySinh: new Date('2005-01-14'),
      MatKhau: adminPassword,
      TrangThai: true,
      DiemTichLuy: 0,
      Role: 'admin',
      SoDienThoai: {
        create: [
          { SoDienThoai: '0000000000' }
        ]
      }
    }
  });

  // 2. Tạo tài khoản mẫu
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  await prisma.taiKhoan.upsert({
    where: { TenNguoiDung: 'user1' },
    update: {},
    create: {
      TenNguoiDung: 'user1',
      CCCD: '001234567890',
      DiaChi: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      Email: 'user1@example.com',
      GioiTinh: 'Nam',
      NgaySinh: new Date('1995-01-15'),
      MatKhau: hashedPassword,
      TrangThai: true,
      DiemTichLuy: 0,
      Role: 'user',
      SoDienThoai: {
        create: [
          { SoDienThoai: '0901234567' }
        ]
      }
    }
  });

  // 3. Tạo tour Hà Giang
  await prisma.tour.upsert({
    where: { IDTour: 'TOUR_HAGIANG' },
    update: {},
    create: {
      IDTour: 'TOUR_HAGIANG',
      TenTour: 'Hà Giang Mùa Hoa Tam Giác Mạch',
      MoTa: 'Khám phá vẻ đẹp vùng cao nguyên đá Đồng Văn và mùa hoa tam giác mạch. Hành trình 3 ngày 2 đêm đầy ấn tượng với cung đường đèo Mã Pì Lèng hùng vĩ.',
      ChiPhiTour: 2990000,
      LuongKhachDuKien: 20,
      AnhTour: '/images/tours/hagiang.jpg'
    }
  });

  // 4. Tạo thêm tour mẫu khác
  await prisma.tour.upsert({
    where: { IDTour: 'TOUR_DALAT' },
    update: {},
    create: {
      IDTour: 'TOUR_DALAT',
      TenTour: 'Đà Lạt Thành Phố Ngàn Hoa',
      MoTa: 'Khám phá thành phố mộng mơ với khí hậu mát mẻ quanh năm. Tham quan thác Datanla, hồ Tuyền Lâm, Vườn Hoa Thành Phố.',
      ChiPhiTour: 1590000,
      LuongKhachDuKien: 30,
      AnhTour: '/images/tours/dalat.jpg'
    }
  });

  await prisma.tour.upsert({
    where: { IDTour: 'TOUR_HALONG' },
    update: {},
    create: {
      IDTour: 'TOUR_HALONG',
      TenTour: 'Vịnh Hạ Long - Di Sản Thế Giới',
      MoTa: 'Du thuyền qua vịnh Hạ Long với hàng nghìn hòn đảo đá vôi. Tham quan hang Sửng Sốt, làng chài Cửa Vạn.',
      ChiPhiTour: 3490000,
      LuongKhachDuKien: 25,
      AnhTour: '/images/tours/halong.jpg'
    }
  });

  // 5. Tạo trip cho tour Hà Giang
  await prisma.trip.upsert({
    where: { ID_IDTour: { ID: 'TRIP_HG_001', IDTour: 'TOUR_HAGIANG' } },
    update: {},
    create: {
      ID: 'TRIP_HG_001',
      IDTour: 'TOUR_HAGIANG',
      NgayKhoiHanh: new Date('2025-12-20'),
      NgayKetThuc: new Date('2025-12-23'),
      MoTa: 'Khởi hành mùa hoa tam giác mạch',
      ChiPhiThucTe: 2800000,
      NoiDon: 'Bến xe Mỹ Đình, Hà Nội',
      GiaVeNguoiLon: 2990000,
      GiaVeTreEm: 1990000
    }
  });

  await prisma.trip.upsert({
    where: { ID_IDTour: { ID: 'TRIP_HG_002', IDTour: 'TOUR_HAGIANG' } },
    update: {},
    create: {
      ID: 'TRIP_HG_002',
      IDTour: 'TOUR_HAGIANG',
      NgayKhoiHanh: new Date('2025-12-27'),
      NgayKetThuc: new Date('2025-12-30'),
      MoTa: 'Chuyến đi Tết Dương Lịch',
      ChiPhiThucTe: 2800000,
      NoiDon: 'Bến xe Mỹ Đình, Hà Nội',
      GiaVeNguoiLon: 3290000,
      GiaVeTreEm: 2290000
    }
  });

  // 6. Tạo mã khuyến mãi
  await prisma.khuyenMai.upsert({
    where: { MaKhuyenMai: 'NEWYEAR2025' },
    update: {},
    create: {
      MaKhuyenMai: 'NEWYEAR2025',
      TenUuDai: 'Giảm 10% đón năm mới',
      DieuKien: 'Áp dụng cho đơn từ 2 triệu',
      SoLuong: 100,
      NgayBatDau: new Date('2025-12-01'),
      NgayKetThuc: new Date('2025-12-31'),
      DiemThuong: 500,
      GiamPhanTram: 10,
      GiamToiDa: 500000,
      TongDonToiThieu: 2000000
    }
  });

  console.log('✅ Seed dữ liệu thành công!');
  console.log('📊 Đã tạo:');
  console.log('   - 1 tài khoản admin: nampham1401 (password: 14012005)');
  console.log('   - 1 tài khoản user: user1 (password: 123456)');
  console.log('   - 3 tours: Hà Giang, Đà Lạt, Hạ Long');
  console.log('   - 2 trips cho tour Hà Giang');
  console.log('   - 1 mã khuyến mãi: NEWYEAR2025');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
