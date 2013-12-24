var url = require('url')

exports.parse = parse

function parse(request, _callback) {
  var method = request.method.toLowerCase(),
      callback = _callback || function () {}

  if (method != 'post' && method != 'put') {
    return callback(null, url.parse(request.url, true).query)
  }

  var params = ''

  request.on('data', on_request)
  request.on('end', end_request)

  request.resume()

  function on_request(data) {
    params += data
    if (params.length > 1e6) {
      request.connection.destroy()
      callback(new Error('param size exceeded'))
    }
  }
 
  function end_request() {
    try {
      var result = JSON.parse(params)
    } catch (e) {
      return callback(e)
    }
    callback(null, result)
  }
}
