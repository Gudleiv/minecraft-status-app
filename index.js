const express = require('express')
const path = require('path')
const server = require('./config.json')
const Query = require('./src/mcquery/app')

const app = express()
const port = process.env.PORT || '3000'

const page = {
  server: {
    address: server.ip,
    status: 'error',
    online: false,
    players: {
      max: '~',
      now: '~'
    }
  }
}

const q1 = new Query(server.ip, server.port)

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
setInterval(updateStatus, 5000)

function updateStatus() {
  const data = q1.getStatus()
  console.log(data);
  if (!data) {
    resetStatus()
    return
  }

  const {basic, full} = data
  page.server.online = true
  page.server.players.now = basic.numplayers
  page.server.players.max = basic.maxplayers
}

function resetStatus() {
  page.server.online = false
  page.server.players.now = '~'
  page.server.players.max = '~'
}