import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import TourDetail from './pages/TourDetail';
import Header from './components/Header';
import Checkout from './pages/Checkout';
import Review from './pages/Review';
import History from './pages/History';
import Register from './pages/Register';
import Promotions from './pages/Promotions';
import Profile from './pages/Profile';



function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/history" element={<History />} />
        <Route path="/register" element={<Register />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/profile" element={<Profile />} />

        {token ? (
          <>
            <Route path="/tours/:id" element={<TourDetail />} />
          </>
        ) : (
          <Route path="/tours/:id" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<p className="p-4">Không tìm thấy trang</p>} />
      </Routes>
    </div>
  );
}

export default App;
