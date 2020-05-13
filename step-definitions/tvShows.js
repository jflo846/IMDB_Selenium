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

  this.Then(/^I should see the oldest tv\-show as nr (\d+) on the list$/, async function (numberOne) {
    numberOne = +numberOne;
    await driver.wait(until.elementLocated(By.css('.secondaryInfo')));
    //let oldestShows = await $('.secondaryInfo');
    //let yearOfOldestShows = oldestShows.getText();
    //let yearOfOldestShows = [...oldestShows].length;
    let meh = await driver.findElements(By.css(".titleColumn > span"));

    //console.log(meh)
    //expect().to.be.below();
    /*

   
    topRatedNodeList=await $('.titleColumn');
    let topratedLength=[...topRatedNodeList].length;
    expect(topratedLength).to.equal(+amountTopRated,
      'Wrong amount of top rated movies');
   
    let toFind=topRatedNodeList[0]
    let movieTitle= await toFind.getText();
    expect(movieTitle).to.include(expectedNbrOne,
      'Wrong title as number one.');
    */
  });

  this.Then(/^the raiting should not be in any order$/, async function () {
    //.ratingColumn imdbRating 
    //<strong></strong>
  });


  this.Given(/^that I click the 'Browse TV Shows by Genre' link in the menu$/, async function () {
    let link = await driver.findElement(by.partialLinkText('Browse TV Shows by Genre'));
    await link.click();
    await sleep(sleepTime);
  });

  this.When(/^I scroll down the page to the section 'Popular TV Shows by Genre'$/, async function () {
    //Gets done in the next step
  });

  this.When(/^choose 'western' for tv\-shows I want to see$/, async function () {
    let link = await driver.findElement(by.partialLinkText('Popular TV Shows by Genre'));
    await link.click();
    await sleep(sleepTime);
  });

  this.Then(/^I should se a list of the most popular western tv\-shows$/, async function () {

  });

}