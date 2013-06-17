var url = require('url');

exports.parse = function (request, callback) {
  var method = request.method.toLowerCase();

  if (method == 'get' || method == 'delete') {
    callback && callback(null, url.parse(request.url, true).query);
    return;
  }
                
  var params = '';

  request.on('data', function (data) {
    params += data;
    if (params.length > 1e6) {
      request.connection.destroy();
      callback && callback(true);
    }
  });
  
  request.on('end', function () {
    callback && callback(null, JSON.parse(params));
  });
};