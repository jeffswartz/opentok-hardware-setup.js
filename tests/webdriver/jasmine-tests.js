'use strict';

var express = require('express');
var assert = require('assert');
// var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');

// Set up test server:
var app = express();

app.use(express.static('.'));
app.listen(3030);

describe('jasmine test sample', function() {
	var browser;
	var passedTest;
	var done;

	browser = new webdriver.Builder()
		.usingServer()
		.withCapabilities({'browserName': 'firefox' })
		.build();
		browser.get('http://localhost:3030/index.html');

  beforeEach(function() {
	  passedTest = false;
	  done = false;
  });
/*
  it('has audioSource() initially return the default mic', function () {
		browser.wait(function() {
			return browser.isElementPresent(webdriver.By.className('opentok-hardware-setup-mic'));
		}, 5000)
		  .then(function() {
				var selectStr = '.opentok-hardware-setup-mic > .opentok-hardware-setup-selector > select' +
				  ' > option:nth-child(0)';
				var script = 'var option = window.document.querySelector("' + selectStr + '");' +
				  'option.selected = true;' +
				  'return component.audioSource().deviceId == option.value';
				 browser.executeScript(script)
				   .then(function (response) {
						 console.log('foo')
					   passedTest = response;
						 done = true;
				});
			});
    waitsFor(function() {
      return done;
    });

    runs(function() {
      assert(passedTest);
    });
  });
*/

	it('has audioSource() return to the selected microphone', function () {
		browser.wait(function() {
			return browser.isElementPresent(webdriver.By.className('opentok-hardware-setup-mic'));
		}, 5000)
		  .then(function() {
				var selectStr = '.opentok-hardware-setup-mic > .opentok-hardware-setup-selector > select';
     		browser.findElements(webdriver.By.css(selectStr))
		     .then(function(elements) {
				   elements[0].click();
					 selectStr = selectStr + ' > option';
					 browser.findElements(webdriver.By.css(selectStr)).then(function(elements) {
						 elements[elements.length - 1].click();
						 selectStr = selectStr + ':nth-child(' + elements.length + ')';
						 var script = 'var option = window.document.querySelector("' + selectStr + '");' +
						   'option.selected = true;' +
						   'return component.audioSource().deviceId == option.value';
						 browser.executeScript(script)
						   .then(function (response) {
							   passedTest = response;
								 done = true;
					   });
					 });
				});
			});

    waitsFor(function() {
      return done;
    });

    runs(function() {
      assert(passedTest);
    });
  });

	it('has videoSource() return the selected camera', function () {
		browser.wait(function() {
			return browser.isElementPresent(webdriver.By.className('opentok-hardware-setup-camera'));
		}, 5000)
		  .then(function() {
				var selectStr = '.opentok-hardware-setup-camera > .opentok-hardware-setup-selector > select';
     		browser.findElements(webdriver.By.css(selectStr))
		     .then(function(elements) {
				   elements[0].click();
					 selectStr = selectStr + ' > option';
					 browser.findElements(webdriver.By.css(selectStr)).then(function(elements) {
						 elements[elements.length - 1].click();
						 selectStr = selectStr + ':nth-child(' + elements.length + ')';
						 var script = 'var option = window.document.querySelector("' + selectStr + '");' +
						   'option.selected = true;' +
						   'return component.videoSource().deviceId == option.value';
						 browser.executeScript(script)
						   .then(function (response) {
							   passedTest = response;
								 done = true;
					   });
					 });
				});
			});

    waitsFor(function() {
      return done;
    });

    runs(function() {
      assert(passedTest);
    });
  });

	it('tear down for tests (afterAll)', function () {
	  	browser.quit();
	});


});
