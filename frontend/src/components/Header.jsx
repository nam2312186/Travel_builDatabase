import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-lg font-bold mr-2">🌍 Traveloka Clone</Link>
        <Link to="/history" className="text-blue-600 hover:underline">Lịch sử</Link>
        <Link to="/checkout" className="text-blue-600 hover:underline">Thanh toán</Link>
        <Link to="/promotions" className="text-blue-600 hover:underline">Khuyến mãi</Link>
        <Link to="/profile" className="text-blue-600 hover:underline">Hồ sơ</Link>
        <Link to="/reviews" className="text-blue-600 hover:underline">Đánh giá</Link>
        {user?.Role === 'admin' && (
          <Link to="/admin" className="text-red-600 hover:underline font-semibold">🔧 Admin</Link>
        )}
      </nav>
      <div className="ml-6">
        {user ? (
          <div className="flex items-center gap-4">
            <span>👤 {user.TenNguoiDung}</span>
            {user.Role === 'admin' && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">ADMIN</span>}
            <button onClick={logout} className="text-blue-500 hover:underline">Đăng xuất</button>
          </div>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline px-4 py-2">Đăng nhập</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
