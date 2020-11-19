const express = require('express')
const path = require('path')
const server = require('./config.json')
const request = require('request');
const app = express()
const port = process.env.PORT || '3000'

const page = {
  server: {
    address: server.ip,
    online: false,
    players: {
      max: '~',
      now: '~'
    },
    mods: []
  }
}

const link = 'https://api.mcsrvstat.us/2/' + server.ip

app.listen(port)
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.render('index', page)
})

app.get("/mods", (req, res) => {
  console.log(`${new Date().toISOString()}: mods downloaded`)
  const file = `${__dirname}/files/mods.zip`
  res.download(file)
})

updateStatus()
setInterval(updateStatus, 10000)

function updateStatus() {
  request(link, (err, res, body) => {
    if (err) console.error(err)

    if (res && res.statusCode < 400) {
      const data = JSON.parse(body)
      if (data && data.online) {
        page.server.online = data.online
        page.server.players.now = data.players.online
        page.server.players.max = data.players.max
      }
    } else {
      resetStatus()
    }
  })
}

function resetStatus() {
  page.server.online = false
  page.server.players.now = '~'
  page.server.players.max = '~'
}
