## Moive App - Agent Guidelines

## 專案描述

一個使用React開發的電影探索應用，串接TMDB API顯示真實電影資料，主要參考威秀官網設計。

## 使用技術

-React

-React Router

-Vite

-TMDB API

-CSS

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
│   └── SearchSeatsPage.jsx
│   └── Navbar.jsx
│   └── BookingNavbar.jsx

├── .env
├── .gitignore
├── agent.md
├── index.html
├── package.json
└── vite.config.js
```

## 開發規則

-使用 fetch 串接 API，不使用 axios

-使用.then()處理非同步，加上.catch()錯誤處理

-API Key 存在環境變數 VITE_API_KEY

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

### 訂票流程

-用useNavigate傳資料到訂票確認頁面

-用useLocation接收資料

-付款方式用radio button選擇

### 座位選擇

-用2d array存座位資料

-用兩層map()渲染座位圖

-點擊切換座位狀態(available/selected/sold)

### 導覽列

-用useLocation判斷目前頁面

-用三元運算子切換Navbar/BookingNavbar

## 注意

-TMDB API 需要 api_key 參數

-圖片網址格式：https://image.tmdb.org/t/p/w500{poster_path}
