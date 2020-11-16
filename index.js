const express = require("express")
const path = require("path")

const app = express()
const port = process.env.PORT || '3000'

const page = {
  server: {
    adress: 'mine.servebeer.com'
  }
}

app.listen(port)

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.render('index', page)
})

