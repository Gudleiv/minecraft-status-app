const Query = require('./lib')

const HOST = process.env.MC_SERVER || 'mine.servebeer.com'
const PORT = process.env.MC_PORT || 25565

const query = new Query(HOST, PORT, { timeout: 10000 })

function checkMcServer () {
  query.connect(function (err) {
    if (err) {
      console.error(err)
    } else {
      query.full_stat(fullStatBack)
    }
  })
}

function fullStatBack (err, stat) {
  if (err) {
    console.error(err)
  }
  console.log('%s>fullBack \n', new Date(), stat)
}

setInterval(function () {
  checkMcServer()
}, 5000)
