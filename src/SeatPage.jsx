import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
export default function SeatPage() {

  const location = useLocation()
  const {cinema,movie,date,showings}= location.state || {}
  const [seats, setSeats] = useState([
    [
      { id: "A1", status: "available" },
      { id: "A2", status: "available" },
      { id: "A3", status: "sold" },
      { id: "A4", status: "available" },
      { id: "A5", status: "available" },
    ],
    [
      { id: "B1", status: "available" },
      { id: "B2", status: "sold" },
      { id: "B3", status: "available" },
      { id: "B4", status: "sold" },
      { id: "B5", status: "available" },
    ],
    [
      { id: "C1", status: "available" },
      { id: "C2", status: "available" },
      { id: "C3", status: "sold" },
      { id: "C4", status: "available" },
      { id: "C5", status: "available" },
    ],
    [
      { id: "D1", status: "available" },
      { id: "D2", status: "available" },
      { id: "D3", status: "sold" },
      { id: "D4", status: "available" },
      { id: "D5", status: "available" },
    ],
    [
      { id: "E1", status: "available" },
      { id: "E2", status: "available" },
      { id: "E3", status: "sold" },
      { id: "E4", status: "available" },
      { id: "E5", status: "available" },
    ]
  ])

  const handleSeatClick = (rowIndex,seatsIndex) => {
    //找到被點擊的座位
    const seat = seats[rowIndex][seatsIndex]
    //判斷狀態
    if (seat.status === "sold") return //已售出，不做任何事
    //切換狀態
    const newStatus = seat.status === "available" ? "selected" : "available"
    //複製新陣列並更新(跑過所有座位，找到被點的那個，只改它，其他不動!)
    const newSeats = seats.map((row,rIndex) =>
      row.map((s,sIndex) => {
        if (rIndex === rowIndex && sIndex === seatsIndex) {
          return { ...s,status :newStatus}  
        }
        return s    
      })
    )
  setSeats(newSeats)
  }


return(
  <div className="seat-page">
    <h1>{cinema}</h1>
    <p>{movie}</p>
    <p>{date}</p>
    <p>{showings}</p>
    <div className="seat-container">
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {row.map((seat,seatIndex) => (
            <div 
            key={seat.id} 
            className={`seat ${seat.status}`}
            onClick={() => handleSeatClick(rowIndex,seatIndex)}>
            {seat.id}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
)
}