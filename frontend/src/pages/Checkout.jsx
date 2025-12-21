import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { QRCodeSVG } from 'qrcode.react';
import backgroundLogin from '../assets/backgroundLogin.png';

function Checkout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [orders, setOrders] = useState([]);
  const [promotionCode, setPromotionCode] = useState({});
  const [promotions, setPromotions] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [message, setMessage] = useState('');

  // Kiểm tra đăng nhập
  if (!user) {
    return (
      <div className="fixed inset-0 flex flex-row overflow-hidden">
        {/* Left Side - Login Required Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
          <div className="w-full max-w-md px-8 py-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Yêu cầu đăng nhập</h2>
              <p className="text-gray-600 mb-6">
                Bạn cần đăng nhập để thanh toán đơn hàng
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-emerald-900/50"></div>
        </div>
      </div>
    );
  }

  // Lấy đơn chưa thanh toán
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/user?TenNguoiDung=${user.TenNguoiDung}`);
      const pending = res.data.filter(o => !o.TrangThai);
      setOrders(pending);
    } catch {
      setMessage('Không thể tải danh sách đơn hàng.');
    }
  };

  useEffect(() => {
    if (user?.TenNguoiDung) {
      fetchOrders();
      axios.get('http://localhost:5000/api/promotions')
        .then(res => setPromotions(res.data))
        .catch(console.error);
    }
  }, []);

  const applyPromotion = async (MaSo, MaKhuyenMai = null) => {
    const code = MaKhuyenMai || promotionCode[MaSo];
    if (!code) return toast.error('Vui lòng nhập mã khuyến mãi');

    try {
      const res = await axios.post('http://localhost:5000/api/promotions/apply', { MaSo, MaKhuyenMai: code });
      toast.success(`Áp dụng mã ${code} thành công! Tổng mới: ${res.data.TongGiaSauKhiGiam.toLocaleString()} đ`);
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không áp dụng được mã');
    }
  };

  const pay = async (MaSo, method, order) => {
    // Nếu chọn chuyển khoản, hiển thị QR code
    if (method === 'Chuyển khoản') {
      setCurrentPayment({ 
        MaSo, 
        orderId: MaSo,
        amount: Number(order.TongGia),
        order 
      });
      setShowQRModal(true);
      return;
    }

    // Các phương thức khác xử lý như bình thường
    try {
      await axios.post('http://localhost:5000/api/payments', { MaSo, PhuongThucThanhToan: method });
      toast.success(`✅ Đơn ${MaSo} đã thanh toán thành công!`);
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi thanh toán');
    }
  };

  const confirmBankTransfer = async () => {
    try {
      await axios.post('http://localhost:5000/api/payments', { 
        MaSo: currentPayment.MaSo, 
        PhuongThucThanhToan: 'Chuyển khoản' 
      });
      toast.success(`✅ Xác nhận thanh toán thành công!`);
      setShowQRModal(false);
      setCurrentPayment(null);
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi thanh toán');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">💳 Thanh toán đơn hàng</h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <svg className="w-32 h-32 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-gray-500 text-lg">Bạn chưa có đơn nào đang chờ thanh toán.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            🏠 Về trang chủ
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const giaLon = order.trip?.GiaVeNguoiLon || 0;
            const giaTre = order.trip?.GiaVeTreEm || 0;
            const originalPrice = (order.SoLuongVe_LON * giaLon) + (order.SoLuongVe_TRE * giaTre);
            const hasDiscount = Number(order.TongGia) < originalPrice;

            const applicablePromos = promotions.filter(p =>
              Number(order.TongGia) >= (p.TongDonToiThieu || 0)
            );

            return (
              <div key={order.MaSo} className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">🧾 Mã đơn</p>
                    <p className="text-xl font-bold text-gray-800">{order.MaSo}</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ⏳ Chờ thanh toán
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600">🛫 Tour</p>
                    <p className="font-semibold">{order.IDTour}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">🚍 Chuyến</p>
                    <p className="font-semibold">{order.IDTrip}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">🧍‍♂️ Người lớn</p>
                    <p className="font-semibold">{order.SoLuongVe_LON} × {giaLon.toLocaleString()} đ</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">👧 Trẻ em</p>
                    <p className="font-semibold">{order.SoLuongVe_TRE} × {giaTre.toLocaleString()} đ</p>
                  </div>
                </div>

                {/* Giá */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">💰 Tổng giá gốc:</span>
                    <span className="font-semibold">{originalPrice.toLocaleString()} đ</span>
                  </div>
                  
                  {hasDiscount && (
                    <>
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>✅ Đã giảm:</span>
                        <span className="font-semibold">-{(originalPrice - order.TongGia).toLocaleString()} đ</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-indigo-700">
                        <span>🏷️ Tổng sau giảm:</span>
                        <span>{Number(order.TongGia).toLocaleString()} đ</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Mã khuyến mãi */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl mb-4">
                  <p className="text-sm font-semibold mb-2">🎁 Áp dụng mã khuyến mãi</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập mã khuyến mãi"
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                      value={promotionCode[order.MaSo] || ''}
                      onChange={(e) =>
                        setPromotionCode(prev => ({ ...prev, [order.MaSo]: e.target.value }))
                      }
                    />
                    <button
                      onClick={() => applyPromotion(order.MaSo)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                    >
                      Áp dụng
                    </button>
                  </div>

                  {/* Gợi ý mã */}
                  {applicablePromos.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-2">⚡ Mã khuyến mãi phù hợp:</p>
                      <div className="flex flex-wrap gap-2">
                        {applicablePromos.map(p => (
                          <button
                            key={p.MaKhuyenMai}
                            onClick={() => applyPromotion(order.MaSo, p.MaKhuyenMai)}
                            className="text-xs bg-white hover:bg-yellow-100 px-3 py-1 rounded-full border-2 border-yellow-300 text-indigo-700 font-semibold transition-all"
                          >
                            {p.TenUuDai} ({p.MaKhuyenMai})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Thanh toán */}
                <div className="flex items-center gap-4">
                  <label className="font-semibold text-gray-700">💳 Phương thức:</label>
                  <select
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none font-medium"
                    onChange={(e) => pay(order.MaSo, e.target.value, order)}
                    defaultValue=""
                  >
                    <option value="" disabled>-- Chọn phương thức thanh toán --</option>
                    <option value="Tiền mặt">💵 Tiền mặt</option>
                    <option value="Chuyển khoản">🏦 Chuyển khoản (QR Code)</option>
                    <option value="Thẻ tín dụng">💳 Thẻ tín dụng</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QR Code Payment Modal */}
      {showQRModal && currentPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                🏦 Thanh toán chuyển khoản
              </h3>
              <p className="text-gray-600">
                Quét mã QR để chuyển khoản
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6 bg-white p-4 rounded-lg shadow-inner">
              <QRCodeSVG
                value={`Bank: BIDV | Account: 0123456789 | Amount: ${currentPayment?.amount?.toLocaleString() || '0'}đ | Order: ${currentPayment?.orderId || ''} | Content: Thanh toan don hang ${currentPayment?.orderId || ''}`}
                size={220}
                level="H"
                includeMargin={true}
              />
            </div>

            {/* Bank Details */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6 border-2 border-green-100">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Ngân hàng:</span>
                  <span className="font-bold text-green-700">BIDV</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Số tài khoản:</span>
                  <span className="font-bold text-green-700">0123456789</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Chủ TK:</span>
                  <span className="font-bold text-green-700">VIET TRAVEL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Số tiền:</span>
                  <span className="font-bold text-red-600 text-lg">
                    {currentPayment?.amount?.toLocaleString() || '0'}đ
                  </span>
                </div>
                <div className="border-t border-green-200 pt-2 mt-2">
                  <span className="text-gray-600 font-medium">Nội dung:</span>
                  <p className="font-bold text-green-700 break-words">
                    Thanh toan don hang {currentPayment?.orderId || ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-6">
              <p className="text-xs text-yellow-800">
                ⚠️ <strong>Lưu ý:</strong> Vui lòng chuyển khoản đúng số tiền và nội dung để đơn hàng được xử lý tự động.
              </p>
            </div>

            {/* Confirm Button */}
            <button
              onClick={confirmBankTransfer}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              ✓ Đã chuyển khoản
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
