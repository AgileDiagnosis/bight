var chai = require('chai')
chai.should()

var Stream = require('stream')
var bight = require('../index')

describe('bight', function () {
  it('composes through streams and returns a composite through stream', function (done) {

    var split = require('split')
    var toUpper = require('toupper')
    var exclaim = require('through')(function (d) { this.queue(d + '!') })

    var superMode = bight(split(), toUpper())


    var input = 'rar\npunch'
    var source = new Stream()
    var next = function () {
      process.nextTick(function () {
        if (!input) {
          return source.emit('end', null)
        }
        var head = input[0]
        var input = input.substr(1)
        source.emit('data', head)
        next()
      })
    }

    var test = source.pipe(superMode)

    var expected = ['RAR!','PUNCH!']
    test.on('data', function (data) {
      data.should.equal(expected.shift())
    })
    test.on('end', done)
    test.on('error', done)

    next()

  })
})