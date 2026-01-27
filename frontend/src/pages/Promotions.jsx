import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/promotions`)
      .then(res => setPromotions(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredPromotions = promotions.filter(km => {
    const keyword = search.toLowerCase();
    return (
      km.TenUuDai.toLowerCase().includes(keyword) ||
      km.MaKhuyenMai.toLowerCase().includes(keyword) ||
      (km.DieuKien && km.DieuKien.toLowerCase().includes(keyword))
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎁 Khuyến mãi đang áp dụng</h1>

      <input
        type="text"
        placeholder="🔍 Tìm theo tên, mã, điều kiện..."
        className="w-full md:w-1/2 border p-2 mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredPromotions.length === 0 ? (
        <p>Không tìm thấy khuyến mãi phù hợp.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPromotions.map(km => (
            <div key={km.MaKhuyenMai} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-bold text-indigo-600">{km.TenUuDai}</h2>
              <p className="text-sm text-gray-600 mb-1">🎫 Mã: <strong>{km.MaKhuyenMai}</strong></p>
              {km.GiamPhanTram && <p>🔻 Giảm: {km.GiamPhanTram}%</p>}
              {km.GiamSoTien && <p>🔻 Giảm: {Number(km.GiamSoTien).toLocaleString()} đ</p>}
              {km.GiamToiDa && <p>🎯 Tối đa: {Number(km.GiamToiDa).toLocaleString()} đ</p>}
              {km.TongDonToiThieu && <p>💰 Đơn tối thiểu: {Number(km.TongDonToiThieu).toLocaleString()} đ</p>}
              <p className="text-sm mt-2 text-gray-500">
                📅 Hiệu lực: {km.NgayBatDau.slice(0, 10)} → {km.NgayKetThuc.slice(0, 10)}
              </p>
              {km.DieuKien && <p className="text-sm italic mt-1">* {km.DieuKien}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Promotions;
