import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config';

function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [veLon, setVeLon] = useState(1);
  const [veTre, setVeTre] = useState(0);
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  const [tongGia, setTongGia] = useState(0);
  const [reviews, setReviews] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/tours/${id}`)
      .then(res => setTour(res.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(console.error);
  }, [id]);
  
  const handleBooking = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để đặt vé!');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/bookings`, {
        TenNguoiDung: user.TenNguoiDung,
        IDTour: id,
        IDTrip: selectedTrip.ID,
        SoLuongVe_LON: veLon,
        SoLuongVe_TRE: veTre,
        GhiChu: note
      });

      toast.success('Đặt vé thành công! Chuyển sang thanh toán...');
      setTimeout(() => navigate('/checkout'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi đặt vé');
    }
  };

  useEffect(() => {
    if (selectedTrip) {
      const giaNguoiLon = Number(selectedTrip.GiaVeNguoiLon) || 0;
      const giaTreEm = Number(selectedTrip.GiaVeTreEm) || 0;
      setTongGia(veLon * giaNguoiLon + veTre * giaTreEm);
    }
  }, [veLon, veTre, selectedTrip]);
  
  if (!tour) return <p className="p-4">Đang tải...</p>;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{tour.TenTour}</h1>
        <p className="text-gray-600 mt-1">{tour.MoTa}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Danh sách chuyến đi:</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tour.trips.map((trip) => (
            <div
              key={trip.ID}
              onClick={() => setSelectedTrip(trip)}
              className={`cursor-pointer border p-4 rounded-lg shadow-sm hover:shadow-md transition ${
                selectedTrip?.ID === trip.ID ? 'border-blue-500 bg-blue-50' : 'bg-white'
              }`}
            >
              <p className="font-medium text-gray-700">🚍 {trip.NgayKhoiHanh.slice(0, 10)} → {trip.NgayKetThuc.slice(0, 10)}</p>
              <p className="text-sm text-gray-600 mt-2">📍 Nơi đón: {trip.NoiDon}</p>
              <p className="mt-3">💵 Giá vé người lớn: <strong className="text-green-700">{Number(trip.GiaVeNguoiLon).toLocaleString()} đ</strong></p>
              <p>👶 Giá vé trẻ em: <strong className="text-blue-700">{Number(trip.GiaVeTreEm).toLocaleString()} đ</strong></p>
            </div>
          ))}
        </div>
      </div>

      {selectedTrip && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">📝 Đặt vé cho chuyến: {selectedTrip.ID}</h3>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vé người lớn:</label>
              <input
                type="number"
                value={veLon}
                min={1}
                onChange={(e) => setVeLon(+e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vé trẻ em:</label>
              <input
                type="number"
                value={veTre}
                min={0}
                onChange={(e) => setVeTre(+e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú:</label>
              <textarea
                placeholder="Ghi chú đặc biệt (nếu có)..."
                className="w-full border border-gray-300 p-2 rounded min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
          </div>

          <p className="mt-4 text-xl font-bold text-indigo-600">
            💰 Tổng giá: {tongGia.toLocaleString()} đ
          </p>

          <button
            onClick={handleBooking}
            className="mt-6 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow hover:shadow-lg transition"
          >
            Đặt vé ngay
          </button>
        </div>
      )}

      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">📝 Đánh giá từ người dùng</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">Chưa có đánh giá nào cho tour này.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r, idx) => (
              <li key={idx} className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-600">👤 {r.TenNguoiDanhGia} | 🚌 Chuyến: {r.IDTrip}</p>
                <p className="text-lg font-semibold text-yellow-600 mt-1">⭐️ {r.Diem}/10</p>
                <p className="mt-2 text-gray-800">{r.NhanXet}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TourDetail;