import { data, data1 } from '../data.js'
import transform from '../轉換經緯度.js'
import template2 from '../template/tem_quick.js'
import { distance } from '../經緯度間距離.js'

export default async (event) => {
  const search = event.message.text.replace('@search ', '')
  const search6 = event.message.text.replace('@search6 ', '')
  const trailhead = event.message.text.replace('@trailhead ', '')
  const trail = event.message.text.replace('@trail ', '')
  const train = event.message.text.replace('@train ', '')
  const quick = JSON.parse(JSON.stringify(template2))
  try {
    for (const info of data) {
      //! @search /步道關鍵字/ -> 查詢步道名稱 TR_CNAME 含有 search 的步道
      if (info.TR_CNAME.includes(`${search}`)) {
        let str = `🔎${search}－步道：\n`
        for (let i = 0; i < data.length; i++) {
          if (data[i].TR_CNAME.includes(`${search}`)) {
            str += data[i].TR_CNAME + '\n'
          }
        }
        event.reply([str, quick])
        return
      }
      //! @search /縣市 or 鄉鎮區 關鍵字/ -> 查詢步道位置 TR_POSITION 含有 search 的步道
      if (info.TR_POSITION.includes(`${search6}`)) {
        let str = `🔎${search6}－地區：\n`
        let counter = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i].TR_POSITION.includes(`${search6}`)) {
            str += data[i].TR_CNAME + '\n'
            counter++
          }
        }
        const result = `${str}\n(${counter}筆結果)`
        console.log(counter)
        event.reply([result, quick])
        return
      }
      //! @trailhead /登山口/ -> 顯示這個入口的座標
      // 需要再想更好的寫法，判斷陣列內物件的值等於 trailhead
      if (info.TR_ENTRANCE !== trailhead) {
        for (let i = 0; i < info.TR_ENTRANCE.length; i++) {
          if (info.TR_ENTRANCE[i].memo === trailhead) {
            event.reply([
              {
                type: 'location',
                title: '📍' + info.TR_ENTRANCE[i].memo + ' (' + `${i + 1}` + '/' + info.TR_ENTRANCE.length + ')',
                address: info.TR_CNAME + '-' + info.TR_POSITION,
                latitude: transform(info.TR_ENTRANCE[i].x, info.TR_ENTRANCE[i].y).lat,
                longitude: transform(info.TR_ENTRANCE[i].x, info.TR_ENTRANCE[i].y).lng
              },
              quick
            ])
            // 016 幫加 return，否則原本有時會'找不到'、有時有回傳，有時'找不到'卻也有回傳
            return
          }
        }
      }
      //! @trail /步道名稱/ -> 該步道的入口座標，大多不只一個
      // 跑 data 這個陣列內含有 trail 的值，這裡是回傳該 trail 所屬的整個物件
      if (info.TR_CNAME === trail) {
        const arr22 = []
        for (let i = 0; i < info.TR_ENTRANCE.length; i++) {
          arr22.push(
            {
              type: 'location',
              // 每個步道的登山口數量不同
              title: '『' + info.TR_CNAME + '』登山口' + `(${i + 1}/` + info.TR_ENTRANCE.length + ')',
              address: '📍' + info.TR_POSITION + '-' + info.TR_ENTRANCE[i].memo,
              latitude: transform(info.TR_ENTRANCE[i].x, info.TR_ENTRANCE[i].y).lat,
              longitude: transform(info.TR_ENTRANCE[i].x, info.TR_ENTRANCE[i].y).lng
            }
          )
        }
        arr22.push(quick)
        console.log(arr22)
        event.reply(arr22)
        return
      }
      for (const ts of data1) {
        //! @train /火車站名/ -> 與該車站距離最近的 5 個步道，站名如臺北、臺中，需使用「臺」而非「台」
        if (ts.stationName === train) {
          const newGps = ts.gps.split(' ')
          const Px = newGps[0]
          const Py = newGps[1]
          const arr = []
          const array = []
          for (let i = 0; i < data.length; i++) {
            // 總共 125 筆資料，但是第 120 筆沒有登山口的座標資料，需要 continue 跳過，所以會回傳 124 筆
            if (i === 120) { continue }
            const dt = distance(Px, Py, transform(data[i].TR_ENTRANCE[0].x, data[i].TR_ENTRANCE[0].y).lat, transform(data[i].TR_ENTRANCE[0].x, data[i].TR_ENTRANCE[0].y).lng, 'K')
            const trail = data[i].TR_CNAME
            const ent = data[i].TR_ENTRANCE[0].memo
            const url = data[i].URL
            const len = data[i].TR_LENGTH
            const alt = data[i].TR_ALT
            const low = data[i].TR_ALT_LOW
            const pav = data[i].TR_PAVE
            const day = data[i].TR_TOUR
            const wea = data[i].TR_BEST_SEASON
            const add = data[i].TR_POSITION
            // 將距離四捨五入到小數點第二位
            function roundToTwo (num) {
              return +(Math.round(num + 'e+2') + 'e-2')
            }
            const object = { trailName: trail, Entrance: ent, DistanceKm: roundToTwo(dt), Length: len, Url: url, Alt: alt, Low: low, Pav: pav, Day: day, Wea: wea, Add: add }
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
          // 只能回 4 文字 + 1 個 quick，若是回 5 文字 + 1 個 quick 會錯誤。
          event.reply([
            {
              type: 'text',
              text: `🍁${z[0].trailName}🍁\n🌳地區➟${z[0].Add}\n🌳距離➟${z[0].DistanceKm} 公里\n🌳全長➟${z[0].Length}\n🌳海拔➟${z[0].Low}~${z[0].Alt} 公尺\n🌳天數➟${z[0].Day}\n🌳季節➟${z[0].Wea}\n🌳入口➟${z[0].Entrance}\n🌳路面➟${z[0].Pav}\n🌳查看更多➟${z[0].Url}`
            },
            {
              type: 'text',
              text: `🍁${z[1].trailName}🍁\n🌳地區➟${z[1].Add}\n🌳距離➟${z[1].DistanceKm} 公里\n🌳全長➟${z[1].Length}\n🌳海拔➟${z[1].Low}~${z[1].Alt} 公尺\n🌳天數➟${z[1].Day}\n🌳季節➟${z[1].Wea}\n🌳入口➟${z[1].Entrance}\n🌳路面➟${z[1].Pav}\n🌳查看更多➟${z[1].Url}`
            },
            {
              type: 'text',
              text: `🍁${z[2].trailName}🍁\n🌳地區➟${z[2].Add}\n🌳距離➟${z[2].DistanceKm} 公里\n🌳全長➟${z[2].Length}\n🌳海拔➟${z[2].Low}~${z[2].Alt} 公尺\n🌳天數➟${z[2].Day}\n🌳季節➟${z[2].Wea}\n🌳入口➟${z[2].Entrance}\n🌳路面➟${z[2].Pav}\n🌳查看更多➟${z[2].Url}`
            },
            {
              type: 'text',
              text: `🍁${z[3].trailName}🍁\n🌳地區➟${z[3].Add}\n🌳距離➟${z[3].DistanceKm} 公里\n🌳全長➟${z[3].Length}\n🌳海拔➟${z[3].Low}~${z[3].Alt} 公尺\n🌳天數➟${z[3].Day}\n🌳季節➟${z[3].Wea}\n🌳入口➟${z[3].Entrance}\n🌳路面➟${z[3].Pav}\n🌳查看更多➟${z[3].Url}`
            },
            quick
          ])
          return
        }
      }
    }
    event.reply([{ type: 'text', text: '找不到，請再試一次' }, quick])
  } catch (error) {
    console.log(error)
    event.reply([{ type: 'text', text: '發生錯誤' }, quick])
  }
}
