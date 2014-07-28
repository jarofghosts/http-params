http-params
===========

[![Build Status](http://img.shields.io/travis/jarofghosts/http-params.svg?style=flat)](https://travis-ci.org/jarofghosts/http-params)
[![npm install](http://img.shields.io/npm/dm/http-params.svg?style=flat)](https://www.npmjs.org/package/http-params)

Easy access to http parameters.

## usage

```js
var http = require('http')

var parse = require('http-params')

http.createServer(httpHandler).listen(7734)

function httpHandler(req, res) {
  parse(req, display)
  
  function display(err, params) {
    console.log(JSON.stringify(params))
  }
}
```

For GET and DELETE requests, the query string object is parsed and returned.
For POST and PUT requests, the form body is collected, parsed, and returned.

## license

MIT
