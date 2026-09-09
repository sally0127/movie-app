# 電影探索應用

一個使用React開發的電影探索應用，串接TMDB API顯示真實電影資料，主要參考威秀官網設計。

## 功能
- 首頁輪播Banner
- 顯示四大分類：熱門電影、正在上映、即將上映、高評分
- 即時搜尋電影(含debounce防抖優化)
- 搜尋 empty state / error state / loading state 處理
- 完整訂票流程：選片/選場次 → 選付款方式 → 選座位 → 訂單摘要確認
- 座位圖選擇（可視化座位狀態：可選/已售/已選）
- 快速搜尋空位功能
- 訂票表單功能
- 最新公告列表
- 導覽列(首頁和訂票頁面各自不同)

## 使用技術

- React
- React Router
- Vite
- TMDB API
- CSS

## 已知限制
- 座位狀態目前為前端獨立管理，尚未串接資料庫，不同使用者/裝置間座位狀態不會即時同步。規劃未來以 Firebase 等後端服務處理跨使用者連動。

## 相關連結: https://movie-app-dun-ten.vercel.app


