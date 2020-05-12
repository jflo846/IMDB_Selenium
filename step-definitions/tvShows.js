let { $, sleep } = require('./funcs');

module.exports = function () {

  let sleepTime = 3000;

  this.Given(/^that I click the 'Most popular shows' link in the menu$/, async function () {
    let link = await driver.findElement(by.linkText('Most Popular Shows'));
    await link.click();
    await sleep(sleepTime);
  });

  this.When(/^I choose to sort by IMDB rating$/, async function () {
    /*
    .lister-sort-by-label
    option value- IMDb Rating
    */
  });

  this.Then(/^I should be able to se the (\d+) most popular tv shows$/, async function (topShows) {
    //let topShows = +topShows;
    //expect(topShows).to.equal(100)
  });

  this.Then(/^I expect "([^"]*)" to be one of them$/, async function (gameOfThrones) {

    /*await driver.wait(until.elementLocated(By.css('.lister')));
    let results = await $('.lister'); 

    ...

    expect(resultText, 'Could not find correct show').to.include(gameOfThrones);
    */
    /*
     this.Then(/^the first search result should contain the word "([^"]*)"$/, async function (phrase) {
    // when the search has finished on IMDB
    // we either get one or more results
    // in elements with the class findResult
    // or (if no results) we get an element
    // with the class findNoResults...
    // so wait for this to happen
    await driver.wait(until.elementLocated(By.css('.findResult, .findNoResults')));
    // now the search has finisehd
    let results = await $('.findResult');
    assert(results, 'Could not find any results');
    let firstResult = results[0];
    let resultText = await firstResult.getText();
    assert.include(resultText, phrase, 'Could not find the phrase ' + phrase + ' in the first search result.');
    await sleep(sleepTime);
  });
    */
  });

}
