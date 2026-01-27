import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config';
toast.success("Thành công!");
toast.error("Lỗi rồi!");

function Home() {
  const [tours, setTours] = useState([]);
  
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(true);
  //   axios.get('http://localhost:5000/api/tours')
  //     .then(res => setTours(res.data))
  //     .catch(console.error)
  //     .finally(() => setLoading(false));
  // }, []);
  
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/tours`)
      .then(res => {
        setTours(res.data);
        console.log('TOUR DATA:', res.data); // ✅ in toàn bộ danh sách tour
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) return <p className="p-4">Đang tải tour...</p>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🌴 Danh sách tour</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map(tour => (
          <Link to={`/tours/${tour.IDTour}`} key={tour.IDTour}>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <img
                src={tour.AnhTour && tour.AnhTour.startsWith('http') ? tour.AnhTour : '/no-image.jpg'}
                alt={tour.TenTour}
                className="w-full h-48 object-cover rounded mb-2 bg-gray-100"
              />
              <h2 className="text-xl font-semibold text-blue-800">{tour.TenTour}</h2>
              <p className="text-sm text-gray-600 mt-1 mb-2">
                {tour.MoTa ? `${tour.MoTa.slice(0, 80)}...` : 'Không có mô tả'}
              </p>
              <p className="text-lg text-indigo-600 font-bold">
                {Number(tour.ChiPhiTour).toLocaleString()} đ
              </p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
