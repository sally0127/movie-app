import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import MovieDetailPage from './MovieDetailPage'
import BookingPage from './BookingPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  )
}

