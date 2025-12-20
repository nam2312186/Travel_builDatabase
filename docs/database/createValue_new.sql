INSERT INTO
    TaiKhoan (
        CCCD,
        DiaChi,
        Email,
        GioiTinh,
        NgaySinh,
        DiemTichLuy,
        TenNguoiDung,
        MatKhau,
        TrangThai
    )
VALUES
    (
        '051234333455',
        'Tổ 5, phường Hoàn Kiếm, thành phố Hà Nội',
        'dohoangphuc1967@gmail.com',
        'Nam',
        '1967-03-25',
        120,
        'PhucHaNoi',
        'phucd3ptrai',
        1
    ),
    (
        '051234333456',
        '45 Lê Lợi, phường Bến Nghé, Quận 1, TP.HCM',
        'minhthuforwork@gmail.com',
        'Nữ',
        '1988-08-20',
        90,
        'MinhThu88',
        'thu123456',
        1
    ),
    (
        '051234333457',
        'Số 7, đường Trần Phú, TP. Huế',
        'nguyenngochieu1995@gmail.com',
        'Nam',
        '1995-11-11',
        200,
        'NgocHieu95',
        'hieumaytinh28',
        1
    ),
    (
        '051234333458',
        '28 Nguyễn Văn Cừ, Quận Ninh Kiều, Cần Thơ',
        'lethianhdao@gmail.com',
        'Nữ',
        '1992-02-29',
        160,
        'AnhDao92',
        'trumdaocoin',
        1
    ),
    (
        '051234333459',
        'Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng',
        'phantrungkien2000@gmail.com',
        'Khác',
        '2000-07-14',
        50,
        'kieny2k',
        'kienkhongngu',
        1
    );

INSERT INTO
    SoDienThoai (TenNguoiDung, SoDienThoai)
VALUES
    ('PhucHaNoi', '0925234564'),
    ('PhucHaNoi', '0909988776'),
    ('MinhThu88', '0933456789'),
    ('NgocHieu95', '0977654321'),
    ('NgocHieu95', '0321234567'),
    ('AnhDao92', '0912233445'),
    ('kieny2k', '0909090909'),
    ('kieny2k', '0852233445'),
    ('kieny2k', '0709988776');

INSERT INTO
    Tour (
        IDTour,
        TenTour,
        AnhTour,
        MoTa,
        ChiPhiTour,
        LuongKhachDuKien
    )
VALUES
    (
        'T01',
        'Khám phá Vịnh Hạ Long',
        'https://th.bing.com/th/id/OSK.HEROjGxjDV_BD2p-xvzPMJDus3SfzvEHeY7L9yZdnYrkXIM?cb=iwc1&rs=1&pid=ImgDetMain',
        'Tour 3 ngày 2 đêm, trải nghiệm du thuyền trên vịnh Hạ Long',
        2500000,
        20
    ),
    (
        'T02',
        'Đà Lạt mộng mơ',
        'https://th.bing.com/th/id/R.77a21595acbac038ab38064aef978703?rik=ExGzz%2bskss4btw&riu=http%3a%2f%2fhtqtravel.com.vn%2fapp%2fwebroot%2fupload%2fadmin%2ffiles%2f2(3).jpg&ehk=LXNceuEW6j4ZVICLXLWzY7zfrPRwb0JvaqGYwrbCpnU%3d&risl=&pid=ImgRaw&r=0',
        'Tour nghỉ dưỡng tại Đà Lạt với không khí trong lành và hoa nở quanh năm',
        1800000,
        25
    ),
    (
        'T03',
        'Phú Quốc thiên đường biển',
        'https://th.bing.com/th/id/OIP.GoRfvVQ1-I-nWhXLUbk93AHaE8?cb=iwc1&rs=1&pid=ImgDetMain',
        'Khám phá đảo ngọc Phú Quốc với biển xanh, cát trắng và ẩm thực hấp dẫn',
        3200000,
        30
    ),
    (
        'T04',
        'Hà Giang mùa hoa tam giác mạch',
        'https://th.bing.com/th/id/OSK.HEROkCPR7KY7gfSriU6VcvOFPli6Twmjve4aWpcMSvZQLYc?cb=iwc1&rs=1&pid=ImgDetMain',
        'Chinh phục những cung đường đá và văn hóa vùng cao nguyên Hà Giang',
        2200000,
        15
    ),
    (
        'T05',
        'City Tour Sài Gòn 1 ngày',
        'https://th.bing.com/th/id/OSK.HEROiqYqpLl5LQRaejfUvYeepDt22x_mKS_og_LObThIi68?cb=iwc1&rs=1&pid=ImgDetMain',
        'Tham quan các địa danh nổi tiếng tại TP.HCM như Dinh Độc Lập, Bưu điện Trung tâm',
        800000,
        40
    );

