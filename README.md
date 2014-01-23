http-params
====

[![Build Status](https://travis-ci.org/jarofghosts/http-params.png?branch=master)](https://travis-ci.org/jarofghosts/http-params)

Easy access to http parameters.

## usage

```js
var http = require('http'),
    parse = require('http-params')

http.createServer(function (req, res) {
  parse(req, function (err, params) {
    console.log(JSON.stringify(params))
  })
}).listen(7734)
```

For GET and DELETE requests, the query string object is parsed and returned.
For POST and PUT requests, the form body is collected, parsed, and returned.

## license

MIT
