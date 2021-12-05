export default {
  type: 'text', // ①
  text: '請選擇標籤！',
  quickReply: { // ②
    items: [
      {
        type: 'action', // ④
        action: {
          type: 'location',
          label: '傳送座標'
        }
      },
      {
        type: 'action', // ③
        imageUrl: 'https://cdn.dribbble.com/users/3819719/screenshots/14917636/media/b5ddf03bdd31e524b993831eee187e36.jpg?compress=1&resize=1200x900',
        action: {
          type: 'message',
          label: '搜尋車站附近步道',
          text: '!train 汐止'
        }
      },
      {
        type: 'action', // ③
        imageUrl: 'https://cdn.dribbble.com/users/3819719/screenshots/14917636/media/b5ddf03bdd31e524b993831eee187e36.jpg?compress=1&resize=1200x900',
        action: {
          type: 'message',
          label: '搜尋步道所有入口',
          text: '!trail 聖母登山步道'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://www.designevo.com/res/templates/thumb_small/beautiful-stream-and-mountain-landscape.webp',
        action: {
          type: 'postback',
          label: '步道名搜尋步道',
          data: 'action=buy&itemid=111',
          text: '@search 大霸'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://www.designevo.com/res/templates/thumb_small/beautiful-stream-and-mountain-landscape.webp',
        action: {
          type: 'postback',
          label: '行政區搜尋步道',
          data: 'action=buy&itemid=111',
          text: '@search6 礁溪'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://www.clipartmax.com/png/middle/342-3420669_climb-glacier-logo-adventure-mountain-logo.png',
        action: {
          type: 'postback',
          label: '車站附近步道詳細資訊',
          data: 'action=buy&itemid=111',
          text: '@train 汐止'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://www.clipartmax.com/png/middle/342-3420669_climb-glacier-logo-adventure-mountain-logo.png',
        action: {
          type: 'postback',
          label: '單筆步道詳細資訊',
          data: 'action=buy&itemid=111',
          text: '@合歡尖山步道'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://images.uiiiuiii.com/wp-content/uploads/2017/10/itz-logo20171016-5-2.jpg',
        action: {
          type: 'postback',
          label: '步道所有入口位置',
          data: 'action=buy&itemid=111',
          text: '@trail 聖母登山步道'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://images.uiiiuiii.com/wp-content/uploads/2017/10/itz-logo20171016-5-2.jpg',
        action: {
          type: 'postback',
          label: '入口位置',
          data: 'action=buy&itemid=111',
          text: '@trailhead 粗坑村'
        }
      }
    ]
  }
}
