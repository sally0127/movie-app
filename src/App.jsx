import { Routes, Route, useLocation} from 'react-router-dom'
import HomePage from './HomePage'
import MovieDetailPage from './MovieDetailPage'
import BookingPage from './BookingPage'
import SeatPage from './SeatPage'
import Navbar from './Navbar'
import BookingNavbar from './BookingNavbar'
import SearchSeatsPage from './SearchSeatsPage'

export default function App() {
  const location = useLocation();
  const isBookingPage = location.pathname === "/booking" || location.pathname === "/seat" || location.pathname === "/search-seats"
  return (
    <div>
      {isBookingPage ? <BookingNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/seat" element={<SeatPage />} />
        <Route path="/search-seats" element={<SearchSeatsPage />} />
      </Routes>
    </div>
  )
}