INSERT INTO
    Trip (
        IDTour,
        ID,
        NgayKhoiHanh,
        NgayKetThuc,
        MoTa,
        ChiPhiThucTe,
        NoiDon,
        GiaVeNguoiLon ,
        GiaVeTreEm
    )
VALUES
    (
        'T01',
        'TR01',
        '2025-05-01',
        '2025-05-03',
        'Tour Hạ Long 3 ngày 2 đêm, nghỉ dưỡng 5 sao.',
        35000000,
        'Hà Nội',
        2150000,
        1500000
    ),
    (
        'T02',
        'TR02',
        '2025-06-15',
        '2025-06-17',
        'Khám phá thành phố Đà Lạt mộng mơ.',
        40000000,
        'TP. Hồ Chí Minh',
        1800000,
        1200000
    ),
    (
        'T03',
        'TR03',
        '2025-07-10',
        '2025-07-13',
        'Du lịch biển Phú Quốc, tắm biển và thưởng thức hải sản.',
        800000000,
        'TP. Hồ Chí Minh',
        3200000,
        2000000
    ),
    (
        'T04',
        'TR04',
        '2025-08-05',
        '2025-08-09',
        'Trekking cao nguyên đá Đồng Văn, Hà Giang.',
        1900000,
        'Hà Nội',
        26400000,
        1600000
    ),
    (
        'T05',
        'TR05',
        '2025-09-01',
        '2025-09-01',
        'City tour tham quan Sài Gòn trong ngày bằng xe buýt 2 tầng.',
        750000,
        'TP. Hồ Chí Minh',
        15000000,
        500000
    );

INSERT INTO
    KhuyenMai (
        MaKhuyenMai,
        TenUuDai,
        DieuKien,
        SoLuong,
        NgayBatDau,
        NgayKetThuc,
        DiemThuong,
        GiamPhanTram,
        GiamSoTien,
        GiamToiDa,
        TongDonToiThieu
    )
VALUES
    (
        'TRAVELOKALANNGOC1',
        'Giảm ngay 50K',
        'Áp dụng cho lần đặt đầu tiên trên Traveloka.',
        500,
        '2025-04-01',
        '2025-06-30',
        0,
        NULL,
        50000,
        NULL,
        200000
    ),
    (
        'TRAVELOKALANNGOC2',
        '8% giảm giá khách sạn',
        'Áp dụng cho đơn đặt khách sạn.',
        500,
        '2025-04-01',
        '2025-06-30',
        0,
        8.00,
        NULL,
        200000,
        0
    ),
    (
        'TRAVELOKALANNGOC3',
        '8% giảm hoạt động du lịch',
        'Áp dụng cho đơn đặt du lịch.',
        500,
        '2025-04-01',
        '2025-06-30',
        0,
        8.00,
        NULL,
        NULL,
        0
    ),
    (
        'TRAVELOKALANNGOC4',
        '12% giảm đưa đón sân bay',
        'Áp dụng cho đơn đưa đón.',
        300,
        '2025-04-01',
        '2025-06-30',
        0,
        12.00,
        NULL,
        NULL,
        500000
    ),
    (
        'TRAVELOKALANNGOC5',
        '10% giảm thuê xe',
        'Áp dụng cho đơn thuê xe.',
        300,
        '2025-04-01',
        '2025-06-30',
        0,
        10.00,
        NULL,
        NULL,
        0
    ),
    (
        'FLDNIM25',
        'Giảm 50K cho vé máy bay',
        'Dành cho khách hàng mới, đơn từ 5 triệu VND.',
        200,
        '2025-04-01',
        '2025-06-30',
        0,
        NULL,
        50000,
        NULL,
        0
    ),
    (
        'HTDNIM25',
        'Giảm 10% tối đa 200K khách sạn',
        'Dành cho khách hàng mới, đơn từ 1.500.000 VND.',
        200,
        '2025-04-01',
        '2025-06-30',
        0,
        NULL,
        200000,
        NULL,
        0
    );

INSERT INTO
    HuongDanVien (ID, Ho, TenDem, Ten)
VALUES
    ('HDV01', 'Nguyễn', 'Văn', 'An'),
    ('HDV02', 'Trần', 'Thị', 'Bích'),
    ('HDV03', 'Lê', 'Ngọc', 'Hiếu'),
    ('HDV04', 'Phạm', 'Minh', 'Tuấn'),
    ('HDV05', 'Đặng', 'Quỳnh', 'Hoa');

-- HDV01 là quản lý cấp cao, không có quản lý (NULL)
UPDATE HuongDanVien
SET
    IDQuanLy = NULL
WHERE
    ID = 'HDV01';

