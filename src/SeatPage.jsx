import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
export default function SeatPage() {

  const location = useLocation()
  const {movie,date,cinema}= location.state || {}
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

return(
  <div className="seat-page">
    <h1>{movie}</h1>
    <p>{date}</p>
    <p>{cinema}</p>
    <div className="seat-container">
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {row.map((seat) => (
            <div key={seat.id} className={`seat ${seat.status}`}>
              {seat.id}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
)
}