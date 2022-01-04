let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) throw `*Perintah ini untuk mencari kode pos berdasarkan kota/pencarian*\n\ncontoh:\n${usedPrefix + command} Lamongan`

    let res = await fetch(global.API('xteam', '/kodepos', { q: text }, 'APIKEY'))

    if (res.status != 200) throw await res.text()

    let json = await res.json()

    if (!json.status) throw json

    let mes = json.result.map((v, i) => `${i + 1}. Province: ${v.province}\ncity: ${v.city}\nsubdictrict: ${v.subdistrict}\nPerkotaan: ${v.urban}\ncode Pos: ${v.postalcode}`).join('\n\n')

    m.reply(mes)

}

handler.help = ['postcode <name>']

handler.tags = ['tools']

handler.command = /^postcode$/i

handler.limit = true

module.exports = handler
