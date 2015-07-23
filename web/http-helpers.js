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
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  // asset = filePath
  // What is callback? Gets the filePath and gets data to response
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
        // console.log("asset: ", asset)
        // console.log("STATUS CODE WRITTEN: ", statusCode)
        res.end(fileData);
        // console.log('files read')
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!