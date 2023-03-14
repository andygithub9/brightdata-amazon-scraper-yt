// appDir 裡的 api 目前還有些問題，一個文件夾下面同時有 page.tsx 和 route.ts 時會有衝突
// https://nextjs.org/blog/next-13-2#custom-route-handlers

// A route.ts file can export an async function named by the HTTP verbs: GET, HEAD, OPTIONS, POST, PUT, DELETE, and PATCH. These functions can then be wrapped and abstracted to create helpers / reusable logic for your custom route logic.
// export async 函數名稱對應 http request methods
// http://localhost:3000/activateScraper
export async function GET(req: Request) {
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}

// https://nextjs.org/blog/next-13-2#custom-route-handlers
// 收到的請求是 Request 類型
// https://developer.mozilla.org/en-US/docs/Web/API/Request
export async function POST(req: Request) {
  console.log("Submitting...");
  // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
  // Request.body 是一個 ReadableStream 實例
  // 接下來，我們用 ReadableStream 的 getReader 方法獲取一個讀取器，並使用它的 read() 方法讀取數據。該方法返回一個 Promise，當可讀流中有數據可用時，該 Promise 將解析為一個對象，其中包含 done 屬性和 value 屬性。如果 done 屬性為 true，則表示可讀流已經結束，否則 value 屬性包含可讀流中的下一個值。
  const reader = req.body?.getReader();
  reader!.read().then(({ done, value }) => {
    if (!done) {
      // 讀出來的 value 會是一個 Uint8Array 類型的數組
      console.log(value);
      // 想將 Uint8Array 對象轉換為字符串，您可以使用 TextDecoder 的 decode() 方法將 Uint8Array 對象解碼轉換為字符串
      const decoder = new TextDecoder();
      const text = decoder.decode(value);
      console.log(text);
    }
  });

  return new Response("Hello, Next.js!", {
    status: 200,
  });
  // console.log("SEARCH IS >> ", search);
}

export async function DELETE(req: Request) {}
