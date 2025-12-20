import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import backgroundLogin from '../assets/backgroundLogin.png';

function History() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  // Kiểm tra đăng nhập
  if (!user) {
    return (
      <div className="fixed inset-0 flex flex-row overflow-hidden">
        {/* Left Side - Login Required Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto">
          <div className="w-full max-w-md px-8 py-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Yêu cầu đăng nhập</h2>
              <p className="text-gray-600 mb-6">
                Bạn cần đăng nhập để xem lịch sử đặt tour của mình
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Đăng nhập ngay
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border-2 border-gray-200"
                >
                  Đăng ký tài khoản mới
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Background Image */}
        <div 
          className="hidden lg:block lg:w-1/2 relative"
          style={{
            backgroundImage: `url(${backgroundLogin})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50"></div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bookings/user?TenNguoiDung=${user.TenNguoiDung}`)
      .then(res => setOrders(res.data))
      .catch(err => setMessage('Lỗi khi lấy dữ liệu lịch sử'));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lịch sử đặt tour</h2>
      {orders.length === 0 ? (
        <p>Không có đơn đặt nào.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.MaSo} className="border p-4 bg-white shadow rounded">
              <p><strong>🧾 Mã đơn:</strong> {order.MaSo}</p>
              <p>🛫 Tour: {order.IDTour}</p>
              <p>🚍 Chuyến: {order.IDTrip}</p>
              <p>👤 Người lớn: {order.SoLuongVe_LON} | 👶 Trẻ em: {order.SoLuongVe_TRE}</p>
              <p>🕒 Đặt lúc: {new Date(order.ThoiGianDat).toLocaleString()}</p>
              <p>💰 Tổng giá: {Number(order.TongGia).toLocaleString()} đ</p>
              <p className={`font-semibold mt-2 ${order.TrangThai ? 'text-green-600' : 'text-yellow-500'}`}>
                {order.TrangThai ? '✅ Đã thanh toán' : '🕒 Chờ thanh toán'}
              </p>
              {order.GhiChu && <p className="mt-1 text-sm italic">Ghi chú: {order.GhiChu}</p>}
            </li>
          ))}
        </ul>
      )}
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}

export default History;
