let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'APK NAME', m)

  await m.reply('සොයමින් පවතී..')

    let res = await fetch(`https://caliphapi.com/api/playstore/search?apikey=wVLiUzSa&q=${text}`)

    let json = await res.json()

    if (res.status !== 200) throw await res.text()

    if (!json.status) throw json

    let thumb = await (await fetch(json.result[0].icon)).buffer()

    let hasil = `*── 「 PLAY STORE 」 ──*

▢ *NAME*: ${json.result[0].title}

▢ *APP ID*: ${json.result[0].appId}

▢ *DEVELOPER*: ${json.result[0].developer}

▢ *STATUS*: ${json.result[0].priceText}

▢ *PRICE*: ${json.result[0].price}

▢ *RATING*: ${json.result[0].scoreText}

▢ *DESCRIPTION*: ${json.result[0].summary}

▢ *LINK*:  

${json.result[0].url}

`

    conn.sendFile(m.chat, thumb, 'playstore.jpg', hasil, m)

}

handler.help = ['getpack'].map(v => v + ' <nama apk>')

handler.tags = ['internet']

handler.command = /^(getpack)$/i

handler.limit = true

module.exports = handler
