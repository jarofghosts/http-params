var assert = require('assert'),
  http = require('http'),
  querystring = require('querystring'),
  httpParams = require('../index.js');

var server = http.createServer(function (req, res) {
  httpParams.parse(req, function (err, params) {
    assert.ok(!err);
    assert.equal(params.hello, "world");
    if (req.method.toLowerCase() == 'get') {
      process.exit();
    }
  });
}).listen(7734);

var getData = querystring.stringify({ hello: "world" });

var postData = JSON.stringify({ hello: "world" });

var postOptions = {
  host: 'localhost',
  port: 7734,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var getOptions = {
  host: 'localhost',
  port: 7734,
  path: '/?' + getData
};

var postRequest = http.request(postOptions);
postRequest.write(postData);
postRequest.end();

http.get(getOptions);

