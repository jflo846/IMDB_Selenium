let { $, sleep } = require('./funcs');

module.exports = function () {

  let sleepTime = 5000;

  this.Given(/^that I am on the IMDB site$/, async function () {

    await helpers.loadPage('https://www.imdb.com');
    await sleep(sleepTime);
  });

  this.Given(/^I have pressed the menu\-button to extend all links to the site$/, async function () {

    let menuButton = await $('#imdbHeader-navDrawerOpen--desktop');
    await menuButton.click();
    await sleep(sleepTime);
  });

  this.When(/^I have clicked the 'Most popular celebs' link in the menu$/, async function () {
    let link = await driver.findElement(by.linkText('Most Popular Celebs'));
    await link.click();
    await sleep(sleepTime);

  });

  this.Then(/^I shall se a list of the most popular celebs on IMDB$/, async function () {

  });

  this.Then(/^Chris Hemsworth should be among top (\d+)$/, function (topCelebs) {

  });

}