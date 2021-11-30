// 讀取 .env 變數
import 'dotenv/config'
// 引用 linebot 套件
import linebot from 'linebot'
// 引用執行 data.js
import './data.js'
import name from './commands/name.js'
import region from './commands/region.js'
import flex from './commands/flex.js'
import near from './commands/near.js'
import axios from 'axios'
import cheerio from 'cheerio'

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
    // console.log(event)
    // console.log('-----------------------')
    if (event.message.text.startsWith('!name ')) {
      name(event)
    } else if (event.message.text.startsWith('!region ')) {
      region(event)
    } else if (event.message.text.startsWith('!flex')) {
      flex(event)
      // const { data } = await axios.get('https://recreation.forest.gov.tw/Forest/Query')
      // const $ = cheerio.load(data)
      // console.log($('.web_aera_block').length)
    } else {
      event.reply([
        { type: 'text', text: '🔔格式錯誤，請參考指令範本' },
        { type: 'text', text: '"!flex 汐止" - 距離該火車站最近的 8 筆登山步道資訊\n\n"!flex 聖母登山步道" - 該步道所有的登山口資訊\n\n"!name 汐止" - 距離該火車站最近的 5 筆登山步道資訊\n\n"!name 聖母步道" - 該步道地圖位置\n\n"!name 粗坑村" - 該登山口地圖位置\n' },
        { type: 'text', text: '📍Location - 傳送您目前的座標位置，甚至可以傳送任何座標位置，將回傳距離該位置最近的 5 筆登山步道資訊。' }
      ])
    }
  } else if (event.message.type === 'location') {
    near(event)
    // console.log(event.message.latitude, event.message.longitude)
  }
})
