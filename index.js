var url = require('url');

exports.parse = function (request, callback) {
  var method = request.method.toLowerCase();

  if (method != 'post' && method != 'put') {
    return callback && callback(null, url.parse(request.url, true).query);
  }
                
  var params = '';
  request.resume();
  request.on('data', function (data) {
    params += data;
    if (params.length > 1e6) {
      request.connection.destroy();
      callback && callback({ error: 'param size exceeded' });
    }
  });
  
  request.on('end', function () {
    callback && callback(null, JSON.parse(params));
  });
};

