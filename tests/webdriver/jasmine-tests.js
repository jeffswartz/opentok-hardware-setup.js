"use strict";

var express = require('express');
var assert = require('assert');
// var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');

// Set up test server:
var app = express();

app.use(express.static('.'));
var server = app.listen(3030);

// Start integration tests:
//jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
describe('basic test', function () {
	var browser;

	beforeEach(function(done) {
		browser = new webdriver.Builder()
			.usingServer()
			.withCapabilities({'browserName': 'firefox' })
			.build();
		browser.get('http://localhost:3030/index.html');
		browser.wait(function() {
			done();
		}, 10000);
	});

	afterEach(function() {
		browser.quit();
	});
/*
	it('loads the main element', function () {
		browser.wait(function() {
			return browser.isElementPresent(webdriver.By.className('opentok-hardware-setup-camera'));
		}, 10000)
		  .then(function() {
				console.log('sdfsdfsfss')
				browser.findElements(webdriver.By.className('opentok-hardware-setup'))
				  .then(function(elements) {
					  console.log('Found', elements.length, 'opentok-hardware-setup' );
					  assert('a' == 'a');
				});
			})
	})

	it('has correct sub-elements', function () {
		browser.findElements(webdriver.By.className('opentok-hardware-setup'))
		  .then(function(elements) {
			  console.log('Found', elements.length, 'opentok-hardware-setup' );
		});

		browser.wait(function() {
			return browser.isElementPresent(webdriver.By.className('opentok-hardware-setup-camera'));
		}, 10000);
		browser.findElements(webdriver.By.className('opentok-hardware-setup-camera'))
		  .then(function(elements){
			  console.log('Found', elements.length, 'opentok-hardware-setup-camera' )
		});
		browser.findElements(webdriver.By.className('opentok-hardware-setup-mic'))
		  .then(function(elements){
			  console.log('Found', elements.length, 'opentok-hardware-setup-mic' )
		});
		browser.findElements(webdriver.By.className('opentok-hardware-setup-selector'))
		  .then(function(elements) {
			  console.log('Found', elements.length, 'opentok-hardware-setup-selector' );
		});
	});
*/
	it('returns the selected microphone', function (done) {
		runs(function() {
			browser.wait(function() {
				return browser.isElementPresent(webdriver.By.className('opentok-hardware-setup-camera'));
			}, 10000)
			  .then(function() {
					var selectStr = '.opentok-hardware-setup-mic > .opentok-hardware-setup-selector > select';
	     		browser.findElements(webdriver.By.css(selectStr))
			     .then(function(elements) {
						 console.log('Found', elements.length, 'opentok-hardware-setup-selector' );
						 //console.log(elements[0])
					   elements[0].click();
						 var optionSelect = '> option:nth-child(3)';
						 browser.findElements(webdriver.By.css(selectStr + optionSelect)).then(function(elements) {
							 elements[0].click();
							 //elements[0].findElements(By.css(optionSelect)).click();
							 //selectStr = selectStr + ' > ' + optionSelect;
							 var script = 'var option = window.document.querySelector("' + selectStr + optionSelect + '");'
							   + 'option.selected = true;'
								 // + 'var selector = window.document.querySelector("' + selectStr + '");'
								 // + 'selector.value = option.value;'
							   + 'return component.audioSource().deviceId == option.value';
							 browser.executeScript(script)
							   .then(function (response) {
							     console.log('component.audioSource().deviceId == ', response);
								   if (response) {
									   done();
//										 assert(false);
									 } else {
										 assert(false);
									 }
						   });
						 })
		  	});
		  });
		});
		waitsFor(function() {
  			console.log('waited');
		    return done;
	}, "The Value should be incremented", 15000); 
	});
});
