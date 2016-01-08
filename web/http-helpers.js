var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  var extname = path.extname(asset);
  var contentType = 'text/html';
  if (extname === '.css') {
    contentType = 'text/css';
  }
  var statusCode = 200;

  if (callback) {
    var statusCode = 302;
  }

  fs.exists(asset, function(exists) {
    if (exists) {
      fs.readFile(asset, function(err, fileData) {
        if (err) {
          throw err;
        }
        res.writeHead(statusCode, {'Content-Type' : contentType});
        res.end(fileData);
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  });
};

