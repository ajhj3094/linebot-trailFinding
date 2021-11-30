export default {
  type: 'text', // ①
  text: 'Select your favorite food category or send me your location!',
  quickReply: { // ②
    items: [
      {
        type: 'action', // ③
        imageUrl: 'https://example.com/sushi.png',
        action: {
          type: 'message',
          label: 'Xizhi',
          text: '!flex 汐止'
        }
      },
      {
        type: 'action', // ③
        imageUrl: 'https://example.com/sushi.png',
        action: {
          type: 'message',
          label: 'Xizhi',
          text: '!flex 聖母登山步道'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://example.com/tempura.png',
        action: {
          type: 'postback',
          label: 'Buy',
          data: 'action=buy&itemid=111',
          text: '!name 汐止'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://example.com/tempura.png',
        action: {
          type: 'postback',
          label: 'Buy',
          data: 'action=buy&itemid=111',
          text: '!name 聖母登山步道'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://example.com/tempura.png',
        action: {
          type: 'postback',
          label: 'Buy',
          data: 'action=buy&itemid=111',
          text: '!name 粗坑村'
        }
      },
      {
        type: 'action', // ④
        action: {
          type: 'location',
          label: 'Send location'
        }
      }
    ]
  }
}
