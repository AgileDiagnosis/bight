var Stream = require('stream')

function bight(streams) {

  if (!Array.isArray(streams)) {
    streams = Array.prototype.slice.call(arguments)
  }

  if (!(this instanceof bight)) {
    return new bight(streams)
  }

  var inStream = new Stream()
  inStream.writable = true
  inStream.readable = true
  inStream.write = function (data) {
    innerStream.emit('data', data)
  }
  inStream.end = function (data) {
    inStream.writable = false
    innerStream.emit('end', typeof data === 'undefined' ? null : data)
  }

  var innerStream = new Stream()
  innerStream.writable = true
  innerStream.readable = true
  innerStream.write = function (data) {
    inStream.emit('data', data)
  }
  innerStream.end = function (data) {
    innerStream.writable = false
    inStream.emit('end', typeof data === 'undefined' ? null : data)
  }

  var end = streams.reduce(function (prev, next) {
    return prev.pipe(next)
  }, innerStream).pipe(innerStream)

  return inStream
}

module.exports = bight