const Query = require('./lib')

class OneQuery extends Query{
  
  constructor(HOST, PORT) {
    super(HOST, PORT)
    this._stats = {
      full: undefined,
      basic: undefined
    }
    this.updateStatus()
  }

  getStatus() {
    if (this._stats.full === undefined || this._stats.basic === undefined) {
      return 0
    }
    return this._stats
  }

  updateStatus() {
    this.connect()
    .then(() => {
      this.basic_stat((err, stat) => {
        if (err) console.error(err)
        this._stats.basic = stat
      })
      this.full_stat((err, stat) => {
        if (err) console.error(err)
        this._stats.full = stat
      })
      //this.full_stat(fullStatBack.bind(this))
    })
    .then(() => {
      this.shouldWeClose()
    })
    .catch(err => {
      console.error('Error connecting', err)
    })
  }
  
  shouldWeClose () {
    if (this.outstandingRequests === 0) {
      this.close()
    }
  }
  
}

 function basicStatBack (err, stat) {
    if (err) {
      console.error(err)
    }
    this._stats.basic = stat
    this.shouldWeClose()
  }
  
 function fullStatBack (err, stat) {
    if (err) {
      console.error(err)
    }
    this._stats.full = stat
    this.shouldWeClose()
  }

module.exports = OneQuery
