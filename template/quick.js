export default {
  type: 'text', // ①
  text: 'Select a label!',
  quickReply: { // ②
    items: [
      {
        type: 'action', // ④
        action: {
          type: 'location',
          label: 'Send location'
        }
      },
      {
        type: 'action', // ③
        imageUrl: 'https://www.designevo.com/res/templates/thumb_small/red-sun-and-mountain-camping.webp',
        action: {
          type: 'message',
          label: 'Trails',
          text: '!train 汐止'
        }
      },
      {
        type: 'action', // ③
        imageUrl: 'https://www.designevo.com/res/templates/thumb_small/beautiful-stream-and-mountain-landscape.webp',
        action: {
          type: 'message',
          label: 'Trailheads',
          text: '!trail 聖母登山步道'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://images.uiiiuiii.com/wp-content/uploads/2017/10/itz-logo20171016-5-9.jpg',
        action: {
          type: 'postback',
          label: 'Trails Intro',
          data: 'action=buy&itemid=111',
          text: '@train 汐止'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://images.uiiiuiii.com/wp-content/uploads/2017/10/itz-logo20171016-5-2.jpg',
        action: {
          type: 'postback',
          label: 'Trail Location',
          data: 'action=buy&itemid=111',
          text: '@trail 聖母登山步道'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://www.designevo.com/res/templates/thumb_small/black-circle-and-white-mountain.webp',
        action: {
          type: 'postback',
          label: 'Trailhead Location',
          data: 'action=buy&itemid=111',
          text: '@trailhead 粗坑村'
        }
      }
    ]
  }
}
