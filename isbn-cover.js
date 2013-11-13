(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory();
    }
    else if(typeof define === 'function' && define.amd) {
        define('isbn-cover', [], factory);
    }
    else {
        root['isbn-cover'] = factory();
    }
}(this, function() {
var isbncover, normalize, url;

url = function(isbn) {
  return "http://images.amazon.com/images/P/" + isbn;
};

normalize = function(isbn) {
  var length;
  isbn += '';
  if (isbn.length === 9) {
    isbn = '0' + isbn;
  }
  length = isbn.length;
  if (length !== 10 && length !== 13) {
    throw new Error("isbn-cover expects ISBNs to be 10 or 13 characters long, passed \"" + isbn + "\" (which is " + length + " characters long)");
  }
  return isbn;
};

isbncover = function(isbn, success, error) {
  var img, request, uri;
  if (success == null) {
    success = function() {};
  }
  if (error == null) {
    error = function() {};
  }
  uri = url(normalize(isbn));
  if (typeof window !== "undefined" && window !== null) {
    img = document.createElement('img');
    img.src = uri;
    img.onload = function() {
      return success(img);
    };
    return img.onerror = error;
  } else {
    request = require('request');
    return request(uri, function(err, res, img) {
      if (!err && res.statusCode === 200) {
        return success(img);
      } else {
        return error(err);
      }
    });
  }
};

    return isbncover;
}));
