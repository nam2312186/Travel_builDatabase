import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundLogin from '../assets/backgroundLogin.png';
import { API_BASE_URL } from '../config';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    TenNguoiDung: '',
    MatKhau: '',
    Email: '',
    CCCD: '',
    GioiTinh: 'Nam',
    NgaySinh: '',
    DiaChi: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Xóa lỗi khi user bắt đầu sửa
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Username
    if (form.TenNguoiDung.length < 3) {
      newErrors.TenNguoiDung = 'Tên người dùng phải có ít nhất 3 ký tự';
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.TenNguoiDung)) {
      newErrors.TenNguoiDung = 'Chỉ được chứa chữ cái, số và dấu gạch dưới';
    }

    // Validate Password
    if (form.MatKhau.length < 6) {
      newErrors.MatKhau = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.MatKhau)) {
      newErrors.MatKhau = 'Mật khẩu phải có chữ hoa, chữ thường và số';
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.Email)) {
      newErrors.Email = 'Email không đúng định dạng';
    }

    // Validate CCCD
    if (!/^\d{12}$/.test(form.CCCD)) {
      newErrors.CCCD = 'CCCD phải là 12 chữ số';
    }

    // Validate Ngày sinh (phải đủ 18 tuổi)
    if (form.NgaySinh) {
      const today = new Date();
      const birthDate = new Date(form.NgaySinh);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        newErrors.NgaySinh = 'Phải đủ 18 tuổi để đăng ký';
      } else if (age > 120) {
        newErrors.NgaySinh = 'Ngày sinh không hợp lệ';
      }
    }

    // Validate Địa chỉ
    if (form.DiaChi.length < 10) {
      newErrors.DiaChi = 'Địa chỉ phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin đăng ký');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, form);
      toast.success('Đăng ký thành công! Đang chuyển đến trang đăng nhập...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi đăng ký');
    }
  };

  return (
    <div className="fixed inset-0 flex flex-row overflow-hidden">
      {/* Left Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
        <div className="w-full max-w-md px-8 py-12">
          <div className="bg-white p-8 rounded-3xl shadow-2xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký tài khoản</h1>
              <p className="text-gray-600">Tham gia cùng chúng tôi! 🌟</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên người dùng
                </label>
                <input
                  name="TenNguoiDung"
                  type="text"
                  placeholder="Nhập tên đăng nhập (chữ, số, _)"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.TenNguoiDung
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-200 focus:border-emerald-500'
                  }`}
                  onChange={handleChange}
                />
                {errors.TenNguoiDung && (
                  <p className="text-red-500 text-xs mt-1">{errors.TenNguoiDung}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <input
                  name="MatKhau"
                  type="password"
                  placeholder="Tối thiểu 6 ký tự, có chữ hoa, số"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.MatKhau
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-200 focus:border-emerald-500'
                  }`}
                  onChange={handleChange}
                />
                {errors.MatKhau && (
                  <p className="text-red-500 text-xs mt-1">{errors.MatKhau}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="Email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.Email
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-200 focus:border-emerald-500'
                  }`}
                  onChange={handleChange}
                />
                {errors.Email && (
                  <p className="text-red-500 text-xs mt-1">{errors.Email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  CCCD
                </label>
                <input
                  name="CCCD"
                  type="text"
                  placeholder="12 chữ số"
                  maxLength="12"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.CCCD
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-200 focus:border-emerald-500'
                  }`}
                  onChange={handleChange}
                />
                {errors.CCCD && (
                  <p className="text-red-500 text-xs mt-1">{errors.CCCD}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Ngày sinh
                  </label>
                  <input
                    name="NgaySinh"
                    type="date"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.NgaySinh
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-emerald-500'
                    }`}
                    onChange={handleChange}
                  />
                  {errors.NgaySinh && (
                    <p className="text-red-500 text-xs mt-1">{errors.NgaySinh}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Giới tính
                  </label>
                  <select
                    name="GioiTinh"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition"
                    onChange={handleChange}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Địa chỉ
                </label>
                <input
                  name="DiaChi"
                  type="text"
                  placeholder="Nhập địa chỉ chi tiết (tối thiểu 10 ký tự)"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.DiaChi
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-200 focus:border-emerald-500'
                  }`}
                  onChange={handleChange}
                />
                {errors.DiaChi && (
                  <p className="text-red-500 text-xs mt-1">{errors.DiaChi}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
              >
                Đăng ký
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Đã có tài khoản?{' '}
              <a href="/login" className="text-emerald-600 font-semibold hover:underline">
                Đăng nhập ngay
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-emerald-900/50 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-2xl">
            <h2 className="text-6xl font-bold mb-6 drop-shadow-2xl">Traveloka Clone</h2>
            <p className="text-2xl mb-3 drop-shadow-lg">Bắt đầu hành trình của bạn</p>
            <p className="text-xl opacity-95 drop-shadow-lg">Khám phá Việt Nam với hàng trăm tour du lịch hấp dẫn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
