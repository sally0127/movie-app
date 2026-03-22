import {useState} from "react";
import {useEffect} from "react";
import "./App.css";
import { Link } from 'react-router-dom'
const API_KEY = import.meta.env.VITE_API_KEY;;

export default function HomePage(){
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);         // 搜尋結果（保留）
  const [categories, setCategories] = useState({}); // 新增：首頁四個分類
  useEffect(() => {
    if (query === "") {
      // 呼叫四個分類 API
      Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`),
      ])
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(([popular, nowPlaying, upcoming, topRated]) => {
          setCategories({
            popular: popular.results,
            nowPlaying: nowPlaying.results,
            upcoming: upcoming.results,
            topRated: topRated.results,
          });
        });
    } else {
      // 呼叫搜尋 API
      fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`)
        .then(r => r.json())
        .then(data => setMovies(data.results));
    }
  }, [query]);

  return(
    <div className="container">
      <div className="header">
      <input className="search" value={query} onChange={e =>setQuery(e.target.value)} placeholder="search..."/>
      </div>
      {query === "" ? (
        // 首頁：四個分類
        <div>
          <section>
            <h2>熱門電影</h2>
          <ul className="movie-grid">
          {categories.popular?.map(movie=>( 
            <li key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
              <div>
                <p className="title">{movie.title}</p>
                <p className="overview">{movie.overview}</p>
                <div className="meta">
                  <span>{movie.release_date}</span>
                  <span> · </span>
                  <span>⭐ {movie.vote_average}</span>
                </div>
              </div>
              </Link>
            </li>
          ))}
        </ul>
        </section>
          <section>
            <h2>正在上映</h2>
            <ul className="movie-grid">
              {categories.nowPlaying?.map(movie => (
                <li key={movie.id} className="movie-card">
                  <Link to={`/movie/${movie.id}`}> 
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                  <div>
                    <p className="title">{movie.title}</p>
                    <p className="overview">{movie.overview}</p>
                    <div className="meta">
                      <span>{movie.release_date}</span>
                      <span> · </span>
                      <span>⭐ {movie.vote_average}</span>
                    </div>
                  </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>即將上映</h2>
            <ul className="movie-grid">
              {categories.upcoming?.map(movie => (
                <li key={movie.id} className="movie-card">
                  <Link to={`/movie/${movie.id}`}> 
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                  <div>
                    <p className="title">{movie.title}</p>
                    <p className="overview">{movie.overview}</p>
                    <div className="meta">
                      <span>{movie.release_date}</span>
                      <span> · </span>
                      <span>⭐ {movie.vote_average}</span>
                    </div>
                  </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>高評分電影</h2>
            <ul className="movie-grid">
              {categories.topRated?.map(movie => (
                <li key={movie.id} className="movie-card">
                  <Link to={`/movie/${movie.id}`}> 
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                  <div>
                    <p className="title">{movie.title}</p>
                    <p className="overview">{movie.overview}</p>
                    <div className="meta">
                      <span>{movie.release_date}</span>
                      <span> · </span>
                      <span>⭐ {movie.vote_average}</span>
                    </div>
                  </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
      </div>
      ) : (
        // 搜尋結果（跟原本一樣）
        <ul className="movie-grid">
          {movies.map(movie => (
            <li key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}> 
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              <div>
                <p className="title">{movie.title}</p>
                <p className="overview">{movie.overview}</p>
                <div className="meta">
                  <span>{movie.release_date}</span>
                  <span> · </span>
                  <span>⭐ {movie.vote_average}</span>
                </div>
              </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}