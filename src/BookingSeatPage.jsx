import React, { useState ,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {doc,setDoc,onSnapshot} from "firebase/firestore"
import { db } from './firebase'
import { useAuth } from './AuthContext'
export default function BookingSeatPage() {

  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { cinema, movie, date, showings,paymentMethod } = location.state || {}
  const [seats, setSeats] = useState([])

  useEffect(() => {
    const seatDocRef = doc(db, "seats", "theater1")

    // onSnapshot 會即時監聽這份文件，只要資料庫內容改變，就會自動執行這個 callback
    const unsubscribe = onSnapshot(seatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setSeats(docSnap.data().seats)
      } else {
        // 如果 Firestore 裡還沒有這份資料，用預設座位資料建立一份
        const defaultSeats = [
          {row: [
            { id: "A1", status: "available", selectedBy: null },
            { id: "A2", status: "available", selectedBy: null },
            { id: "A3", status: "sold", selectedBy: null },
            { id: "A4", status: "available", selectedBy: null },
            { id: "A5", status: "available", selectedBy: null },
          ]},
          {row: [
            { id: "B1", status: "available", selectedBy: null },
            { id: "B2", status: "sold", selectedBy: null },
            { id: "B3", status: "available", selectedBy: null },
            { id: "B4", status: "sold", selectedBy: null },
            { id: "B5", status: "available", selectedBy: null },
          ]},
          {row: [
            { id: "C1", status: "available", selectedBy: null },
            { id: "C2", status: "available", selectedBy: null },
            { id: "C3", status: "sold", selectedBy: null },
            { id: "C4", status: "available", selectedBy: null },
            { id: "C5", status: "available", selectedBy: null },
          ]},
          {row: [
            { id: "D1", status: "available", selectedBy: null },
            { id: "D2", status: "available", selectedBy: null },
            { id: "D3", status: "sold", selectedBy: null },
            { id: "D4", status: "available", selectedBy: null },
            { id: "D5", status: "available", selectedBy: null },
          ]},
          {row: [
            { id: "E1", status: "available", selectedBy: null },
            { id: "E2", status: "available", selectedBy: null },
            { id: "E3", status: "sold", selectedBy: null },
            { id: "E4", status: "available", selectedBy: null },
            { id: "E5", status: "available", selectedBy: null },
          ]}
        ]
        setDoc(seatDocRef, { seats: defaultSeats })
      }
    })

    // 元件卸載時，記得取消監聽，避免記憶體洩漏
    return () => unsubscribe()
  }, [])

  const handleSeatClick = async (rowIndex, seatsIndex) => {
    if (!currentUser) {
      alert("請先登入")
      navigate("/login")
      return
    }
    //找到被點擊的座位
    const seat = seats[rowIndex].row[seatsIndex]
    //判斷狀態
    if (seat.status === "sold") return //已售出，不做任何事
    if (seat.status === "selected" && seat.selectedBy !== currentUser.uid) return
    //切換狀態
    const newStatus = seat.status === "available" ? "selected" : "available"
    //複製新陣列並更新(跑過所有座位，找到被點的那個，只改它，其他不動!)
    const newSeats = seats.map((rowObj, rIndex) =>{
      if (rIndex === rowIndex) {
        return { 
          row: rowObj.row.map((s, sIndex) => {
          if (sIndex === seatsIndex) {
            return {
              ...s,
              status: newStatus,
              selectedBy: newStatus === "selected" ? currentUser.uid : null
            }
          }
          return s
        }) 
      }
    }
      return rowObj
    })
    const seatDocRef = doc(db, "seats", "theater1")
    await setDoc(seatDocRef, { seats: newSeats })
  }

  const selectedSeats = seats.flatMap(rowObj => rowObj.row).filter(
    seat => seat.status === "selected" && seat.selectedBy === currentUser?.uid
  )
  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert("請至少選擇一個座位")
      return
    } 
    navigate("/order-summary",{
      state: { cinema, movie, date, showings, paymentMethod,
               seats:selectedSeats.map(seat => seat.id) 
       }
    })
  }
  return (
    <div className="booking-seat-page">
      <h1>{cinema}</h1>
      <p>{movie}</p>
      <p>{date}</p>
      <p>{showings}</p>
      <div className="seat-container">
        {seats.map((rowObj, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {rowObj.row.map((seat, seatIndex) => (
              <div
                key={seat.id}
                className={`seat ${seat.status === "selected" && seat.selectedBy !== currentUser?.uid ? "sold" : seat.status}`}
                onClick={() => handleSeatClick(rowIndex, seatIndex)}>
                {seat.id}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="selected-info">
        <p>已選座位:{selectedSeats.length > 0 ? selectedSeats.map(seat => seat.id).join(", ") : "尚未選擇"}</p>
        <p>已選數量:{selectedSeats.length}</p>
      </div>

      <button
        className="confirm-button"
        disabled={selectedSeats.length === 0}
        onClick={handleConfirmBooking}
      >確認訂票</button>

    </div>
  )
}