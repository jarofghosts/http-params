http-params
===

pass in an http request and get back your params

## usage

````js
var http = require('http'),
  params = require('http-params');

http.createServer(function (req, res) {
  params.parse(req, function (err, params) {
    console.log(JSON.stringify(params));
  });
});
````

For get and delete requests the query string object is parsed and returned, for post and put the form body is parsed and returned. Both are returned as a JSON object.
