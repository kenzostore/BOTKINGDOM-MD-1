let limit = 30

let yts = require('yt-search')

let fetch = require('node-fetch')

const canvas = require('canvacord')

const { servers, yta, ytv } = require('../lib/y2mate')

let handler = async (m, { conn, command, text, isPrems, isOwner }) => {

  if (!text) throw 'ඔබට අවශ්‍ය ගීතයේ නම'

  m.reply(`Mohon tunggu sebentar~`)

  let results = await yts(text)

  let vid = results.all.find(video => video.seconds < 3600)

  if (!vid) throw 'සොයා ගත නොහැක'

  let isVideo = /2$/.test(command)

  let { dl_link, thumb, title, filesize, filesizeF} = await (isVideo ? ytv : yta)(vid.url, 'id4')

  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize

const cardJoox = new canvas.Spotify()

                    .setAuthor(vid.author.name)

                    .setAlbum('YouTube')

                    .setStartTimestamp(vid.timestamp)

                    .setEndTimestamp(12)

                    .setImage(thumb)

                    .setTitle(title)

                cardJoox.build()

                    .then(async (buffer) => {

                    conn.sendFile(m.chat, buffer, '', `

*Title:* ${title}

*Filesize:* ${filesizeF}

${isLimit ? '*Download Link:* '+await bitly(dl_link): ''}

`,m )

                    })

      if (isVideo) {

   if (!isLimit) conn.sendMessage(m.chat, { video: await getBuffer(dl_link), caption: title }, { quoted: m, mimetype: 'video/mp4',  upload: conn.waUploadToServer })

   } else {

   if (!isLimit) conn.sendMessage(m.chat, { audio: await getBuffer(dl_link) }, { mimetype: 'audio/mp4', quoted: m,  upload: conn.waUploadToServer })

   }

}

handler.help = ['play3', 'play3'].map(v => v + ' <pencarian>')

handler.tags = ['downloader']

handler.command = /^play3?$/i

handler.exp = 0

handler.limit = true

handler.premium = false

module.exports = handler

async function getBuffer(url) {

ff = await fetch(url)

fff = await ff.buffer()

return fff

}

async function bitly(urls) {

fet = require('axios')

heh = await fet.get(`https://tobz-api.herokuapp.com/api/bitly?url=${urls}&apikey=Tobzzz17`)

return heh.data.result

}
