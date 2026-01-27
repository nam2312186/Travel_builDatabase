import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundLogin from '../assets/backgroundLogin.png';
import { API_BASE_URL } from '../config';

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const token = localStorage.getItem('token');
  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải hồ sơ');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
    else {
      setError('Bạn chưa đăng nhập');
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (activeTab === 'payment' && localUser) {
      axios.get(`${API_BASE_URL}/api/bookings/user?TenNguoiDung=${localUser.TenNguoiDung}`)
        .then(res => {
          const unpaid = res.data.filter(order => !order.TrangThai);
          setUnpaidOrders(unpaid);
        })
        .catch(err => console.error('Lỗi khi tải đơn chưa thanh toán'));
    }
  }, [activeTab, localUser]);

  const handlePayment = async (orderId, totalPrice) => {
    try {
      await axios.post(`${API_BASE_URL}/api/payments`, {
        MaSo: orderId,
        SoTien: totalPrice,
        PhuongThuc: 'Chuyển khoản'
      });
      
      // Cập nhật lại danh sách
      setUnpaidOrders(unpaidOrders.filter(o => o.MaSo !== orderId));
      alert('✅ Thanh toán thành công!');
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi thanh toán');
    }
  };

  if (loading) return <p className="p-4">🔄 Đang tải hồ sơ...</p>;
  if (error) return (
    <div className="fixed inset-0 flex flex-row overflow-hidden">
      {/* Left Side - Error Message */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 overflow-y-auto">
        <div className="w-full max-w-md px-8 py-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Lỗi truy cập</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Đăng nhập ngay
            </button>
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
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-pink-900/50"></div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-6 py-3 font-semibold ${
            activeTab === 'info'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          👤 Thông tin tài khoản
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`px-6 py-3 font-semibold ${
            activeTab === 'payment'
              ? 'border-b-2 border-green-600 text-green-600'
              : 'text-gray-600 hover:text-green-600'
          }`}
        >
          💳 Thanh toán
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-4">👤 Thông tin tài khoản</h1>
          <ul className="space-y-3 text-gray-800">
            <li className="flex"><strong className="w-40">Tên người dùng:</strong> {user.TenNguoiDung}</li>
            <li className="flex"><strong className="w-40">Email:</strong> {user.Email}</li>
            <li className="flex"><strong className="w-40">CCCD:</strong> {user.CCCD}</li>
            <li className="flex"><strong className="w-40">Giới tính:</strong> {user.GioiTinh}</li>
            <li className="flex"><strong className="w-40">Ngày sinh:</strong> {user.NgaySinh.slice(0, 10)}</li>
            <li className="flex"><strong className="w-40">Địa chỉ:</strong> {user.DiaChi}</li>
            <li className="flex"><strong className="w-40">🎁 Điểm tích lũy:</strong> <span className="text-green-600 font-semibold">{user.DiemTichLuy}</span></li>
          </ul>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-4">💳 Đơn hàng chưa thanh toán</h1>
          {unpaidOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">✅ Không có đơn hàng nào cần thanh toán</p>
            </div>
          ) : (
            <div className="space-y-4">
              {unpaidOrders.map(order => (
                <div key={order.MaSo} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-500">🧾 Mã đơn: <strong className="text-gray-800">{order.MaSo}</strong></p>
                      <p className="mt-1">🛫 Tour: {order.IDTour}</p>
                      <p>🚍 Chuyến: {order.IDTrip}</p>
                      <p>👥 Người lớn: {order.SoLuongVe_LON} | 👶 Trẻ em: {order.SoLuongVe_TRE}</p>
                      <p className="text-sm text-gray-500">🕒 Đặt lúc: {new Date(order.ThoiGianDat).toLocaleString('vi-VN')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{Number(order.TongGia).toLocaleString()} đ</p>
                    </div>
                  </div>
                  {order.GhiChu && (
                    <p className="text-sm text-gray-600 italic mb-3">📝 {order.GhiChu}</p>
                  )}
                  <button
                    onClick={() => handlePayment(order.MaSo, order.TongGia)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    💳 Thanh toán ngay
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
