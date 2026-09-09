import { useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function OrderSummaryPage() {
	const { state } = useLocation()
	const {
		cinema,
		movie,
		date,
		showings,
		paymentMethod,
		seats = []
	} = state || {}
	const [isBooked, setIsBooked] = useState(false)

	const paymentMethodText = paymentMethod === 'counter' ? '現場付款' : '線上付款'

	return (
		<div className="order-summary-page">
			<h1>訂單摘要</h1>
			<div className="order-summary-info">
				<p>影城：{cinema}</p>
				<p>電影：{movie}</p>
				<p>日期：{date}</p>
				<p>場次：{showings}</p>
				<p>付款方式：{paymentMethodText}</p>
				<p>座位：{seats.length > 0 ? seats.join(', ') : '尚未選擇'}</p>
			</div>

			<button
				className="confirm-button"
				onClick={() => setIsBooked(true)}
				disabled={isBooked}
			>
				確認訂票
			</button>

			{isBooked && (
				<div className="booking-complete">
					<h2>訂票完成！</h2>
					<p>感謝您的訂購，請依付款方式完成取票。</p>
				</div>
			)}
		</div>
	)
}