-- HDV02 và HDV03 có quản lý là HDV01
UPDATE HuongDanVien
SET
    IDQuanLy = 'HDV01'
WHERE
    ID IN ('HDV02', 'HDV03');

-- HDV04 và HDV05 có quản lý là HDV02
UPDATE HuongDanVien
SET
    IDQuanLy = 'HDV02'
WHERE
    ID IN ('HDV04', 'HDV05');

INSERT INTO
    PhuTrach (
        IDTour,
        IDHuongDanVien,
        IDTrip,
        NgayBatDau,
        NgayKetThuc
    )
VALUES
    (
        'T01',
        'HDV01',
        'TR01',
        '2025-04-01',
        '2025-04-03'
    ),
    (
        'T02',
        'HDV02',
        'TR02',
        '2025-04-05',
        '2025-04-07'
    ),
    (
        'T03',
        'HDV03',
        'TR03',
        '2025-04-10',
        '2025-04-12'
    ),
    (
        'T04',
        'HDV04',
        'TR04',
        '2025-04-15',
        '2025-04-18'
    ),
    (
        'T05',
        'HDV05',
        'TR05',
        '2025-04-20',
        '2025-04-20'
    );

INSERT INTO
    NgoaiNgu (ID, NgoaiNgu)
VALUES
    ('HDV01', 'Tiếng Anh'),
    ('HDV01', 'Tiếng Pháp'),
    ('HDV02', 'Tiếng Trung'),
    ('HDV03', 'Tiếng Nhật'),
    ('HDV04', 'Tiếng Hàn'),
    ('HDV05', 'Tiếng Anh'),
    ('HDV05', 'Tiếng Tây Ban Nha'),
    ('HDV01', 'Tiếng Đức'),
    ('HDV02', 'Tiếng Ý'),
    ('HDV03', 'Tiếng Nga'),
    ('HDV04', 'Tiếng Bồ Đào Nha'),
    ('HDV05', 'Tiếng Ả Rập');

INSERT INTO
    DiaDiem (ID, AnhMoTa, GhiChuMoTa, Xa, Huyen, Tinh)
VALUES
    (
        'DD01',
        'halong.jpg',
        'Cảng tàu du lịch Hạ Long',
        'Phường Bãi Cháy',
        'TP Hạ Long',
        'Quảng Ninh'
    ),
    (
        'DD02',
        'dalat.jpg',
        'Vườn hoa thành phố Đà Lạt',
        'Phường 8',
        'TP Đà Lạt',
        'Lâm Đồng'
    ),
    (
        'DD03',
        'phuquoc.jpg',
        'Bãi Sao – bãi biển đẹp nhất Phú Quốc',
        'An Thới',
        'Phú Quốc',
        'Kiên Giang'
    ),
    (
        'DD04',
        'hagiang.jpg',
        'Khám phá Hà Giang mùa hoa tam giác mạch',
        'Pải Lủng',
        'Mèo Vạc',
        'Hà Giang'
    ),
    (
        'DD05',
        'saigon.jpg',
        'Dinh Độc Lập',
        'Phường Bến Thành',
        'Quận 1',
        'TP.HCM'
    );

INSERT INTO
    NhaHang (
        ID,
        TenNhaHang,
        PhongCachTrangTri,
        PhongCachAmThuc
    )
VALUES
    (
        'DD01',
        'Hạ Long Pearl',
        'Sang trọng ven biển',
        'Hải sản tươi sống'
    ),
    (
        'DD02',
        'Nhà hàng Hoa Mai',
        'Vintage Đà Lạt',
        'Lẩu gà lá é'
    ),
    (
        'DD03',
        'Phú Quốc Quán',
        'Tre nứa',
        'Hải sản nướng'
    ),
    (
        'DD04',
        'Nhà hàng Tam Mạch',
        'Bản làng',
        'Đặc sản vùng cao'
    ),
    (
        'DD05',
        'Sài Gòn Xưa',
        'Retro Sài Gòn',
        'Cơm tấm – Bánh xèo'
    );

INSERT INTO
    KhachSan (ID, TenKhachSan, LoaiPhong)
VALUES
    ('DD01', 'Halong Bay Resort', 'Phòng đôi'),
    ('DD02', 'Dalat Flower Hotel', 'Phòng đơn'),
    ('DD03', 'Sunset Beach Phu Quoc', 'Phòng đôi'),
    ('DD04', 'Highland View Hotel', 'Phòng bốn'),
    ('DD05', 'Central Saigon Hotel', 'Phòng đơn');

INSERT INTO
    SDTLeTan (IDKhachSan, SoDienThoai)
