import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./App.css"

const API_KEY = import.meta.env.VITE_API_KEY

export default function MovieDetailPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(data => setMovie(data))
  }, [id])

  if (!movie) return <div>Loading...</div>

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">←Back</Link>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <div className="detail-info">
        <h1>{movie.title}</h1>
        <div className="detail-meta">
          <span>⭐ {movie.vote_average}</span>
          <span>·</span>
          <span>{movie.release_date}</span>
        </div>
        <p>{movie.overview}</p>
      </div>
    </div>
  )
}