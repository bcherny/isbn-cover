
cover = require '../isbn-cover'
fs = require 'fs'

cover 440234816, (img) ->

	console.log img

	fs.writeFileSync 'test.jpg', img

test.done()