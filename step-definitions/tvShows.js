let { $, sleep } = require('./funcs');

module.exports = function () {

  let sleepTime = 3000;

  this.Given(/^that I click the 'Most popular shows' link in the menu$/, async function () {
    let link = await driver.findElement(by.partialLinkText('Most Popular Shows'));
    await link.click();
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
  });

  this.Then(/^I should be able to se the (\d+) most popular tv shows$/, async function (topShows) {
    let numberOfShows = await $('.desc');
    let numberOfShowsText = await numberOfShows.getText();
    expect(numberOfShowsText).to.include(+topShows, 'Wrong amount of movies');
  });

  this.Then(/^I expect "([^"]*)" to be one of them$/, async function (gameOfThrones) {
    let popularShows = await $('.lister')
    let popularShowsText = await popularShows.getText();
    expect(popularShowsText).to.include(gameOfThrones)
  });

  this.Given(/^that I click the 'Top Rated Shows' link in the menu$/, async function () {
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
    descendingOrder.click();
  });

  this.Then(/^I should see the oldest tv\-show "([^"]*)" on the list$/, async function (numberOne) {
    await driver.wait(until.elementLocated(By.css('.secondaryInfo')));

    let firstElement = await driver.findElement(By.css(".titleColumn")).getText();
    expect(firstElement).to.include(numberOne);
    let elements = await driver.findElements(By.css(".titleColumn > span"));
    let years = [];
    for (let element of elements) {
      // getting the year part using splits on parenthesis
      // and converting to number using +
      years.push(+(await element.getText()).split('(')[1].split(')')[0]);
    }
    // we expect no year to be less than the first year
    let wrongYears = years.filter(x => x < years[0]);
    expect(wrongYears,
      'Years before ' + years[0] + ' found later in list.'
    ).to.be.empty;

  });

  this.Given(/^that I click the 'Browse TV Shows by Genre' link in the menu$/, async function () {
    let link = await driver.findElement(by.partialLinkText('Browse TV Shows by Genre'));
    await link.click();
    await sleep(sleepTime);
  });

  this.When(/^I scroll down the page to the section 'Popular TV Shows by Genre'$/, async function () {
    //Gets done in the next step
  });

  this.When(/^choose 'Talk Show' for tv\-shows I want to see$/, async function () {
    let link = await driver.findElement(by.partialLinkText('Talk Show'));
    await link.click();
    await sleep(sleepTime);
  });

  this.Then(/^I should se a list of the most popular talk shows$/, async function () {
    //Nothing to test here
  });


  this.Then(/^that "([^"]*)" is one of them$/, async function (talkShow) {
    /*await driver.wait(until.elementLocated(By.css('.lister-item-content')));
    let popularTalkShows = await $('.lister-item-content');
    let popularTalkShowText = popularTalkShows.getText();
    expect(popularTalkShowText).to.include(talkShow);
    await sleep(sleepTime);*/
  });

}