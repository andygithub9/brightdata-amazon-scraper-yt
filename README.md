# bight data 錯誤代碼 407

```json
[
  {
    "input": {
      "search": "Macbook pro"
    },
    "error": "Crawler error: tunneling socket could not be established, statusCode=407"
  }
]
```

可能是帳戶沒錢所以不讓你建立連線

# 執行流程

1.  next app 前端發送請求到 next app 後端 /api/activateScraper
2.  1.  next app 後端 /api/activateScraper 發送請求到 brightdata, 讓 brightdata 開始爬取資料, /api/activateScraper 會再存一筆資料 { status: "pending", ...other data } 到 firestore
    2.  因為前端有使用 react-firebase-hooks 監聽資料庫的變化, 所以 /api/activateScraper 存 { status: "pending", ...other data } 到 firestore 的時候, 前端會知道 firestore 多一筆資料, 所以會把 firestore 的新資料再渲染到前端
3.  brightdata 開始爬資料後會觸發 webhook, brightdata 的 webhook 會發送請求並把資料打到我們指定的 url, 我們指定的 url 是 firebase functions 的 onScraperComplete function 的 url, 所以 onScraperComplete function 會開始執行
4.  onScraperComplete 會檢查 brightdata 傳過來的 post body 的 success 欄位是 true 或 false, 如果是 false 就將錯誤存進 firestore, 如果是 true 會在發送請求到 `https://api.brightdata.com/dca/dataset?id=${id}` 抓一次資料, 然後檢查 post body 的 status , 如果 status 是 "building" 或 "collecting" 表示資料還在建立就再發送請求到 `https://api.brightdata.com/dca/dataset?id=${id}` 抓一次資料, 直到 post body 的 status 不是 "building" 或 "collecting" 就代表 brightdata 已經抓完資料, 我們拿到的也是完整的資料了, 這時我們就會將完整的資料存進 firestore
5.  firebase functions 的 onScraperComplete function 將 brightdata 爬到的資料存進 firestore 之後, 因為前端 有用 react-firebase-hooks 監聽 firestore 的資料有發生變化, 所以會將更新後的數據再渲染到畫面上
