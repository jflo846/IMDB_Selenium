let {$, sleep} = require('./funcs');

module.exports = function () {
  
  let sleepTime = 3000;
 
  this.Given(/^I have pressed the All\-button to extend all search options availible$/, async function () {
    let allButton = await driver.findElement(By.xpath('//html/body/div[1]/nav/div[2]/div[1]/form/div[1]/div/label'));
    await allButton.click();
    await sleep(sleepTime);
  });
  
  this.Given(/^that I choose 'Advanced Search' in the searchbar drop-down menu$/, async function () {
    let advancedButton = await driver.findElement(By.xpath('//html/body/div[1]/nav/div[2]/div[1]/form/div[1]/div/div/div/span/ul/a[7]'));
    await advancedButton.click();
    await sleep(sleepTime);
  });

  this.Given(/^that I choose 'Advanced Title Search'$/, async function () {
    let advancedTitleButton = await driver.findElement(By.xpath('//html/body/div[3]/div/div[2]/div/div[2]/div[1]/a'));
    await advancedTitleButton.click();
    await sleep(sleepTime);
  });

  this.When(/^I choose 'Animated' under the headline Genres$/, async function () {
    let checkBox = await driver.findElement(By.xpath('//*[@id="genres-3"]'));
    checkBox.click();
  });

  this.When(/^'Japan' within Countries$/,async function () {
    let countryCheckBox = await driver.findElement(By.xpath('//html/body / div[3] / div[1] / div[2] / div[3] / form / div / div[13] / div[2] / select / option[117]'));
    countryCheckBox.click();
  });

  this.When(/^pick 'Japanese' within 'Languages'$/,async function () {
    let languageCheckBox = await driver.findElement(By.xpath('//html/body/div[3]/div[1]/div[2]/div[3]/form/div/div[15]/div[2]/select/option[124]'));
    languageCheckBox.click();
  });

  this.When(/^I click the search button on the bottom of the page$/, async function () {
    let searchButton = await driver.findElement(By.xpath('//html/body/div[3]/div[1]/div[2]/div[3]/form/div/p[3]/button'));
    searchButton.click();
    await sleep(sleepTime);
  });
  
  this.Then(/^I expect to find 'Spirited Away' in the results$/, async function () {
    let searchResult = await driver.findElement(By.linkText('Spirited Away')).getText();
    expect(searchResult).to.equal('Spirited Away');
    
  });

}
