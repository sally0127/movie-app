import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">HAPPYShow</div>
      <div className="navbar-links">
       <Link to="/">首頁</Link>
       <Link to="/theater">影城介紹</Link>
       <Link to="/movies">電影介紹</Link>
       <Link to="/brands">映演品牌</Link>
      </div> 
    </nav>
  )
}