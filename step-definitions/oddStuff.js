let { $, sleep } = require('./funcs');

module.exports = function () {

    let sleepTime=1000;
    this.Given(/^that I write "([^"]*)" in the search field$/, async function (independent) {
    let searchText = await $('input[placeholder= "Search IMDb"]');
    expect(searchText).to.exist;
    searchText.sendKeys(independent);
    await sleep(sleepTime);
  
  });


  this.Given(/^select to click on the  suggestion "([^"]*)"$/, async function (independentSpritAwards) {
    
  //let suggestion = await driver.findElement(By.partialLinkText(independentSpritAwards));
    //await suggestion.click();
    //await sleep(sleepTime);
    
  });

  this.Then(/^a search result shall include the category "([^"]*)"$/, async function (bestFemaleLead) {
  
   // await driver.wait(until.elementLocated(by.css('nominees-widget')));

    //console.log("framme")
    

  });


  this.When(/^clicking the picture on the winner "([^"]*)" I expect to be directed to her site$/, async function (winner) {
  });

}