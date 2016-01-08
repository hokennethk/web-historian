var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('http-request');

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback){
  // path is './archives/sites.txt'
  fs.readFile(exports.paths.list, function(err, sites) {
    if (err) {
      throw err;
    }
 
    callback(sites.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, callback){
  // see if url is in list

    // call exports.readListOfUrls..
    exports.readListOfUrls(function(arr) {
      if (arr.indexOf(url) === -1) {
        // if not, callback should be to addUrlToList to add to list
        callback(true);
      } else {
        // call isUrlArchived to send file for that url
        callback(false);
      }
    });
};

exports.addUrlToList = function(url, callback){
  console.log("URLS: ", url)
  var dataToWrite = url + '\n';
  fs.appendFile(exports.paths.list, dataToWrite, {'encoding': 'utf8'},  function(err) {
    if (err) {
      throw err;
    }
    if (callback) {
      // if not in the list, then call downloadUrls
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback){
  // Serve the file in archives/sites
  fs.readdir(exports.paths.archivedSites, function(err, files){
    if (err) {
      throw err;
    }
    if (files.indexOf(url) !== -1) {
      callback(true);
    } else {
      callback(false);
    }
  })
};

exports.downloadUrls = function(urls){
  for (var i=0; i<urls.length; i++) {
    if (!urls[i]) {
      continue;
    }
    request.get({
      url: urls[i], 
      progress: function (current, total) {
        console.log('downloaded %d bytes from %d', current, total);
    }
    }, exports.paths.archivedSites +'/' + urls[i], function(err, res) {
      if (err) throw err;
    });
  }
};
