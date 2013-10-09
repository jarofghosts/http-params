var url = require('url')

exports.parse = parse

function parse(request, callback) {
  var method = request.method.toLowerCase()

  if (method != 'post' && method != 'put') {
    return callback && callback(null, url.parse(request.url, true).query)
  }
                
  var params = ''

  request.on('data', function (data) {
    params += data
    if (params.length > 1e6) {
      request.connection.destroy()
      callback && callback(new Error('param size exceeded'))
    }
  })
  
  request.on('end', function () {
    try {
      var result = JSON.parse(params);
    } catch (e) {
      return callback && callback(e);
    }
    callback && callback(null, result)
  })

  request.resume()
}

