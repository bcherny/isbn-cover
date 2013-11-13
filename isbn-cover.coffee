
url = (isbn) ->
	"http://images.amazon.com/images/P/#{isbn}"

normalize = (isbn) ->

	# coerce to string
	isbn += ''

	# convert SBN to ISBN?
	if isbn.length is 9
		isbn = '0' + isbn

	length = isbn.length

	# check for length
	if length isnt 10 and length isnt 13
		throw new Error """
			isbn-cover expects ISBNs to be 10 or 13 characters long, passed "#{isbn}" (which is #{length} characters long)
		"""

	isbn

isbncover = (
	isbn,
	success = ->,
	error = ->
) ->

	uri = url normalize isbn

	# environment: browser
	if window?

		img = document.createElement 'img'
		img.src = uri
		img.onload = -> success img
		img.onerror = error

	# environment: node
	else

		request = require 'request'
		request uri, (err, res, img) ->
			if not err and res.statusCode is 200
				success img
			else
				error err