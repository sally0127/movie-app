## Moive App - Agent Guidelines

## 專案描述

一個使用React開發的電影探索應用，串接TMDB API顯示真實電影資料，主要參考威秀官網設計。

## 使用技術

-React

-React Router

-Vite

-TMDB API

-CSS

-Firebase(Firestore、Authentication)

## 檔案結構

```
my-movie-app/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── HomePage.jsx
│   ├── main.jsx
│   └── MovieDetailPage.jsx
│   └── BookingPage.jsx
│   └── SeatPage.jsx
│   └── BookingSeatPage.jsx
│   └── OrderSummaryPage.jsx
│   └── SearchSeatsPage.jsx
│   └── Navbar.jsx
│   └── BookingNavbar.jsx
│   └── RegisterPage.jsx
│   └── LoginPage.jsx
│   └── AuthContext.jsx
│   └── firebase.js

├── .env
├── .gitignore
├── agent.md
├── index.html
├── package.json
└── vite.config.js
```

## 開發規則

-使用 fetch 串接 API，不使用 axios

-使用.then()處理非同步，加上.catch()錯誤處理(Firebase操作使用async/await + try...catch)

-TMDB API Key 存在環境變數 VITE_API_KEY

-使用原生CSS，不使用CSS framework

-元件命名使用PascalCase

## 功能說明

### 首頁

-輪播Banner : 用setInterval每3秒切換熱門電影

-四大分類 : 用Promise.all同時呼叫四個TMDB API

-及時搜尋 : 含debounce 500ms防抖優化

-empty state /error state/loading state處理

-快速訂票&快搜空位表單(Controlled Components)

-最新公告列表(假資料)

### 會員登入

-使用Firebase Authentication(Email/密碼登入)

-AuthContext.jsx :用 Context 管理全站登入狀態，onAuthStateChanged 監聽登入狀態變化，其他頁面透過 useAuth() 取得 currentUser（含 uid、email）

-main.jsx : 用 AuthProvider 包住整個 App，確保所有頁面都能讀到登入狀態

-RegisterPage(/register)：createUserWithEmailAndPassword 註冊，失敗時顯示錯誤訊息

-LoginPage(/login)：signInWithEmailAndPassword 登入，成功後導回首頁

-Navbar：依 currentUser 切換顯示（未登入顯示登入/註冊連結，已登入顯示 Email 與登出按鈕），登出使用 signOut

-尚未完成：表單驗證與中文錯誤訊息、路由保護

### 訂票流程

-流程:HomePage(選影城/電影/日期/場次)→ BookingPage(選付款方式)→ BookingSeatPage(選座位)→ OrderSummaryPage(訂單摘要)→ 訂票完成

-用useNavigate傳資料到下一頁，用useLocation接收資料

-付款方式用radio button選擇（線上付款/現場付款）

-選完座位後導向訂單摘要頁，顯示完整訂單明細，確認後才算真正訂票完成


### 座位選擇

-用2d array存座位資料（結構為[{row: [...]}, {row: [...]}, ...]，因 Firestore 不支援巢狀陣列而調整），用兩層map()渲染座位圖

-BookingSeatPage(/booking-seat):唯一可點選座位的頁面，給「前往訂票」完整流程使用

  -用flatMap()+filter()算出已選座位清單

  -確認訂票按鈕，按下後用runTransaction讀取最新座位資料並將自己選中的座位標記為sold(selectedBy保留，紀錄是誰買的)，寫入成功後才導向訂單摘要頁

  -座位跨使用者連動:透過Firebase Firestore的onSnapshot即時監聽座位文件，已驗證多人連動核心機制可運作（開兩個瀏覽器分頁測試，一邊點選座位，另一邊會即時同步更新，不需重新整理）

  -座位歸屬：已登入使用者選座位時，selectedBy 寫入 currentUser.uid，自己選的顯示綠色（selected），別人選的顯示紅色（沿用 sold 樣式）且不可點選，未登入點擊座位會提示並導向 /login。

  -座位釋放機制:
    -使用者選了座位但未確認訂票就離開頁面時，用useEffect(依賴currentUser?.uid)的清理函式，透過runTransaction釋放該使用者選中、還沒確認的座位(改回available，selectedBy:null)
    -登出時，Navbar.jsx 的 handleLogout 在呼叫 signOut 之前，先用同樣的方式釋放座位（雙重保護，兩邊都會釋放，不會互相衝突或重複出錯）
    -用bookingConfirmedRef(useRef)標記是否已確認訂票，避免訂票成功、座位變sold後，離開頁面時又被清理函式誤釋放

-SeatPage(/seat):純顯示，不可點選，給快速訂票tab的「搜尋空位」查詢用

-已知限制:
  1. Firestore Security Rules 目前為測試模式，尚未設定正式的讀寫權限規則
  2.多人同時搶同一座位的情境已用runTransaction處理(讀取、判斷、寫入綁成不可分割的操作，避免原本setDoc寫入時後者覆蓋前者的問題)


### 導覽列

-用useLocation判斷目前頁面

-用三元運算子切換Navbar/BookingNavbar

-Navbar依登入狀態切換登入/註冊與登出

## 注意

-TMDB API 需要 api_key 參數

-圖片網址格式：https://image.tmdb.org/t/p/w500{poster_path}

-Firebase 的 firebaseConfig 目前直接寫在 firebase.js（apiKey 本身可公開，資料安全靠 Security Rules），之後可改用環境變數統一管理
