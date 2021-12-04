// 讀取 .env 變數
import 'dotenv/config'
// 引用 linebot 套件
import linebot from 'linebot'
// 引用執行 data.js
import './data.js'
import name from './commands/name.js'
import flex from './commands/flex.js'
import near from './commands/near.js'
import quick from './template/tem_quick.js'

// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    // 回傳的 json 內容請參考 line 文件 -> Documentation -> Messaging API -> Messaging API -> Webhook Event Objects
    // 或直接在講義的連結 "LINE文件"連結
    if (event.message.text.startsWith('@trailhead ') || event.message.text.startsWith('@train ') || event.message.text.startsWith('@trail ') || event.message.text.startsWith('@search ') || event.message.text.startsWith('@search6')) {
      name(event)
    } else if (event.message.text.startsWith('!trail') || event.message.text.startsWith('!train')) {
      flex(event)
    } else if (event.message.text === 'help' || event.message.text === 'help ' || event.message.text === 'D' || event.message.text === 'H') {
      // 這裡直接回覆 template/quick 所以直接 event.reply(quick)，而不是原本的 quick(event) --016
      event.reply(quick)
    } else {
      event.reply([
        { type: 'text', text: '🔔格式錯誤，請參考指令範本' },
        { type: 'text', text: '"help"、"D" - 開啟功能標籤，並使用範本標籤\n\n📍Location - 傳送任意座標位置，尋找距離該座標最近的 8 筆步道資訊\n\n"!train 汐止" - 距離該火車站由最近到最遠的 8 筆步道資訊\n\n"!trail 聖母登山步道" - 該步道所有的入口資訊\n\n"@search 大霸" - 以步道名稱的關鍵字搜尋步道\n\n"@search6 礁溪" - 以縣市 or 鄉鎮區關鍵字搜尋步道\n\n"@train 汐止" - 距離該火車站最近的 4 筆步道詳細資訊\n\n"@trail 聖母登山步道" - 該步道所有起始點的座標位置\n\n"@trailhead 粗坑村" - 該入口座標位置\n' },
        quick
      ])
    }
  } else if (event.message.type === 'location') {
    near(event)
  }
})
