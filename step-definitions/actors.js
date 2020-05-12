let { $, sleep } = require('./funcs');

module.exports = function () {

  let sleepTime = 5000;
  let celebs;
  

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
    
    let celebName = await driver.findElement(By.css('.lister-item-header')).getText();
    let celebsNumber= celebName.slice(0, 1);
    expect(celebsNumber).to.equal('1');

  });

  this.Then(/^since I love Chris Hemsworth I want to make sure he is on the list$/, async function () {
    
    celebs = await driver.findElement(By.linkText('Chris Hemsworth')).getText();
    expect(celebs).to.equal('Chris Hemsworth');

  });

}