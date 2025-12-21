import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { setupAutoLogout } from './utils/autoLogout';

// Components
import Header from './components/Header';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TourDetail from './pages/TourDetail';
import Checkout from './pages/Checkout';
import Review from './pages/Review';
import History from './pages/History';
import Promotions from './pages/Promotions';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Setup auto logout
  useEffect(() => {
    const handleAutoLogout = () => {
      localStorage.clear();
      toast.warning('⏰ Phiên đăng nhập đã hết hạn do không hoạt động. Vui lòng đăng nhập lại!', {
        autoClose: 5000
      });
      navigate('/login');
    };

    const cleanup = setupAutoLogout(handleAutoLogout);

    return cleanup;
  }, [navigate]);

  if (isAuthPage) {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/history" element={<History />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;