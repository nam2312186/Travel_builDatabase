import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundLogin from '../assets/backgroundLogin.png';
import { API_BASE_URL } from '../config';

function Login() {
  const [TenNguoiDung, setTenNguoiDung] = useState('');
  const [MatKhau, setMatKhau] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        TenNguoiDung,
        MatKhau
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Đăng nhập thành công!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="fixed inset-0 flex flex-row overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto">
        <div className="w-full max-w-md px-8 py-12">
          {/* Back to Home Button */}
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Quay về trang chủ</span>
          </button>

          <div className="bg-white p-10 rounded-3xl shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Đăng nhập</h1>
              <p className="text-gray-600 text-lg">Chào mừng trở lại! 👋</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-base"
                  placeholder="Nhập tên đăng nhập"
                  value={TenNguoiDung}
                  onChange={(e) => setTenNguoiDung(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-base"
                  placeholder="Nhập mật khẩu"
                  value={MatKhau}
                  onChange={(e) => setMatKhau(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
              >
                Đăng nhập
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-8">
              Chưa có tài khoản?{' '}
              <a href="/register" className="text-blue-600 font-semibold hover:underline text-base">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div 
        className="hidden lg:block lg:w-1/2 relative"
        style={{ 
          backgroundImage: `url(${backgroundLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-2xl">
            <h2 className="text-6xl font-bold mb-6 drop-shadow-2xl">Traveloka Clone</h2>
            <p className="text-2xl mb-3 drop-shadow-lg">Khám phá Việt Nam</p>
            <p className="text-xl opacity-95 drop-shadow-lg">Đặt tour du lịch dễ dàng, trải nghiệm tuyệt vời</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
