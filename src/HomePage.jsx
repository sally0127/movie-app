import {useState} from "react";
import {useEffect} from "react";
import "./App.css";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const API_KEY = import.meta.env.VITE_API_KEY;;

export default function HomePage(){
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);         // 搜尋結果（保留）
  const [categories, setCategories] = useState({}); // 新增：首頁四個分類
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cinema,setCinema] = useState("")
  const [selectedMovie, setSelectedMovie] = useState("")
  const [date, setDate] = useState("")
  const [showings, setShowings] = useState("")
  const [city,setCity] = useState("")
  const [people,setPeople] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [activeTab,setActiveTab] = useState("booking") //紀錄目前哪個tab被點擊
  const navigate = useNavigate()

  useEffect(() => {
    if (!categories.popular?.length)return//資料還沒來就不執行
    const timer = setInterval(() => {
      setCurrentIndex(i => (i + 1) % categories.popular.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [categories.popular]);

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

  const handleBooking = () => {
    if (!cinema || !selectedMovie || !date || !showings) {
      alert("請填寫完整訂票資訊");
      return
    }
    const movieTitle = categories.popular?.find(m => m.id === Number(selectedMovie))?.title
    navigate("/booking",{state:{movie:movieTitle,date,cinema,showings}});
  }

  const handleSeatSearch = () => {
    if (!city || !selectedMovie || !date || !startTime || !endTime) {
      alert("請填寫完整搜尋資訊");
      return
    }
    //找到電影名稱
    const movieTitle = categories.popular?.find(m => m.id === Number(selectedMovie))?.title
    navigate("/search-seats", { state: { movie: movieTitle, city, date, starttime: startTime, endtime: endTime } });
  }

  const announcements =[{
    id:0, 
    date:"2026/07/13",
    content:"會員系統例行維護公告",
  },{
    id:1,
    date:"2026/06/26",
    content:"舊版官方APP 07/01終止服務",
  },
  {
    id:2,
    date:"2026/05/28",
    content:"維護購票權益- 敬老愛心票領取贈品須知",
  },
  {
    id: 3,
    date:"2026/05/15",
    content:"會員生日禮權益調整公告",
  }
];

  return(
    <div className="container">
      <div className="header">
      <input className="search" value={query} onChange={e =>setQuery(e.target.value)} placeholder="search..."/>
      </div>
      {query === "" ? (

        <div>
          {/*輪播Banner*/}
          {categories.popular?.length > 0 && (
            <div className ="banner">
              <Link to={`/movie/${categories.popular[currentIndex].id}`}>
              <img src={`https://image.tmdb.org/t/p/original${categories.popular[currentIndex].backdrop_path}`} />
              <div className="banner-info">
                <h2>{categories.popular[currentIndex].title}</h2>
                <p>{categories.popular[currentIndex].overview}</p>
              </div>
              </Link>
          </div>
          )}
      <div className="booking-announcements">
        {/*左邊:訂票表單*/}
        <div className="booking-form">
          {/* 電影訂票表單 */}
          <div className="booking-tabs">
            <button onClick={()=>setActiveTab("booking")}>快速訂票</button>
            <button onClick={()=>setActiveTab("search")}>快搜空位</button>
          </div>
        {activeTab ==="booking" ?(
          <div>
            <select value={cinema} onChange={e => setCinema(e.target.value)}>
              <option value="">請選擇影城</option>
              <option value="台北信義威秀影城">台北信義威秀影城</option>
              <option value="台中大遠百威秀影城">台中大遠百威秀影城</option>
              <option value="高雄大遠百威秀影城">高雄大遠百威秀影城</option>
            </select>
            <select value={selectedMovie} onChange={e => setSelectedMovie(e.target.value)}>
              <option value="">請選擇影片</option>
                {categories.popular?.map(movie => (
              <option key={movie.id} value={movie.id}>{movie.title}</option>
               ))}
            </select>
            <select value={date} onChange={e => setDate(e.target.value)}>
              <option value="">請選擇日期</option>
              <option value="2026-05-23">2026/05/23</option>
              <option value="2026-05-24">2026/05/24</option>
              <option value="2026-05-25">2026/05/25</option>
            </select>
            <select value={showings} onChange={e => setShowings(e.target.value)}>
              <option value="">請選擇場次</option>
              <option value="10:00">10:00</option>
              <option value="14:00">14:00</option>
              <option value="18:00">18:00</option>
            </select>
            <div className="booking-buttons">
              <button onClick={handleBooking} className="btn">前往訂票</button>
              <button onClick={handleSeatSearch} className="btn">搜尋空位</button>
            </div>
          </div>
        ) :(
          //快搜空位
          <div>
            <select value={city} onChange={e => setCity(e.target.value)}>
              <option value="">請選擇地區</option>
              <option value="台北">台北</option>
              <option value="台中">台中</option>
              <option value="高雄">高雄</option>
            </select>
            <select value={selectedMovie} onChange={e => setSelectedMovie(e.target.value)}>
              <option value="">請選擇影片</option>
                {categories.popular?.map(movie => (
                  <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
            </select>
            <select value={date} onChange={e => setDate(e.target.value)}>
              <option value="">請選擇日期</option>
              <option value="2026-05-23">2026/05/23</option>
              <option value="2026-05-24">2026/05/24</option>
              <option value="2026-05-25">2026/05/25</option>
            </select>
            <select value={people} onChange={e => setPeople(e.target.value)}>
              <option value="">請選擇人數</option>
              <option value="1">1人</option>
              <option value="2">2人</option>
              <option value="3">3人</option>
              <option value="4">4人</option>
            </select>
            <div className="time-range">
            <select value={startTime} onChange={e => setStartTime(e.target.value)}>
              <option value="">開始時間</option>
              <option value="10:00">10:00</option>
              <option value="12:00">12:00</option>
              <option value="14:00">14:00</option>
            </select>
            <span>~</span>
            <select value={endTime} onChange={e => setEndTime(e.target.value)}>
                <option value="">結束時間</option>
                <option value="14:00">14:00</option>
                <option value="16:00">16:00</option>
                <option value="18:00">18:00</option>
            </select>   
          </div>
          <button onClick={handleSeatSearch} className="btn">搜尋空位</button>
          </div>
        )}
        </div>
        {/*右邊:最新公告*/}
          <div className="announcement">
            <h2>最新公告</h2>
              {announcements.map(announcement => (
                <div key={announcement.id} className="announcement-item">
                  <span className="announcement-date">{announcement.date}</span>
                  <span className="announcement-content">{announcement.content}</span>
                  </div>
              ))}
          </div>
      </div>

        {/* 首頁：四個分類*/}
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
      </div>
      ) : (
        // 搜尋結果 
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
  )
  }