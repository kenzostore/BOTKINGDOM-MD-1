let fetch = require('node-fetch')

let handler = async (m, { text }) => {

  if (!text) throw 'give me url'

  let res = await fetch(`http://hadi-api.herokuapp.com/api/cuttly?url=${text}`)

  let json = await res.json()

  if (json.status) m.reply(json.result)

  else throw 'Link Invalid!'

}

handler.help = ['cuttly'].map(v => v + ' <link>')

handler.tags = ['shortlink']

handler.command = /^cuttly$/i

module.exports = handler
