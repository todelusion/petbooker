<p align="center">
  <a href="https://petcity-booking.netlify.app/">
    <img width="200" src="https://i.imgur.com/IJAnAib.png">
  </a>
</p>

<h1 align="center" style="font-weight: 700">寵物坊城市</h1>

<div align="center">
<a href="https://bit.ly/3hXSrfs" style="display: block ;background-color: #E7ECC4; color: black; font-weight: 700; border-radius: 9999px; margin-bottom: 16px">
<p>
📙簡報介紹📙
</p>
</a><br>
<p>
一個飼主友善的寵物旅館訂房平台
</p>
<img src="https://i.imgur.com/SHcXsBt.jpg">
</div>

![](https://i.imgur.com/wrrZ5Eu.png)

## **功能介紹**
### 必要功能
飼主以及業者的登入、註冊、修改密碼、忘記密碼
### 飼主功能
* 寵物名片功能
  * 寵物名片後台管理
  * 選取寵物名片以便帶入該寵物的需求條件
* 訂房與自動產生寵物名片
  * 生成訂單的同時產生寵物名片，告知店家寵物詳細需求
  * 判斷是否已有寵物名片，決定是否修改既有的名片
* 條件過濾寵物旅店，包括包括價格、服務、時間
* 編輯帳戶資訊
* 查看歷史訂單
* 評論與評分店家
### 業者功能
* 上架旅店
* 房型管理
* 訂單管理
* 查看評價



## 使用技術
* Typescript：
  1. 在 component 內部定義相對應的 interface props 方便團隊之間溝通 component 的使用方式
  2. 定義 API 的物件格式，其衍生的 type guard 則使用ZOD (TypeScript-first schema validation)這一解決方案
  3. 透過泛型定義 useState, useReducer等等React官方提供的 Hooks，避免後續的傳入錯誤引數的可能

* Zod：
  1. 一個 Typescript-first 的 schema 宣告與驗證庫
  2. 用於定義 API 的物件格式，所有資料進出都可以經過 schema 驗證，避免直接使用 Typescript 斷言從 API 傳進來的物件格式

* Tailwind：
  1. 原子 CSS Framework
  2. 統一的 className 命名方便團隊之間協作
  3. 優秀的編譯效能

* React Query：
  1. 控制資料狀態（緩存）
  2. 監控資料過期與否
  3. 搭配 zod schema 能在 type safe 的前提之下拆分 Request hooks

* Framer Motion：實現 unmounted 時的 css 動畫，例如彈窗消失的效果

* ESlint：使用 Airbnb-typescript 規則
