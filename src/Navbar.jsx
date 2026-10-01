import {Link,useNavigate} from 'react-router-dom'
import {getAuth,signOut} from 'firebase/auth'
import {doc,runTransaction} from 'firebase/firestore'
import { app } from './firebase';
import { db } from './firebase'
import { useAuth } from './AuthContext';

export default function Navbar() {
  const {currentUser} = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (currentUser) {
      const seatDocRef = doc(db, "seats", "theater1")
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(seatDocRef)
        if (!docSnap.exists()) return

        const currentSeats = docSnap.data().seats
        const releasedSeats = currentSeats.map(rowObj => ({
          row: rowObj.row.map(seat =>
            seat.status === "selected" && seat.selectedBy === currentUser.uid
              ? { ...seat, status: "available", selectedBy: null }
              : seat
          )
        }))
        if (releasedSeats.some((rowObj, rowIndex) =>
          rowObj.row.some((seat, seatIndex) =>
            seat !== currentSeats[rowIndex].row[seatIndex]
          )
        )) {
          transaction.update(seatDocRef, { seats: releasedSeats })
        }
      })
    }
    const auth = getAuth(app);
    await signOut(auth);
    navigate('/');
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo">HAPPYShow</div>
      <div className="navbar-links">
       <Link to="/">首頁</Link>
       <Link to="/theater">影城介紹</Link>
       <Link to="/movies">電影介紹</Link>
       <Link to="/brands">映演品牌</Link>
       {currentUser ? (
        <>
        <span>{currentUser.email}</span>
        <button onClick={handleLogout}>登出</button>
        </>
       ) : (
        <>
        <Link to="/login">登入</Link>
        <Link to="/register">註冊</Link>
        </>
       )}
      </div> 
    </nav>
  )
}