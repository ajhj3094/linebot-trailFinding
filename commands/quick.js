import template2 from '../template/quick.js'

export default async (event) => {
  const quick = JSON.parse(JSON.stringify(template2))
  event.reply(quick)
}
