const express = require('express')
const path = require('path')
const fs = require('fs')
const status = require('./src/status')

const app = express()
const port = process.env.PORT || '3000'

const s = {
  ip: 'mine.servebeer.com',
  port: 25565
}

const page = {
  server: {
    address: s.ip,
    status: 'error',
    online: false,
    players: {
      max: 16,
      now: 0
    }
  }
}

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

function updateStatus() {
  status.get(s.ip, s.port, (data) => {
    page.server.players.now = data.players.now
    page.server.players.max = data.players.max
    page.server.online = data.online
    console.log(data);
  })
}

updateStatus()
setInterval(updateStatus, 30000)
