import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { app } from './firebase';
import { useAuth } from './AuthContext';

export default function BookingNavbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    navigate('/');
  }
  return (
    <nav className="BookingNavbar">
      <div className="navbar-logo">HAPPYShow</div>
      <div className="bookingnavbar-links">
       <Link to="/booking-records">訂票紀錄</Link>
       <Link to="/online-recharge">線上儲值</Link>
       <Link to="/member-services">會員服務</Link>
       <Link to="/instructions">操作說明</Link>
        {currentUser ? (
          <>
            <span>{currentUser.email}</span>
            <button onClick={handleLogout}>登出</button>
          </>
        ) : (
          <>
            <Link to="/login">登入</Link>
            <Link to="/register">註冊</Link>
          </>
        )}
      </div>
    </nav>
  )
}
