const request = require('request');

exports.get = (ip, port = 25565, callback) => {
  const url = `https://mcapi.us/server/status?ip=${ip}&port=${port}`;
  request(url, { json: true }, (err, res, body) => {
      if (err) {
          callback(err)
          return
      }
      callback(body)
      return
  })
}
