import {useLocation} from 'react-router-dom'
export default function SearchseatsPage() {

  const location = useLocation()
  const {city,movie,date,starttime,endtime}= location.state || {}

  return(
    <div className="searchseats-page">
      <h1>快搜條件</h1>
      <div className="searchseats-info">
      <p>地區:{city}</p>
      <p>影片:{movie}</p>
      <p>日期:{date}</p>
      <p>開始時間:{starttime}</p>
      <p>結束時間:{endtime}</p>
      </div>
      <h1>快搜空位結果</h1>
      <p>沒有符合的場次</p>
    </div>
  )
}