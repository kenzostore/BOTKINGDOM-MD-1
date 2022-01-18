let axios = require('axios')

let limit = 1024

const { servers, yta } = require('../lib/y2mate')

let handler = async (m, { conn, args, isPrems, isOwner }) => {

  if (!args || !args[0]) throw 'ලින්ක් එක'

  let chat = global.db.data.chats[m.chat]

  let server = (args[1] || servers[0]).toLowerCase()

  let { dl_link, thumb, title, filesize, filesizeF} = await yta(args[0], servers.includes(server) ? server : servers[0])

  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize

  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `

*Title:* ${title}

*Filesize:* ${filesizeF}

*${isLimit ? 'link ': ''}Link:* 

${await shortlink(dl_link)}

**ශ්‍රව්‍යය නොයවන්නේ නම්*

ඉහත *ලින්ක් එක හරහා ඔබට එය කෙලින්ම බාගත හැක*`.trim(), m)

  if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp3', `

*Title:* ${title}

*Filesize:* ${filesizeF}

`.trim(), m, null, {

  asDocument: chat.useDocument

})

}

handler.help = ['ytmp3','a'].map(v => 'yt' + v + ' <url>')

handler.tags = ['downloader']

handler.command = /^yt(a|mp3)$/i

handler.owner = false

handler.mods = false

handler.premium = false

handler.group = false

handler.private = false

handler.admin = false

handler.botAdmin = false

handler.fail = null

handler.exp = 0

handler.limit = true

module.exports = handler

async function shortlink(url){

isurl = /https?:\/\//.test(url)

return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''}
