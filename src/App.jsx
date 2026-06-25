import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import MovieDetailPage from './MovieDetailPage'
import BookingPage from './BookingPage'
import SeatPage from './SeatPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/seat" element={<SeatPage />} />
    </Routes>
  )
}

