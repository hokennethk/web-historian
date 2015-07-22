var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(path, callback){
  // path is './archives/sites.txt'
  fs.readFile(path, function(err, sites) {
    if (err) {
      throw err;
    }
    // console.log(sites.toString());
    callback(sites);
  })
};

exports.isUrlInList = function(url, list, callback){
  // see if url is in list
    if (list.toString().indexOf(url) === -1) {
      // if not, callback should be to addUrlToList to add to list
      callback();
    }

    // chec 
};

exports.addUrlToList = function(pathToWrite, url, callback){
  var dataToWrite = url + '\r\n';
  fs.appendFile(pathToWrite, dataToWrite, function(err) {
    if (err) {
      throw err;
    }
    if (callback) {
      // if not in the list, then call downloadUrls
      callback();
    }
  });
};

exports.isUrlArchived = function(){
};

exports.downloadUrls = function(){
};
