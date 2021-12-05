import template from '../template/tem_flex.js'
import template2 from '../template/tem_quick.js'
import { data } from '../data.js'
import transform from '../轉換經緯度.js'
import { distance } from '../經緯度間距離.js'
import axios from 'axios'

export default async (event) => {
  // event.message.latitude 取得緯度
  // event.message.longitude 取得經度
  const flex = JSON.parse(JSON.stringify(template))
  const quick = JSON.parse(JSON.stringify(template2))

  try {
    flex.altText = '哈囉'
    const arr = []
    const array = []
    for (let i = 0; i < data.length; i++) {
      // 總共 125 筆資料，但是第 120 筆沒有登山口的座標資料，需要 continue 跳過，所以會回傳 124 筆
      if (i === 120) { continue }
      const dt = distance(event.message.latitude, event.message.longitude, transform(data[i].TR_ENTRANCE[0].x, data[i].TR_ENTRANCE[0].y).lat, transform(data[i].TR_ENTRANCE[0].x, data[i].TR_ENTRANCE[0].y).lng, 'K')
      const trail = data[i].TR_CNAME
      const ent = data[i].TR_ENTRANCE[0].memo
      const url = data[i].URL
      const len = data[i].TR_LENGTH
      const tra = data[i].TRAILID
      const dif = data[i].TR_DIF_CLASS
      const alt = data[i].TR_ALT
      // 將距離四捨五入到小數點第二位
      function roundToTwo (num) {
        return +(Math.round(num + 'e+2') + 'e-2')
      }
      const object = { trailName: trail, Entrance: ent, DistanceKm: roundToTwo(dt), Length: len, Url: url, Trail: tra, Dif: dif, Alt: alt }
      array.push(object)
      arr.push(roundToTwo(dt))
    }
    // 124 筆資料由小到大排序
    const sequence = arr.sort((a, b) => {
      return a - b
    })
    // 最外層的 for of 得從 sequence 跑，距離才會由小到大排序
    const z = []
    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (sequence[i] === array[j].DistanceKm) {
          z.push(array[j])
        }
      }
    }

    for (let i = 0; i < 8; i++) {
      flex.contents.contents.length = 8
      flex.contents.contents[i].body.contents[0].text = '🌳' + z[i].trailName
      await axios.get('https://recreation.forest.gov.tw/Files/RT/Photo/' + z[i].Trail + '/05/' + z[i].Trail + '.jpg')
        .then(({ data }) => {
          flex.contents.contents[i].hero.url = 'https://recreation.forest.gov.tw/Files/RT/Photo/' + z[i].Trail + '/05/' + z[i].Trail + '.jpg'
        }).catch(error => {
          console.log(error)
          flex.contents.contents[i].hero.url = 'https://recreation.forest.gov.tw/Files/RT/Photo/' + z[i].Trail + '/05/01.jpg'
        })
      // text 只給變數會無效，需要給一個字串
      flex.contents.contents[i].body.contents[2].contents[0].contents[0].text = '📍入口➟' + z[i].Entrance + '\n📍距離➟' + z[i].DistanceKm + '公里\n📍全長➟' + z[i].Length + '\n📍海拔➟' + z[i].Alt + '公尺\n\n👉點我查看更多入口'
      flex.contents.contents[i].body.action.text = '!trail ' + z[i].trailName
      flex.contents.contents[i].body.contents[1].contents[5].size = 'sm'
      flex.contents.contents[i].body.contents[1].contents[5].text = 'EXPE'
      flex.contents.contents[i].body.contents[1].contents[5].color = '#800080'
      flex.contents.contents[i].body.contents[2].contents[0].margin = 'md'
      if (z[i].Dif === '1') {
        for (let j = 1; j < 4; j++) {
          flex.contents.contents[i].body.contents[1].contents[j].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
          flex.contents.contents[i].body.contents[1].contents[5].text = 'EASY'
          flex.contents.contents[i].body.contents[1].contents[5].color = '#00aa00'
        }
      } else if (z[i].Dif === '2') {
        for (let j = 2; j < 4; j++) {
          flex.contents.contents[i].body.contents[1].contents[j].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
          flex.contents.contents[i].body.contents[1].contents[5].text = 'NORM'
          flex.contents.contents[i].body.contents[1].contents[5].color = '#ff8c00'
        }
      } else if (z[i].Dif === '3') {
        for (let j = 3; j < 4; j++) {
          flex.contents.contents[i].body.contents[1].contents[j].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
          flex.contents.contents[i].body.contents[1].contents[5].text = 'HARD'
          flex.contents.contents[i].body.contents[1].contents[5].color = '#ff0000'
        }
      } else if (z[i].Dif === '5') {
        flex.contents.contents[i].body.contents[1].contents[4].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
        flex.contents.contents[i].body.contents[1].contents[5].text = 'IMPO'
        flex.contents.contents[i].body.contents[1].contents[5].color = '#d2691e'
      }
    }
    event.reply(
      [flex, quick]
    )
    return
  } catch (error) {
    console.log(error)
    event.reply([{ type: 'text', text: '發生錯誤' }, quick])
  }
}
