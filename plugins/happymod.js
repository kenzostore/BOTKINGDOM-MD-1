//Bikin APIKEY SENDIRI YA BANG

//BIAR GW GAK BOROS

let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'නමක් ඇතුලත් කරන්න', m)

  await m.reply('Searching...')

    let res = await fetch(`https://api.dhnjing.xyz/api/apk/happymod?apps=${text}&apikey=5a84e26841a1d6c06392`)

    let json = await res.json()

    if (res.status !== 200) throw await res.text()

    if (!json.status) throw json

    let thumb = await (await fetch(json.result[0].apps_thumb)).buffer()

    let hasil = `*── 「 HAPPY MOD 」 ──*

▢ *NAME*: ${json.result[0].apps_name}

▢ *RATING*: ${json.result[0].apps_rate}

▢ *LINK*:  

${json.result[0].apps_linkdl}

`

    conn.sendFile(m.chat, thumb, 'playstore.jpg', hasil, m)

}

handler.help = ['modapk'].map(v => v + ' <nama apk>')

handler.tags = ['internet']

handler.command = /^(modapk)$/i

handler.limit = true

module.exports = handler
