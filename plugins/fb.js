let fetch = require('node-fetch')

let handler = async (m, { conn, command, text, usedPrefix }) => {

    if (!text) throw `GIVE ME LINK`

    let res = await fetch(API('amel', '/fb', { url: text }, 'apikey'))

    if (!res.ok) throw eror

    let json = await res.json()

    if (!json.status) throw json

    await m.reply(wait)

    await conn.sendFile(m.chat, json.result.data[0].url, json.result.data[0].url + json.result.data[0].type, wm, m)

}

handler.help = ['facebook'].map(v => v + ' <url>')

handler.tags = ['downloader']

handler.command = /^(facebook|fb)$/i

handler.limit = 1

module.exports = handler
