"use strict";

var selenium = require('selenium-standalone');
var jasmine = require('jasmine');

selenium.install({
  // check for more recent versions of selenium here: 
  // https://selenium-release.storage.googleapis.com/index.html 
  version: '2.45.0',
  baseURL: 'https://selenium-release.storage.googleapis.com',
  drivers: {
    chrome: {
      // check for more recent versions of chrome driver here: 
      // https://chromedriver.storage.googleapis.com/index.html 
      version: '2.15',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    }
  },
  logger: function(message) {
    console.log('message: ', message)
  },
  progressCb: function(totalLength, progressLength, chunkLength) {
 
  }
}, function(error) {
	if (error) {
		console.log('error');
	} else {
		console.log('server strat');
	}
});

var express = require('express');
var webdriverio = require('webdriverio');

describe('my webdriverio tests', function() {
    var client = {};
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999999;

    beforeEach(function() {
        client = webdriverio.remote({ desiredCapabilities: {browserName: 'firefox'} });
        client.init();
    });

    it('test it', function(done) {
			client
			    .url('http://google.com')
			    .setValue('#q', 'webdriver')
			    .click('#btnG');
    });

    afterEach(function(done) {
        client.end(done);
    });
});

/*

var client = webdriverio.remote({
  host: 'localhost',
  port: 4444
});

client.init();

client
    .url('http://google.com')
    .setValue('#q', 'webdriver')
    .click('#btnG');

// Set up test server:
var app = express();

app.use(express.static('.'));
var server = app.listen(3030);

// Start integration tests:
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://localhost:3030/index.html');

browser.findElements(webdriver.By.className('opentok-hardware-setup')).then(function(elements){
	console.log('Found', elements.length, 'opentok-hardware-setup' );
	//assertEquals('a', ['a'][0]);
});

browser.wait(function() {
	return browser.isElementPresent(webdriver.By.className('opentok-hardware-setup-camera'));
}, 10000);
browser.findElements(webdriver.By.className('opentok-hardware-setup-camera')).then(function(elements){
	console.log('Found', elements.length, 'opentok-hardware-setup-camera' )
});
browser.findElements(webdriver.By.className('opentok-hardware-setup-mic')).then(function(elements){
	console.log('Found', elements.length, 'opentok-hardware-setup-mic' )
});
browser.findElements(webdriver.By.className('opentok-hardware-setup-selector')).then(function(elements) {
	console.log('Found', elements.length, 'opentok-hardware-setup-selector' );
	elements[0].click();
});
browser.quit();

/*
test.describe('Google Search', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();
  });

  test.after(function() {
    driver.quit();
  });

  test.it('should append query to title', function() {
    driver.get('http://www.google.com/ncr');
    driver.findElements(webdriver.By.name('q')).click().sendKeys('webdriver');
    driver.findElements(webdriver.By.name('btnG')).click();
    driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  });
});
*/