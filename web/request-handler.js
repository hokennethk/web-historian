var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('../web/http-helpers');
var fs = require('fs');
var url = require('url');

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var requestUrl = url.parse(req.url);
    var filePath = archive.paths.siteAssets + requestUrl.path;
    console.log(filePath);

    // for root url, serve index.html
    if (requestUrl.path === '/') {
      filePath = archive.paths.siteAssets + '/index.html';
    }

    helpers.serveAssets(res, filePath);
    
  }

  if (req.method === 'POST') {
    var urlReceived = '';

    req.on('data', function(chunk) {
      urlReceived += chunk;
    });

    req.on('end', function(){
      urlReceived = urlReceived.substr(4);
      // Check if url is in the list, use isUrlInList
      archive.readListOfUrls(function(sites) {
        archive.isUrlInList(urlReceived, sites, function(notInList) {
          if (notInList) {
            archive.addUrlToList('./archives/sites.txt', urlReceived, function() {
              // Not in the list go downloadUrls
              // Else fetch it from isUrlArchived 
              res.end();
            });
          } else {
            // in list
            console.log("URL ALREADY IN LIST")
            archive.isUrlArchived(urlReceived, function(result) {
              if (result) {
                console.log("URL is archived!")
                filePath = archive.paths.archivedSites + '/' + urlReceived;
                helpers.serveAssets(res, filePath);
              } else {
                // downloadURL???
                console.log("URL is not in archive")
              }
            });
          }
        });
      });

      // archive.addUrlToList('./archives/sites.txt', urlReceived, function() {
      //   res.end();
      // });
    // res.end()
    });
  }
  // res.end(archive.paths.list);
};