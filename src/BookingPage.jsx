import React,{useState} from 'react'
import {useLocation} from 'react-router-dom'
export default function BookingPage() {

  const location = useLocation()
  const {movie,date,cinema,showings}= location.state || {}
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [isBooked,setisBooked] = useState(false)
  const handleConfirm =() =>{
    setisBooked(true)
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
      <button className="confirm-button" onClick={handleConfirm}>
        確認訂票
      </button>
      {isBooked&&(
        <div>
          <h2>✅ 訂票完成！</h2>
          <p>感謝您的訂購，請至影城取票！</p>
        </div>
      )}
    </div>
  )
}


