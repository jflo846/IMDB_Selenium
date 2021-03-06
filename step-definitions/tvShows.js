let { $, sleep } = require('./funcs');

module.exports = function () {

  let sleepTime = 2000;

  this.Given(/^that I click the 'Most popular shows' link in the menu$/, async function () {
    await driver.wait(until.elementLocated(By.css('div[role="presentation"]')));
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
    await driver.wait(until.elementLocated(By.css('.desc')));
    let numberOfShows = await $('.desc');
    let numberOfShowsText = await numberOfShows.getText();
    expect(numberOfShowsText).to.include(+topShows, 'Wrong amount of movies');
    await sleep(sleepTime);
  });

  this.Then(/^I expect "([^"]*)" to be one of them$/, async function (gameOfThrones) {
    await driver.wait(until.elementLocated(By.css('.lister')));
    let popularShows = await $('.lister')
    let popularShowsText = await popularShows.getText();
    expect(popularShowsText).to.include(gameOfThrones, 'Correct show was not included')
    await sleep(sleepTime);
  });

  this.Given(/^that I click the 'Top Rated Shows' link in the menu$/, async function () {
    await driver.wait(until.elementLocated(By.css('div[role="presentation"]')));
    let ratedShowLink = await driver.findElement(by.partialLinkText('Top Rated Shows'));
    await ratedShowLink.click();
    await sleep(sleepTime);
  });

  this.When(/^I choose to sort by release date by descending order$/, async function () {
    await driver.wait(until.elementLocated(By.css('.seen-collection')));
    let dropDownLink = await driver.findElement(By.css('.lister-sort-by-label'));
    await dropDownLink.click();
    let dropDownChoice = await driver.findElement(By.css('option[value="us:descending"]'));
    await dropDownChoice.click();
    let descendingOrder = await driver.findElement(By.css(('[title^="Descending order"]')));
    await descendingOrder.click();
    await sleep(sleepTime);
  });

  this.Then(/^I should see the oldest tv\-show "([^"]*)" on the list$/, async function (numberOne) {
    await driver.wait(until.elementLocated(By.css('.secondaryInfo')));

    let firstElement = await driver.findElement(By.css(".titleColumn")).getText();
    expect(firstElement, 'Correct show was not displayed').to.include(numberOne);
    let elements = await driver.findElements(By.css(".titleColumn > span"));
    let years = [];
    for (let element of elements) {
      years.push(+(await element.getText()).split('(')[1].split(')')[0]);
    }
    let wrongYears = years.filter(x => x < years[0]);
    expect(wrongYears,
      'Years before ' + years[0] + ' found later in list.'
    ).to.be.empty;
    await sleep(sleepTime);
  });

  this.Given(/^that I click the 'Browse TV Shows by Genre' link in the menu$/, async function () {
    await driver.wait(until.elementLocated(By.css('div[role="presentation"]')));
    let link = await driver.findElement(by.partialLinkText('Browse TV Shows by Genre'));
    await link.click();
    await sleep(sleepTime);
  });

  this.When(/^I scroll down the page to the section 'Popular TV Shows by Genre'$/, async function () {
    //Gets done in the next step
  });

  this.When(/^choose 'Talk Show' for tv\-shows I want to see$/, async function () {
    await driver.wait(until.elementLocated(By.css('div[role="presentation"]')));
    let link = await driver.findElement(by.partialLinkText('Talk Show'));
    await link.click();
    await sleep(sleepTime);
  });

  this.Then(/^I should se a list of the most popular talk shows$/, async function () {
    //Nothing to test here
  });

  this.Then(/^that "([^"]*)" is one of them$/, async function (talkShow) {
    await driver.wait(until.elementLocated(By.css('.lister-list')));
    let specificShow = await driver.findElement(by.partialLinkText(talkShow));
    expect(specificShow, 'Correct show did not exist. Expected: ' + specificShow).to.exist;
    await sleep(sleepTime);
  });

  this.Given(/^that I click on 'Top rated Shows'$/, async function () {
    await driver.wait(until.elementLocated(By.css('div[role="presentation"]')));
    let ratedShowLink = await driver.findElement(by.partialLinkText('Top Rated Shows'));
    await ratedShowLink.click();
    await sleep(sleepTime);
  });

  this.When(/^I click on "([^"]*)" in the list$/, async function (breakingBad) {
    await driver.wait(until.elementLocated(By.css('.lister')));
    let breakingBadShow = await driver.findElement(by.partialLinkText(breakingBad));
    expect(breakingBadShow, 'Correct show did not exist. Expected: ' + breakingBad).to.exist;
    await breakingBadShow.click();
    await sleep(sleepTime);
  });

  this.When(/^I have been redirected to the page about that show$/, async function () {
    await driver.wait(until.elementLocated(By.css('.pagecontent')));
  });

  this.Then(/^I want to see how many episodes the show has$/, async function () {
    await driver.wait(until.elementLocated(By.css('.bp_content')));
    let amountOfEpisodes = await driver.findElement(By.css('.bp_sub_heading')).getText();
    expect(amountOfEpisodes, 'Wrong amount of episodes').to.include('62');
    await sleep(sleepTime);
  });

  this.Then(/^a list of the full cast of the show$/, async function () {
    await driver.wait(until.elementLocated(By.css('.main')));
    let breakingBadShow = await driver.findElement(by.partialLinkText('FULL CAST AND CREW'));
    expect(breakingBadShow, 'Correct show did not exist').to.exist;
    await breakingBadShow.click();
    await driver.wait(until.elementLocated(By.css('.cast_list')));
    await sleep(sleepTime);
  });

}