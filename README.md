http-params
===

[![Build Status](https://travis-ci.org/jarofghosts/http-params.png?branch=master)](https://travis-ci.org/jarofghosts/http-params)

Easy access to http parameters.

## usage

````js
var http = require('http'),
    httpParams = require('http-params');

http.createServer(function (req, res) {
  httpParams.parse(req, function (err, params) {
    console.log(JSON.stringify(params));
  });
}).listen(7734);
````

For get and delete requests the query string object is parsed and returned, for post and put the form body is parsed and returned.

## license

MIT
