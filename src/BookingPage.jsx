import React,{useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
export default function BookingPage() {

  const location = useLocation()
  const navigate = useNavigate()
  const {movie,date,cinema,showings}= location.state || {}
  const [paymentMethod, setPaymentMethod] = useState("online")
  const handleConfirm =() =>{
    navigate("/booking-seat", {
      state: { movie, date, cinema, showings, paymentMethod }
    })
  }
  return (
    <div className="booking-page">
      <h1>訂票確認</h1>
      <div className="booking-info">
      <p>電影:{movie}</p>
      <p>日期:{date}</p>
      <p>影城:{cinema}</p>
      <p>場次:{showings}</p>
      </div>
      <div className="payment-method">
        <h2>付款方式</h2>
        <label>
          <input
            type="radio"
            value="online"
            checked={paymentMethod === "online"}
            onChange={() => setPaymentMethod("online")}
          />
          <span>線上付款</span>
        </label>
        <label>
          <input
            type="radio"
            value="counter"
            checked={paymentMethod === "counter"}
            onChange={() => setPaymentMethod("counter")}
          />
          <span>現場付款</span>
        </label>
      </div>
      <button className="confirm-button" onClick={handleConfirm}
      >
        下一步:選擇座位
      </button>
    </div>
  )
}


