await conn.sendFile(m.chat, global.API('xteam', '/quotemaker', { text: teks, wm: wm ? wm : conn.getName(m.sender) }, 'APIKEY'), 'file.jpg', 'done', m)

}

handler.help = ['quote'].map(v => v + 'maker <teks>|<wm>')

handler.tags = ['editor']

handler.tags = ['maker']

handler.command = /^quotemaker$/i

handler.limit = true
