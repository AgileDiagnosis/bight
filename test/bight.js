var chai = require('chai')
chai.should()

var Stream = require('stream')
var bight = require('../index')

describe('bight', function () {
  it('composes through streams and returns a composite through stream', function (done) {

    var split = require('split')
    var through = require('through')
    var toUpper = through(function (d) { this.queue(d.toString().toUpperCase()) })
    var exclaim = through(function (d) { this.queue(d + '!') })


    var source = new Stream()

    var test = source.pipe(bight(split(), toUpper, exclaim))

    var expected = ['RAR!','PUNCH!']
    var chunks = 0
    test.on('data', function (data) {
      data.should.equal(expected.shift())
      chunks++
    })
    test.on('end', function () {
      chunks.should.equal(2)
      done()
    })
    test.on('error', done)

    source.emit('data', 'rar\npunch')
    source.emit('end')

  })
})