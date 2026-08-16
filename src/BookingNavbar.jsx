import {Link} from 'react-router-dom'
export default function BookingNavbar() {
  return (
    <nav className="BookingNavbar">
      <div className="navbar-logo">HAPPYShow</div>
      <div className="bookingnavbar-links">
       <Link to="/member-login">會員登入</Link>
       <Link to="/booking-records">訂票紀錄</Link>
       <Link to="/online-recharge">線上儲值</Link>
       <Link to="/member-services">會員服務</Link>
       <Link to="/instructions">操作說明</Link>
      </div>
    </nav>
  )
}
