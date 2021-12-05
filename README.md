# 山上人間🌲🚶‍♂️🌲 - linebot
藉由火車站位置或任意座標位置，找到附近的登山步道!  
也可以查詢所有登山步道的距離和其它詳細資訊!
## 加入好友
- 加入 line ID: `@789ydcgy`
- 或是掃描 [QR code](https://line.me/ti/p/@789ydcgy "加入好友")  

  <img src="https://raw.githubusercontent.com/ajhj3094/linebot-trailsFinding/007994ad03942a23eddcab343b9aae3cb137ccac/images/789ydcgy.png" width="250px"/>
## 導覽
- [指令和快速回覆](#指令和快速回覆)
- [尋找登山步道](#尋找登山步道)
  - [位置訊息](#一、位置訊息)
  - [車站名稱](#二、車站名稱)
  - [步道名稱](#三、步道名稱)
  - [關鍵字搜尋](#四、關鍵字搜尋)
  - [步道資訊](#五、步道資訊)
  - [登山口位置](#六、登山口位置)
## 指令和快速回覆
- 輸入 "C" 查看所有指令  

  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/S__96026899.jpg?raw=true" width="300px"/>
- 輸入 "D" 開啟快速回覆。共有 9 個功能標籤，並於每次回覆自動開啟  

  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/S__96026897.jpg?raw=true" width="300px"/>
------
## 尋找登山步道
### 一、位置訊息
- 使用快速回覆的 `傳送座標` 標籤
- 或傳送任意位置訊息，就可以找到最靠近該座標的 8 筆登山步道資訊，並且由左到右排列，依序為最近到最遠的步道
  
  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/748F27E8-4AA4-4796-B06B-50D518AB5E61.jpg?raw=true" width="300px"/>  
  
  - 星星數量代表難易度等級
  - 顯示該步道和傳送座標的距離
  - 點擊卡片查看該步道的 [__登山口__](#步道名稱)
---
### 二、車站名稱
- 使用快速回覆的 `搜尋車站附近步道` 標籤
- 或輸入 `!train /車站名稱/`，查詢距離火車站最近的 8 筆登山步道

  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/D9E00656-7BFA-4278-8D7C-2E356EE8F81B.png?raw=true" width="300px"/>
---
### 三、步道名稱
- 使用快速回覆的 `搜尋所有步道入口` 標籤
- 或輸入 `!trail /步道完整名稱/`，查詢此步道的所有登山口資訊

  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/S__96034847.jpg?raw=true" width="300px"/>

  - 點擊卡片查看該登山口的 [**位置**](#登山口位置)
---
### 四、關鍵字搜尋
- 使用快速回覆的 `步道名搜尋步道` 標籤，或輸入 `@search /步道名稱關鍵字/`，以關鍵字搜尋完整步道名稱
- 使用快速回覆的 `行政區搜尋步道` 標籤，，或輸入 `@search6 /縣市鄉鎮區/`，以關鍵字搜尋該地區所有步道
  
  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/S__96034853.jpg?raw=true" width="300px"/>
---
### 五、步道資訊
- 使用快速回覆的 `車站附近步道詳細資訊` 標籤
- 或輸入 `@train /車站名稱/`，查詢距離火車站最近的 4 筆步道詳細資訊

  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/CE576992-AB35-4F3D-8CFF-A3200A73003A.png?raw=true" width="300px"/>
  
- 使用快速回覆的 `單筆步道詳細資訊` 標籤
- 或輸入 `@/步道完整名稱/`，查詢此步道的詳細資訊

  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/B32A7EBC-438B-42E6-8007-6E82B8DF294B.png?raw=true" width="300px"/>
---
### 六、登山口位置
- 使用快速回覆的 `步道所有入口位置` 標籤
- 或輸入 `@trail /步道完整名稱/`，查詢此步道所有登山口的位置，並以 (1/2) 表示兩個登山口的第一個

  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/S__96034856.jpg?raw=true" width="300px"/>
  
- 使用快速回覆的 `入口位置` 標籤
- 或輸入 `@trailhead /登山口名稱/`，查詢此登山口的座標位置

  <img src="https://github.com/ajhj3094/linebot-trailsFinding/blob/main/images/S__96034858.jpg?raw=true" width="300px"/>
  
