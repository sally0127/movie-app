## Moive App - Agent Guidelines

## 專案描述
一個使用React開發的電影探索應用，串接 TMDB API。

## 使用技術
-React
-Vite
-React Router
-TMDB API
-CSS

## 檔案結構
my-movie-app/

├── public/

├── src/

│    ├── App.jsx

│    ├── App.css

│    ├── HomePage.jsx

│    └── MovieDetailPage.jsx

├── .env

├── .gitignore

├── agent.md

├── index.html

├── package.json

└── vite.config.js

## 開發規則
-使用 fetch 串接 API，不使用 axios
-使用.then()處理非同步，加上.catch()錯誤處理
-API Key 存在環境變數 VITE_API_KEY
-使用原生CSS，不使用CSS framework
-元件命名使用PascalCase

## 注意
-TMDB API 需要 api_key 參數
-圖片網址格式：https://image.tmdb.org/t/p/w500{poster_path}
