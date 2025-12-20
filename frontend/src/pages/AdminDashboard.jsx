import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('stats'); // stats, bookings, tours, create, users
  const [selectedBookingUser, setSelectedBookingUser] = useState(null);
  const [editingTour, setEditingTour] = useState(null);
  const [newTour, setNewTour] = useState({
    IDTour: '',
    TenTour: '',
    MoTa: '',
    ChiPhiTour: '',
    LuongKhachDuKien: '',
    AnhTour: ''
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user || user.Role !== 'admin') {
      toast.error('Bạn không có quyền truy cập trang này');
      navigate('/');
      return;
    }

    fetchStats();
    fetchBookings();
    fetchTours();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTours = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/tours', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTours(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Users data:', res.data);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Không thể tải danh sách người dùng');
    }
  };

  const handleCreateTour = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/tours', newTour, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Tạo tour thành công!');
      setNewTour({ IDTour: '', TenTour: '', MoTa: '', ChiPhiTour: '', LuongKhachDuKien: '', AnhTour: '' });
      fetchTours();
      setActiveTab('tours');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi tạo tour');
    }
  };

  const handleUpdateTour = async (tourId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/tours/${tourId}`, editingTour, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Cập nhật tour thành công!');
      setEditingTour(null);
      fetchTours();
    } catch (err) {
      toast.error('Lỗi cập nhật tour');
    }
  };

  const handleDeleteTour = async (tourId) => {
    if (!window.confirm('Bạn có chắc muốn xóa tour này?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/tours/${tourId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Xóa tour thành công!');
      fetchTours();
    } catch (err) {
      toast.error('Lỗi xóa tour');
    }
  };

  const handleDeleteUser = async (username) => {
    if (!window.confirm(`Bạn có chắc muốn xóa tài khoản ${username}? Tất cả đơn đặt và đánh giá của user này cũng sẽ bị xóa!`)) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Xóa tài khoản thành công!');
      fetchUsers();
      fetchStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi xóa tài khoản');
    }
  };

  const handleResetPassword = async (username) => {
    if (!window.confirm(`Reset mật khẩu cho ${username} về 123456?`)) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/admin/users/${username}/reset-password`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error('Lỗi reset mật khẩu');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">🔧 Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 ${activeTab === 'stats' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
        >
          📊 Thống kê
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 ${activeTab === 'bookings' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
        >
          📝 Đơn đặt
        </button>
        <button
          onClick={() => setActiveTab('tours')}
          className={`px-4 py-2 ${activeTab === 'tours' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
        >
          🏖️ Tours
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 ${activeTab === 'create' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
        >
          ➕ Tạo tour mới
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
        >
          👥 Người dùng
        </button>
      </div>

      {/* Stats Tab */}
      {activeTab === 'stats' && stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <p className="text-gray-600">Tổng người dùng</p>
            <p className="text-3xl font-bold text-blue-700">{stats.totalUsers}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <p className="text-gray-600">Tổng tours</p>
            <p className="text-3xl font-bold text-green-700">{stats.totalTours}</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow">
            <p className="text-gray-600">Tổng đơn đặt</p>
            <p className="text-3xl font-bold text-yellow-700">{stats.totalBookings}</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg shadow">
            <p className="text-gray-600">Doanh thu</p>
            <p className="text-2xl font-bold text-purple-700">{Number(stats.totalRevenue).toLocaleString()} đ</p>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Danh sách đơn đặt</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Mã đơn</th>
                  <th className="border p-2">Khách hàng</th>
                  <th className="border p-2">Tour</th>
                  <th className="border p-2">Số lượng vé</th>
                  <th className="border p-2">Tổng giá</th>
                  <th className="border p-2">Trạng thái</th>
                  <th className="border p-2">Thời gian đặt</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.MaSo}>
                    <td className="border p-2">{booking.MaSo}</td>
                    <td className="border p-2">{booking.TenNguoiDung}</td>
                    <td className="border p-2">{booking.trip.tour.TenTour}</td>
                    <td className="border p-2">Lớn: {booking.SoLuongVe_LON}, Trẻ em: {booking.SoLuongVe_TRE}</td>
                    <td className="border p-2">{Number(booking.TongGia).toLocaleString()} đ</td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded ${booking.TrangThai ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {booking.TrangThai ? 'Đã thanh toán' : 'Chưa thanh toán'}
                      </span>
                    </td>
                    <td className="border p-2">{new Date(booking.ThoiGianDat).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tours Tab */}
      {activeTab === 'tours' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quản lý Tours</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tours.map((tour) => (
              <div key={tour.IDTour} className="border p-4 rounded-lg">
                {editingTour?.IDTour === tour.IDTour ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingTour.TenTour}
                      onChange={(e) => setEditingTour({ ...editingTour, TenTour: e.target.value })}
                      className="w-full border p-2 rounded"
                    />
                    <textarea
                      value={editingTour.MoTa}
                      onChange={(e) => setEditingTour({ ...editingTour, MoTa: e.target.value })}
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="number"
                      value={editingTour.ChiPhiTour}
                      onChange={(e) => setEditingTour({ ...editingTour, ChiPhiTour: e.target.value })}
                      className="w-full border p-2 rounded"
                      placeholder="Chi phí tour"
                    />
                    <input
                      type="number"
                      value={editingTour.LuongKhachDuKien}
                      onChange={(e) => setEditingTour({ ...editingTour, LuongKhachDuKien: e.target.value })}
                      className="w-full border p-2 rounded"
                      placeholder="Lượng khách dự kiến"
                    />
                    <input
                      type="text"
                      value={editingTour.AnhTour || ''}
                      onChange={(e) => setEditingTour({ ...editingTour, AnhTour: e.target.value })}
                      className="w-full border p-2 rounded"
                      placeholder="URL ảnh"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateTour(tour.IDTour)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        💾 Lưu
                      </button>
                      <button
                        onClick={() => setEditingTour(null)}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{tour.TenTour}</h3>
                    <p className="text-sm text-gray-600">{tour.MoTa}</p>
                    <p className="mt-2 font-semibold text-green-700">{Number(tour.ChiPhiTour).toLocaleString()} đ</p>
                    <p className="text-sm">Số khách: {tour.LuongKhachDuKien}</p>
                    <p className="text-sm">Số trips: {tour.trips.length}</p>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => setEditingTour(tour)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteTour(tour.IDTour)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Tour Tab */}
      {activeTab === 'create' && (
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Tạo tour mới</h2>
          <form onSubmit={handleCreateTour} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID Tour</label>
              <input
                type="text"
                required
                value={newTour.IDTour}
                onChange={(e) => setNewTour({ ...newTour, IDTour: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="VD: TOUR_DALAT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tên Tour</label>
              <input
                type="text"
                required
                value={newTour.TenTour}
                onChange={(e) => setNewTour({ ...newTour, TenTour: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả</label>
              <textarea
                value={newTour.MoTa}
                onChange={(e) => setNewTour({ ...newTour, MoTa: e.target.value })}
                className="w-full border p-2 rounded min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chi phí tour</label>
              <input
                type="number"
                required
                value={newTour.ChiPhiTour}
                onChange={(e) => setNewTour({ ...newTour, ChiPhiTour: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lượng khách dự kiến</label>
              <input
                type="number"
                required
                value={newTour.LuongKhachDuKien}
                onChange={(e) => setNewTour({ ...newTour, LuongKhachDuKien: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL Ảnh</label>
              <input
                type="text"
                value={newTour.AnhTour}
                onChange={(e) => setNewTour({ ...newTour, AnhTour: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="https://example.com/image.jpg hoặc /images/tours/image.jpg"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
            >
              ➕ Tạo Tour
            </button>
          </form>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Tên đăng nhập</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">CCCD</th>
                  <th className="border p-2">Giới tính</th>
                  <th className="border p-2">Điểm tích lũy</th>
                  <th className="border p-2">Số đơn đặt</th>
                  <th className="border p-2">Số đánh giá</th>
                  <th className="border p-2">Trạng thái</th>
                  <th className="border p-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.TenNguoiDung}>
                    <td className="border p-2 font-medium">{user.TenNguoiDung}</td>
                    <td className="border p-2">{user.Email}</td>
                    <td className="border p-2">{user.CCCD}</td>
                    <td className="border p-2">{user.GioiTinh}</td>
                    <td className="border p-2 text-center">{user.DiemTichLuy}</td>
                    <td className="border p-2 text-center">{user._count.DonDat}</td>
                    <td className="border p-2 text-center">{user._count.DanhGia}</td>
                    <td className="border p-2 text-center">
                      <span className={`px-2 py-1 rounded ${user.TrangThai ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.TrangThai ? 'Hoạt động' : 'Khóa'}
                      </span>
                    </td>
                    <td className="border p-2">
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={() => handleResetPassword(user.TenNguoiDung)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                          title="Reset mật khẩu về 123456"
                        >
                          🔑 Reset MK
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.TenNguoiDung)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="text-center py-4 text-gray-500">Chưa có người dùng nào</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
