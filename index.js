var url = require('url')

module.exports = parse

function parse(request, _callback) {
  var method = request.method.toLowerCase()
    , callback = _callback || Function()
    , params = ''

  if(method !== 'post' && method !== 'put') {
    return callback(null, url.parse(request.url, true).query)
  }

  request.on('data', onData)
  request.on('end', endRequest)

  request.resume()

  function onData(data) {
    params += data

    if(params.length > 1e6) {
      request.connection.destroy()
      callback(new Error('param size exceeded'))
    }
  }
 
  function endRequest() {
    try {
      var result = JSON.parse(params)
    } catch(e) {
      return callback(e)
    }

    callback(null, result)
  }
}
