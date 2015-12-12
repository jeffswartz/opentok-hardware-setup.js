/*
* How many /wiki links are on the /wiki page.
*/

"use strict";

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('https://2c53be92.ngrok.com/hardware-setup/');

console.log('start');
browser.findElements(webdriver.By.className('opentok-hardware-setup')).then(function(elements){
	console.log('Found', elements.length, 'opentok-hardware-setup' )
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
browser.quit();

/***

test.describe('Google Search', function() {
  var driver;

  test.before(function() {
    driver = new firefox.Driver();
  });

  test.after(function() {
    driver.quit();
  });

  test.it('should append query to title', function() {
    driver.get('http://www.google.com/ncr');
    driver.findElement(By.name('q')).sendKeys('webdriver');
    driver.findElement(By.name('btnG')).click();
    driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  });
});
*/