# bight
inject and compose through streams into a pipeline

"In knot tying, a bight is a curved section or slack part between the two ends of a rope, string, or yarn." - [Wikipedia](http://en.wikipedia.org/wiki/Bight_(knot))

## installation

    $ npm install bight

## usage

    var bight = require('bight')

now get some through (duplex) streams:

    var split = require('split')
    var toUpper = require('toupper')

    var superMode = bight(split(), toUpper())

now we can pass this pipeline around an' stuff:

    module.exports = function () {
      return bight(split(), toUpper())
    }

    process.stdin.pipe(superMode).pipe(process.stdout)

`bight` is a constructor and can be called with or without `new`. Give it either an array of streams

    bight([stream1, stream2])

or multiple stream arguments

    bight(stream1, stream2)

## contributors

jden <jason@denizac.org>

## license

MIT. (c) 2013 Agile Diagnosis, Inc. See LICENSE.md
