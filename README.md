isbn-cover
==========

Get a book cover from a 9, 10, or 13 digit ISBN. Works with AMD, CommonJS, Node, and browser globals.

## usage (browser)

```js
cover = window['isbn-cover'] // or use AMD `require`
isbn = 440234816

cover(isbn, function(img) {
	// `img` is an element, so:
	document.body.appendChild(img);
}, function (error) {
	...
});
```

## usage (node)

```js
cover = require('isbn-cover')
isbn = 440234816

cover(isbn, function(img) {
	// `img` is a data string
}, function (error) {
	...
});
```