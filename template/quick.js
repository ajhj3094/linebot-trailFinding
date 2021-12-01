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
        imageUrl: 'https://example.com/sushi.png',
        action: {
          type: 'message',
          label: 'TrailCards',
          text: '!flex 汐止'
        }
      },
      {
        type: 'action', // ③
        imageUrl: 'https://example.com/sushi.png',
        action: {
          type: 'message',
          label: 'TrailheadCards',
          text: '!flex 聖母登山步道'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://example.com/tempura.png',
        action: {
          type: 'postback',
          label: 'Trails',
          data: 'action=buy&itemid=111',
          text: '!name 汐止'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://example.com/tempura.png',
        action: {
          type: 'postback',
          label: 'TrailLocation',
          data: 'action=buy&itemid=111',
          text: '!name 聖母登山步道'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://example.com/tempura.png',
        action: {
          type: 'postback',
          label: 'TrailheadLocation ',
          data: 'action=buy&itemid=111',
          text: '!name 粗坑村'
        }
      }
    ]
  }
}