VALUES
    ('DD01', '0203123456'),
    ('DD01', '0203223344'),
    ('DD02', '0263654321'),
    ('DD02', '0263111222'),
    ('DD03', '0297112233'),
    ('DD03', '0297445566'),
    ('DD04', '0219778899'),
    ('DD04', '0219333999'),
    ('DD05', '02833445566'),
    ('DD05', '02877889900');

INSERT INTO
    DanhGia (Diem, NhanXet, TenNguoiDanhGia, IDTrip, IDTour)
VALUES
    (
        5,
        'Rất tuyệt vời, phục vụ chu đáo!',
        'PhucHaNoi',
        'TR01',
        'T01'
    ),
    (4, NULL, 'MinhThu88', 'TR02', 'T02'),
    (
        2,
        'Không hài lòng với dịch vụ.',
        'NgocHieu95',
        'TR03',
        'T03'
    ),
    (
        5,
        'Phong cảnh đẹp, nhân viên thân thiện.',
        'AnhDao92',
        'TR04',
        'T04'
    ),
    (2, NULL, 'kieny2k', 'TR05', 'T05');

INSERT INTO
    Den (
        IDTour,
        IDDiaDiem,
        TrinhTu,
        PhuongTien,
        ThoiGianMoiDiaDiem
    )
VALUES
    -- T01: Khám phá Vịnh Hạ Long
    ('T01', 'DD01', 1, 'Xe khách', '60:00:00'), -- Tham quan Vịnh Hạ Long trong 3 ngày 2 đêm
    -- T02: Đà Lạt mộng mơ
    ('T02', 'DD02', 1, 'Xe hơi', '36:00:00'), -- Tham quan Vườn hoa Đà Lạt trong 2 ngày 1 đêm
    -- T03: Phú Quốc thiên đường biển
    ('T03', 'DD03', 1, 'Máy bay', '36:00:00'), -- Tham quan Bãi Sao và các địa điểm khác trong 2 ngay 1 đêm
    -- T04: Hà Giang mùa hoa tam giác mạch
    ('T04', 'DD04', 1, 'Xe máy', '05:00:00'), -- Tham quan Đồng Văn trong 5 giờ
    -- T05: City Tour Sài Gòn 1 ngày
    ('T05', 'DD05', 1, 'Xe khách', '03:00:00');

INSERT INTO
    DonDat (
        MaSo,
        TenNguoiDung,
        IDTrip,
        IDTour,
        SoLuongVe_LON,
        SoLuongVe_TRE,
        TrangThai,
        GhiChu,
        ThoiGianDat
    )
VALUES
    (
        'DDT001',
        'PhucHaNoi',
        'TR01',
        'T01',
        2,
        0,
        1,
        'Yêu cầu phòng đôi',
        '2025-04-01 10:00:00'
    ),
    (
        'DDT002',
        'MinhThu88',
        'TR02',
        'T02',
        1,
        1,
        0,
        '',
        '2025-04-02 14:30:00'
    ),
    (
        'DDT003',
        'NgocHieu95',
        'TR03',
        'T03',
        3,
        2,
        1,
        'Thêm bữa ăn chay',
        '2025-04-03 09:15:00'
    ),
    (
        'DDT004',
        'AnhDao92',
        'TR04',
        'T04',
        2,
        2,
        0,
        'Lý do cá nhân',
        '2025-04-04 16:45:00'
    ),
    (
        'DDT005',
        'kieny2k',
        'TR05',
        'T05',
        4,
        3,
        1,
        'Đi theo nhóm bạn',
        '2025-04-05 11:00:00'
    );

INSERT INTO
    ApDung (MaSo, MaKhuyenMai)
VALUES
    ('DDT001', 'TRAVELOKALANNGOC1'),
    ('DDT003', 'FLDNIM25'),
    ('DDT005', 'TRAVELOKALANNGOC5');

INSERT INTO
    ThanhToan (
        ID,
        MaSo,
        NgayThanhToan,
        SoTien,
        PhuongThucThanhToan
    )
VALUES
    (
        'MB',
        'DDT001',
        '2025-04-01',
        5800000,
        'Chuyển khoản'
    ),
    (
        'OCB',
        'DDT003',
        '2025-04-03',
        8400000,
        'Thẻ tín dụng'
    ),
    (
        'AGRI',
        'DDT005',
        '2025-04-06',
        2600000,
        'Tiền mặt'
    );

INSERT INTO KhuyenMai (MaKhuyenMai, TenUuDai, SoLuong, NgayBatDau, NgayKetThuc, GiamPhanTram, TongDonToiThieu)
VALUES 
('KM2024', 'Giảm 20% đơn từ 1 triệu', 20, '2024-01-01', '2025-12-31', 20, 1000000),
('HOT50', 'Giảm 50% tối đa 500K', 10, '2024-06-01', '2025-06-30', 50, 0);
