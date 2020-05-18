let { $, sleep } = require('./funcs');

module.exports = function () {

  let sleepTime=0;
  let searchText;
  
    this.Given(/^that I write "([^"]*)" in the search field$/, async function (independent) {
    searchText = await $('input[placeholder= "Search IMDb"]');
    expect(searchText).to.exist;
    searchText.sendKeys(independent);
    await sleep(sleepTime);
  });

  this.Given(/^use arrow to getdown two steps and select the suggestion Independent Spirit Awards with enter$/, async function () {
    await driver.wait(until.elementLocated(by.css('div[aria-expanded="true"]')));
    let searchReady = await driver.findElement(by.css('input[name="q"]'));
    expect(searchReady).to.exist;   
    await searchReady.sendKeys(selenium.Key.ARROW_DOWN);
    await searchReady.sendKeys(selenium.Key.ENTER);
    await sleep(sleepTime);
  });

  this.Then(/^a search result shall include the category "([^"]*)"$/, async function (bestFemaleLead) { 
    await driver.wait(until.elementLocated(by.css('.event-widgets__award-category-name')));
    let categories=await driver.findElements(by.css('.event-widgets__award-category-name'));

    let search;
    for(let cat of categories) {
      let catWithText=await cat.getText()
      if(catWithText===bestFemaleLead) {
        search=true; 
        break;}
  
      else {
        search=false;}
      }
    expect(search, 'Did not find the category ' + bestFemaleLead).to.be.true; 
   
    await driver.wait(until.elementLocated(by.css('img[alt="Renée Zellweger"]')));
    await sleep(sleepTime);
  });

  this.When(/^clicking the picture on the winner "([^"]*)" I expect to be directed to her site$/, async function (winner) { 
    let pictureToClick=await driver.findElement(by.css('img[alt="Renée Zellweger"]'));
    await pictureToClick.click();
    await driver.wait(until.elementLocated(by.css('.header')));
    let wishedName=await driver.findElement(by.css('.header')).getText();
    expect(wishedName).to.equal(winner, 
    'Sorry you are on the wrong page');
});

}