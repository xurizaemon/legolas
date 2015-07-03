'use strict';

const async = require('async'),
  cheerio = require('cheerio'),
  _ = require('lodash'),
  path = require('path'),
  request = require('request'),
  url = require('url'),
  md = require('html-md'),
  GitHub = require('github-api'),
  shagit = require('shagit'),
  http = require('http'),
  fs = require('fs'),
  baseURI = 'http://legislation.govt.nz',
  // crawlStart = '/subscribe/',
  /* For testing, just this year's public acts. */
  crawlStart = '/subscribe/act/public/2015',
  downloadPath = './pdfs/',
  retried = {};

const crawlQueue = async.queue(crawlSearch);
const importQueue = async.queue(importLegislation, process.env.IMPORT_QUEUE_SIZE || 1);
const downloadQueue = async.queue(downloadLegislation, process.env.DOWNLOAD_QUEUE_SIZE || 1);

crawlQueue.push(crawlStart);

function crawlSearch(path, callback) {
  request({
      uri: baseURI + path,
    }, function(err, response, body) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      else {
        const $ = cheerio.load(body);
        // console.log($);
        const links = $('a');

        _.each(links, function(a) {
          let path = url.parse($(a).attr('href')).pathname;
          if (path.match(/.*\.pdf$/)) {
            console.log('Adding PDF ' + path + ' to fetch queue.');
            downloadQueue.push(path);
          }
          else if (path.match(/.*\.xml$/)) {
            console.log('Adding XML ' + path + ' to import queue.');
            importQueue.push(path);
          }
          else if (!path.match(/^\/$/)) {
            console.log('Adding ' + path + ' to crawl queue.');
            crawlQueue.push(path);
          }
        });
      }
    }
  );
  callback();
}

function downloadLegislation(path, callback) {
  var m = false;
  if (m = path.match(/.*\/(.+?\.pdf)/)) {
    var fileUrl = baseURI + path;
    var fileName = downloadPath + m[1];
    var file = fs.createWriteStream(fileName);
    var request = http.get(fileUrl, function(response) {
      response.pipe(file);
      console.log('Saved ' + fileUrl + ' to ' + fileName);
    });
  }
  else {
    console.log('Did not recognise filename for ' + path);
  }
  callback();
}

function importLegislation(task, callback) {
  //var uri = task.uri;
  console.log(task);
  callback();
}
