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
  fse = require('fs-extra'),
  fs = require('fs'),
  xml2js = require('xml2js'),
  drupal = require('drupal-services-api'),
  baseURI = 'http://legislation.govt.nz',
  // crawlStart = '/subscribe/',
  /* For testing, just this year's public acts. */
  crawlStart = '/subscribe/act/public/2015',
  downloadPath = './pdfs',
  storeUrl = 'http://legolas.nz/rest/',
  retried = {};

const crawlQueue = async.queue(crawlSearch);
const importQueue = async.queue(importLegislation, process.env.IMPORT_QUEUE_SIZE || 1);
const downloadQueue = async.queue(downloadLegislation, process.env.DOWNLOAD_QUEUE_SIZE || 1);

const client = new drupal('http://legolas.nz/rest');
client.login(process.env.DRUPAL_USER, process.env.DRUPAL_PASSWORD).then(function(user) {
  if (client.isLoggedIn()) {
    console.log('Logged in.');
    crawlQueue.push(crawlStart);
  }
});

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
  if (m = path.match(/\/subscribe\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.+?\.pdf)/)) {
    var fileUrl = baseURI + path;
    var fileName = m[6];
    m = m.slice(1, 6);
    m.unshift(downloadPath);
    var filePath = m.join('/');
    fse.mkdirs(filePath, function (err) {
      if (err) return console.error(err);
      var file = fs.createWriteStream([filePath, fileName].join('/'));
      request.get(fileUrl)
        .on('error', function(err) {
          console.log(err);
        })
        .pipe(file);
      //console.log(body);
      console.log('Saved ' + fileUrl + ' to ' + fileName);
    });
  }
  else {
    console.log('Did not recognise filename for ' + path);
  }
  callback();
}

function importLegislation(path, callback) {
  var m = false;
  if (m = path.match(/\/subscribe\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.+?\.xml)/)) {
    var fileUrl = baseURI + path;
    var fileName = m[6];
    m = m.slice(1, 6);
    m.unshift(downloadPath);
    var filePath = m.join('/');
    fse.mkdirs(filePath, function (err) {
      if (err) return console.error(err);
      var file = fs.createWriteStream([filePath, fileName].join('/'));
      request.get(fileUrl, function(err, response, body) {
        client.create({
          type: 'act',
          title: 'Some act with body',
          body: {
            und: [{
              value: body,
              format: 'filtered_html'
            }]
          },
          field_source_xml: {
            und: [{
              value: body
            }]
          }
        }).then(function(newAct) {
          client.retrieve(newAct.nid).then(function(retrievedAct) {
            console.log(retrievedAct, 'new article');
            console.log(retrievedAct.body);
          });
        });
      })
        .on('error', function(err) {
          console.log(err);
        })
        .pipe(file);
      return;
      console.log('Saved ' + fileUrl + ' to ' + fileName);
    });
  }
  else {
    console.log('Did not recognise filename for ' + path);
  }
  callback();
}
