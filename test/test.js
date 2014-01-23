var assert = require('assert'),
    http = require('http'),
    querystring = require('querystring'),
    parse = require('../')

var server = http.createServer(function (req, res) {
  parse(req, function (err, params) {
    assert.ok(!err)
    assert.equal(params.hello, 'world')
    if (req.method.toLowerCase() === 'get') {
      process.exit()
    }
  })
}).listen(7734)

var get_data = querystring.stringify({ hello: 'world' })

var post_data = JSON.stringify({ hello: 'world' })

var post_options = {
  host: 'localhost',
  port: 7734,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': post_data.length
  }
}

var get_options = {
  host: 'localhost',
  port: 7734,
  path: '/?' + get_data
}

var post_request = http.request(post_options)
post_request.write(post_data)
post_request.end()

http.get(get_options)
