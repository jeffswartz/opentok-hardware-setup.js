"use strict";

var express = require('express');
// var assert = require('assert');
// var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');

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