let { $, sleep } = require('./funcs');

module.exports = function () {

  let sleepTime = 0;
  let resultLinks;
  let movieList=[];

  this.Given(/^I have pressed the All\-button to extend all search options availible$/, async function () {
    let allButton = await $('label.ipc-button:nth-child(1) > div:nth-child(1)')
    allButton.click();
    await sleep(sleepTime);
  });

  this.Given(/^that I choose 'Advanced Search' in the searchbar drop \- down menu$/, async function () {
    let advancedButton = await driver.wait(until.elementLocated(By.linkText('Advanced Search')));
    await advancedButton.click();
    await sleep(sleepTime);
  });

  this.Given(/^that I choose 'Advanced Title Search'$/, async function () {
    let advancedTitleButton = await driver.findElement(By.linkText('Advanced Title Search'));
    await advancedTitleButton.click();
    await sleep(sleepTime);
  });

  this.When(/^I choose 'Animation' under the headline 'Genres'$/, async function () {
    let checkBox = await driver.findElement(By.id('genres-3'));
    checkBox.click();
  });

  this.When(/^'Japan' within 'Countries'$/, async function () {
    let countryCheckBox = await driver.findElement(By.css('.countries > option:nth-child(117)'));
    countryCheckBox.click();
  });

  this.When(/^pick 'Japanese' within 'Languages'$/, async function () {
    let languageCheckBox = await driver.findElement(By.css('.languages > option:nth-child(124)'));
    languageCheckBox.click();
  });

  this.When(/^I click the search button on the bottom of the page$/, async function () {
    let searchButton = await $('.primary');
    searchButton.click();
    await sleep(sleepTime);
  });

  this.Then(/^I expect to find 'Spirited Away' in the results$/, async function () {
    await driver.wait(until.elementLocated(by.css('.lister-item-content')));
    let searchResult = await driver.findElement(By.linkText('Spirited Away')).getText();
    expect(searchResult).to.equal('Spirited Away');
  });

  this.Given(/^that I choose 'Keywords' in the searchbar drop\-down menu$/, async function () {
    await driver.wait(until.elementLocated(by.css('a[role="menuitem"]')));
    await driver.findElement(By.linkText('Keywords')).click();
    await sleep(sleepTime);
  });

  this.Given(/^that I type in 'film\-noir' in the searchfeild$/, async function () {
    let searchText = await $('input[placeholder= "Search IMDb"]');
    searchText.sendKeys('film-noir');
    await sleep(sleepTime);
  });

  this.When(/^I click on the search button$/, async function () {
    let searchButton = await $('#suggestion-search-button');
    assert(searchButton, 'There is no search-button');
    await searchButton.click();
  });

  this.Then(/^I should get searchresults including 'film\-noir'$/, async function () {
    resultLinks = await $('.result_text');
    let linkName = resultLinks[0];
    let linkNameIncludes = await linkName.getText();
    expect(linkNameIncludes).to.include('film-noir', 'theres no such movies here');
    await sleep(sleepTime);
  });

  this.Then(/^if I click on the link named 'film\-noir\-style'$/, async function () {
    await driver.findElement(By.linkText('film-noir-style')).click();
    await sleep(sleepTime);
  });

  this.Then(/^I expect to find 'Changelings' in the search result$/, async function () {
    let searchResult = await driver.findElement(By.linkText('Changelings')).getText();
    expect(searchResult).to.equal('Changelings');
    await sleep(sleepTime);
  });

  this.Given(/^write "([^"]*)" in the searchfield, I should see different search result, among them f\-rated which I click$/, async function (fRated) {
    let lookUp = await $('input[placeholder= "Search IMDb"]');
    await lookUp.sendKeys(fRated);
    await lookUp.sendKeys(selenium.Key.ENTER);
    await sleep(sleepTime);
    await driver.wait(until.elementLocated(by.css('.result_text')));
    let linkToClick = await driver.findElement(By.linkText('f-rated'));
    await linkToClick.click();
    await sleep(sleepTime);
  });

  this.When(/^I select the topic Genres$/, async function () {
    await driver.wait(until.elementLocated(by.css('div.faceter.nojs-hidden.open > div.faceter-content')));
    let toClick=await driver.findElements(by.css('.faceter-category'));
    await toClick[1].click();    
    await sleep(sleepTime);
  });

  this.When(/pick Music and Family/, async function () {
    let musicCheckBox = await driver.findElement(by.css('div.faceter-fieldset.genres > fieldset > span:nth-child(10)'));
    await musicCheckBox.click();
    let element=await driver.wait(until.elementLocated(by.css('.header')));
    await driver.wait(until.elementTextContains(element, 'Music'));
    let familyCheckBox = await driver.findElement(by.css('div.faceter-fieldset.genres > fieldset > span:nth-child(8)'));
    await familyCheckBox.click();
    await sleep(sleepTime);
  });

  this.Then(/^I expect to find 'Jackie & Ryan' among the search results$/, async function () {
    let element=await driver.wait(until.elementLocated(by.css('.header')));
    await driver.wait(until.elementTextContains(element, 'Family'));
    let movieList=await driver.findElement(by.partialLinkText('Ryan'));
    expect(movieList).to.exist;
  });
}