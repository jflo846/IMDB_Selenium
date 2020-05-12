let { $, sleep } = require('./funcs');

module.exports = function () {

  let sleepTime = 3000;

  this.Given(/^that I click the 'Most popular shows' link in the menu$/, async function () {
    let link = await driver.findElement(by.partialLinkText('Most Popular Shows'));
    await link.click();
    await sleep(sleepTime);
  });

  this.When(/^I choose to sort by IMDB rating$/, async function () {
    //Pick the dropdown menu
    await driver.wait(until.elementLocated(By.css('.seen-collection')));
    let dropDownLink = await driver.findElement(By.css('.lister-sort-by-label'));
    await dropDownLink.click();
    //Pick an option in the dropdown menu, in this case 
    //IMDB rating
    let dropDownChoice = await driver.findElement(By.css('option[value="ir:descending"]'));
    await dropDownChoice.click();
    await sleep(sleepTime);
  });

  this.Then(/^I should be able to se the (\d+) most popular tv shows$/, async function (topShows) {
    let numberOfShows = await $('.desc');
    let numberOfShowsText = await numberOfShows.getText();
    expect(numberOfShowsText).to.include(+topShows, 'Wrong amount of movies');
    await sleep(sleepTime);
  });

  this.Then(/^I expect "([^"]*)" to be one of them$/, async function (gameOfThrones) {
    let popularShows = await $('.lister')
    let popularShowsText = await popularShows.getText();
    expect(popularShowsText).to.include(gameOfThrones)
    await sleep(sleepTime);
  });

}