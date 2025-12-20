// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// toast.success("Thành công!");
// toast.error("Lỗi rồi!");

// function Review() {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [orders, setOrders] = useState([]);
//   const [reviews, setReviews] = useState({});
//   const [message, setMessage] = useState('');
//   const [eligibleOrders, setEligibleOrders] = useState([]);


//   useEffect(() => {
//     const now = new Date();
  
//     axios.get(`http://localhost:5000/api/bookings/user?TenNguoiDung=${user.TenNguoiDung}`)
//       .then(async res => {
//         const data = res.data.filter(o => o.TrangThai);
//         const filtered = [];
  
//         for (let o of data) {
//           const trip = await axios.get(`http://localhost:5000/api/tours/${o.IDTour}`); // hoặc /trips
//           const match = trip.data.trips.find(t => t.ID === o.IDTrip);
//           if (match && new Date(match.NgayKetThuc) < now) filtered.push(o);
//         }
  
//         setEligibleOrders(filtered);
//       });
//   }, []);

//   const handleSubmit = async (order) => {
//     const rv = reviews[order.MaSo];
//     if (!rv?.Diem) return setMessage('Nhập điểm đánh giá');
  
//     try {
//       await axios.post('http://localhost:5000/api/reviews', {
//         TenNguoiDanhGia: user.TenNguoiDung,
//         IDTour: order.IDTour,
//         IDTrip: order.IDTrip,
//         Diem: Number(rv.Diem),
//         NhanXet: rv.NhanXet || ''
//       });
  
//       setMessage(`✅ Gửi đánh giá thành công cho ${order.MaSo}`);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Lỗi gửi đánh giá');
//     }
//   };
  
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Đánh giá chuyến đi</h2>
//       {orders.length === 0 ? (
//         <p>Không có đơn nào để đánh giá.</p>
//       ) : (
//         <ul className="space-y-6">
//           {orders.map(order => (
//             <li key={order.MaSo} className="border p-4 bg-white shadow rounded">
//               <p>🧾 Mã đơn: {order.MaSo}</p>
//               <p>Tour: {order.IDTour} | Chuyến: {order.IDTrip}</p>
//               <p>Giá trị: {Number(order.TongGia).toLocaleString()} đ</p>
//               <div className="mt-2">
//                 <label>Điểm (1–10): </label>
//                 <input
//                   type="number"
//                   min={1}
//                   max={10}
//                   value={reviews[order.MaSo]?.Diem || ''}
//                   onChange={(e) =>
//                     setReviews((prev) => ({
//                       ...prev,
//                       [order.MaSo]: { ...prev[order.MaSo], Diem: e.target.value }
//                     }))
//                   }
//                   className="border w-16 p-1 mr-2"
//                 />
//               </div>
//               <textarea
//                 className="w-full border mt-2 p-2"
//                 placeholder="Nhận xét chuyến đi"
//                 value={reviews[order.MaSo]?.NhanXet || ''}
//                 onChange={(e) =>
//                   setReviews((prev) => ({
//                     ...prev,
//                     [order.MaSo]: { ...prev[order.MaSo], NhanXet: e.target.value }
//                   }))
//                 }
//               ></textarea>
//               <button
//                 onClick={() => handleSubmit(order)}
//                 className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
//               >
//                 Gửi đánh giá
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       {message && <p className="mt-4 text-blue-600">{message}</p>}
//     </div>
//   );
// }

// export default Review;
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import backgroundLogin from '../assets/backgroundLogin.png';

function Review() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [eligibleOrders, setEligibleOrders] = useState([]);
  const [reviews, setReviews] = useState({});

  // Kiểm tra đăng nhập
  if (!user) {
    return (
      <div className="fixed inset-0 flex flex-row overflow-hidden">
        {/* Left Side - Login Required Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 overflow-y-auto">
          <div className="w-full max-w-md px-8 py-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Yêu cầu đăng nhập</h2>
              <p className="text-gray-600 mb-6">
                Bạn cần đăng nhập để đánh giá các chuyến đi đã tham gia
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
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
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/50 to-orange-900/50"></div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const now = new Date();

    const fetchEligibleOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/user?TenNguoiDung=${user.TenNguoiDung}`);
        const data = res.data.filter(o => o.TrangThai); // chỉ lấy đơn đã thanh toán

        const checked = await Promise.all(data.map(async (o) => {
          try {
            const tour = await axios.get(`http://localhost:5000/api/tours/${o.IDTour}`);
            const trip = tour.data.trips.find(t => t.ID === o.IDTrip);
            if (trip && new Date(trip.NgayKetThuc) < now) return o;
          } catch (err) {
            console.error(err);
          }
          return null;
        }));

        setEligibleOrders(checked.filter(Boolean));
      } catch (err) {
        toast.error('Lỗi khi tải danh sách đơn');
      }
    };

    fetchEligibleOrders();
  }, [user.TenNguoiDung]);

  const handleSubmit = async (order) => {
    const rv = reviews[order.MaSo];
    if (!rv?.Diem) return toast.error('Vui lòng nhập điểm đánh giá');

    try {
      await axios.post('http://localhost:5000/api/reviews', {
        TenNguoiDanhGia: user.TenNguoiDung,
        IDTour: order.IDTour,
        IDTrip: order.IDTrip,
        Diem: Number(rv.Diem),
        NhanXet: rv.NhanXet || ''
      });

      toast.success(`🎉 Gửi đánh giá thành công cho đơn ${order.MaSo}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi khi gửi đánh giá');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 Đánh giá chuyến đi đã tham gia</h2>

      {eligibleOrders.length === 0 ? (
        <p>Không có chuyến đi nào đủ điều kiện đánh giá.</p>
      ) : (
        <ul className="space-y-6">
          {eligibleOrders.map(order => (
            <li key={order.MaSo} className="border p-4 bg-white shadow rounded">
              <p className="text-sm text-gray-600">🧾 Mã đơn: <strong>{order.MaSo}</strong></p>
              <p>Tour: {order.IDTour} | Chuyến: {order.IDTrip}</p>
              <p className="mb-2">💰 Tổng giá: {Number(order.TongGia).toLocaleString()} đ</p>

              <div className="mb-2">
                <label>⭐️ Điểm (1–10): </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={reviews[order.MaSo]?.Diem || ''}
                  onChange={(e) =>
                    setReviews(prev => ({
                      ...prev,
                      [order.MaSo]: { ...prev[order.MaSo], Diem: e.target.value }
                    }))
                  }
                  className="border w-16 p-1 ml-2"
                />
              </div>

              <textarea
                className="w-full border p-2 rounded"
                rows={3}
                placeholder="Nhận xét chuyến đi..."
                value={reviews[order.MaSo]?.NhanXet || ''}
                onChange={(e) =>
                  setReviews(prev => ({
                    ...prev,
                    [order.MaSo]: { ...prev[order.MaSo], NhanXet: e.target.value }
                  }))
                }
              ></textarea>

              <button
                onClick={() => handleSubmit(order)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Gửi đánh giá
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Review;
