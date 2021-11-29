import axios from 'axios'
import schedule from 'node-schedule'

// 資料陣列
export let data = []
export let data1 = []

// 更新資料的 function
const getData = () => {
  axios.get('https://recreation.forest.gov.tw/mis/api/BasicInfo/Trail')
    .then(response => {
      data = response.data
      console.log('步道資料成功更新')
    })
  axios.get('https://ods.railway.gov.tw/tra-ods-web/ods/download/dataResource/0518b833e8964d53bfea3f7691aea0ee')
    .then(response => {
      data1 = response.data
      console.log('車站資料成功更新')
    })
}

// const getImg = () => {
//   axios.get('https://user-images.githubusercontent.com/88765055/143734451-f9f2294e-0b52-4fc2-83ef-722a53eb46a3.jp')
//     .then(response => {
//       console.log('有抓到圖片')
//     }).catch(error => {
//       console.log('沒有抓到圖片')
//     })
// }

// getImg()

// 機器人啟動時先更新資料
getData()

// 設定排程每日 0:00 更新
schedule.scheduleJob('0 0 * * *', getData)
