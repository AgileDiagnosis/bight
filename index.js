var Stream = require('stream')

function bight(streams) {
  if (!Array.isArray(streams)) {
    streams = Array.prototype.slice.call(streams)
  }
  if (!(this instanceof bight)) {
    return new bight(streams)
  }

  var inStream = new Stream()
  inStream.writable = true
  inStream.readable = true
  inStream.write = function (data) {
    inStream.emit('data', data)
  }
  inStream.end = function (data) {
    inStream.emit('end', typeof data === 'undefined' ? null : data)
  }

  return streams.reduce(function (prev, next) {
    return prev.pipe(next)
  }, inStream)
}

module.exports = bight