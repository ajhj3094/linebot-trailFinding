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
import quick1 from './commands/quick.js'
import quick from './template/quick.js'

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
    if (event.message.text.startsWith('@trailhead ') || event.message.text.startsWith('@train ') || event.message.text.startsWith('@trail ')) {
      name(event)
    } else if (event.message.text.startsWith('!region ')) {
      region(event)
    } else if (event.message.text.startsWith('!trail') || event.message.text.startsWith('!train')) {
      flex(event)
    } else if (event.message.text === '!help' || event.message.text === '!help ' || event.message.text === 'D' || event.message.text === 'H') {
      quick1(event)
      // const { data } = await axios.get('https://recreation.forest.gov.tw/Forest/Query')
      // const $ = cheerio.load(data)
      // console.log($('.web_aera_block').length)
    } else {
      event.reply([
        { type: 'text', text: '🔔格式錯誤，請參考指令範本' },
        { type: 'text', text: '"help"、"D" - 快速選單\n\n"!train 汐止" - 距離該火車站最近的 8 筆步道資訊\n\n"!trail 聖母登山步道" - 該步道所有的入口資訊\n\n"@train 汐止" - 距離該火車站最近的 4 筆步道資訊\n\n"@trail 聖母登山步道" - 該步道座標位置\n\n"@trailhead 粗坑村" - 該入口座標位置\n\n📍Location - 傳送任何座標位置，並回傳距離該座標最近的 8 筆步道資訊。\n' },
        quick
      ])
    }
  } else if (event.message.type === 'location') {
    near(event)
    // console.log(event)

    // console.log(event.message.latitude, event.message.longitude)
  }
})
