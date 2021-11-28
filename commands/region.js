import axios from 'axios'

export default async (event) => {
  const region = event.message.text.replace('!region ', '')
  try {
    const results = []
    const { data } = await axios.get('http://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json')
    for (const info of data.XML_Head.Infos.Info) {
      if (info.Region === region) {
        results.push(info.Name)
        if (results.length >= 5) {
          break
        }
      }
    }
    console.log(results)
    if (results.length > 0) {
      event.reply(results)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
