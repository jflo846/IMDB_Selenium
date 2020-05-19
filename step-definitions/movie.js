let {$, sleep} = require('./funcs');

module.exports = function() {
  let sleepTime=0;
  let thebuzz;
  let posterShadowed;
  let topRatedNodeList;
  let list = [];
  let movieTitle = [];

  this.When(/^I press Coming Soon$/, async function () {
    let comingSoon = await driver.wait(until.elementLocated(By.linkText('Coming Soon')));
    await comingSoon.click();
    expect(comingSoon, 'Could not find the link Coming Soon');
    await sleep(sleepTime);
  });

  this.Then(/^I should get a list of upcoming releases$/, async function () {
    await driver.wait(until.elementLocated(by.css('.thebuzz', 'img.poster.shadowed')));
    thebuzz = await $('.thebuzz');
    posterShadowed = await $('img.poster.shadowed');
    await sleep(sleepTime);
  });

  this.Then(/^the list should be empty because the theaters are closed$/,async function () {
    //jag tänker att en "tom" sida som vi förväntar oss har classen thebuzz och saknar klassen för posters
    expect(thebuzz, 'Missed information on the site: Check back soon for updated movie listings.').to.exist;
    expect(posterShadowed, 'There were posters on movies').to.not.exist;
    await sleep(sleepTime);
  });

  this.When(/^I press the Top rated movies$/, async function () {
    let topRated = await await driver.wait(until.elementLocated(By.linkText('Top Rated Movies')));
    await topRated.click();
    expect(topRated, 'Could not find the link Top Rated Movies').to.exist;
    await sleep(sleepTime);
  });

  this.Then(/^I should get a list of the top (\d+) movies$/, async function (amountTopRated) {
    topRatedNodeList = await $('.titleColumn');
    let topratedLength = [...topRatedNodeList].length;
    expect(topratedLength).to.equal(+amountTopRated,
      'Wrong amount of top rated movies');
    await sleep(sleepTime);
  });

  this.Then(/^The "([^"]*)" should be number one$/, async function (expectedNbrOne) {
    //TODO Behöver få ordning på firefox så den kör engelska jämt, av något skäl byter den tillbaks till svenska
    let toFind = topRatedNodeList[0]
    let movieTitle = await toFind.getText();
    expect(movieTitle).to.include(expectedNbrOne,
      'Wrong title as number one.');
    await sleep(sleepTime);
  });

  this.When(/^I press DVD & Blu-ray Releases$/, async function () {
    let relesesDVD = await driver.wait(until.elementLocated(By.linkText('DVD & Blu-ray Releases')));
    await relesesDVD.click();
    expect(relesesDVD, 'Could not find the link DVD & Blu-ray Releases').to.exist;
    await sleep(sleepTime);
  });

  this.Then(/^I should get a list of upcoming releases that I can watch during this corona pandemic$/, async function () {
    await driver.wait(until.elementLocated(by.css('.lister-item-header')));
    let nodeDvdList = await $('.lister-item-header');
    expect(nodeDvdList, 'Could not find a list of DVD & Blu-ray Releases').to.exist;
    await sleep(sleepTime);
  });

  this.When(/^I press the 'Most popular movies' link$/, async function () {
    let mostPopularMovies = await driver.wait(until.elementLocated(By.linkText('Most Popular Movies')));
    await mostPopularMovies.click();
    expect(mostPopularMovies, 'Could not find the link Most Popular Movies').to.exist; 
    await sleep(sleepTime);
  });

  this.When(/^click on the 'Lowest Rated Movies' to the right$/, async function () {
    let lowestRated= await driver.wait(until.elementLocated(By.linkText('Lowest Rated Movies')));
    await lowestRated.click();
    expect(lowestRated, 'Did not find Lowest Rated Movies').to.exist; 
    await sleep(sleepTime);
  });

  this.Then(/^I should get a list of the worst (\d+) movies$/, async function (numberOfMovies) {
    let totalNumber = await driver.findElement(by.css('.desc > span:nth-child(1)')).getText();
    expect(totalNumber).to.equal(numberOfMovies, 'theres not the correct number of movies here');
    await sleep(sleepTime);
  }); 

  this.Then(/^The Room with Tommy Wiseau should be on the list$/, async function () {
    let isThisTheWorstMovieEver = await driver.findElement(By.linkText('The Room')).getText();
    expect(isThisTheWorstMovieEver).to.equal('The Room', 'The Rooms is not on the list');
    
    let whosDirecting = await driver.wait(until.elementLocated(by.xpath('//*[@id="main"]/div/span/div/div/div[3]/table/tbody/tr[61]/td[2]/a')));
    let director = await whosDirecting.getAttribute('title');
    expect(director).to.include('Tommy', 'Tommy Wiseau is not the director');
    await sleep(sleepTime);
  });

   
  this.Given(/^that I am on the 'Most Popular movies' page$/, async function () {
    await helpers.loadPage('https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm');
    await sleep(sleepTime);
  });

  this.When(/^I click on 'Fantasy' beneath 'Popular Movies by Genre'$/, async function () {
    let links = [];
    links = await $('.quicklinks');
    let linkName= await links.getText();
    let fantasy = await driver.wait(until.elementLocated(By.linkText('Fantasy'))); 
    expect(linkName).to.include('Fantasy', 'This is not the correct link');
    await fantasy.click();
    await sleep(sleepTime);
  });

  this.When(/^klick on 'Feature films' Beneath 'Title Type'$/, async function () {
    let links = [];
    links = await $('div.aux-content-widget-2:nth-child(5) > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(2)');
    let linkText = await links.getText();
    let feature = await driver.wait(until.elementLocated(By.linkText('Feature Films')));
    expect(linkText).to.include('Feature Films', 'The correct link is not here');
    await feature.click();
    await sleep(sleepTime);
  });

  this.Then(/^'Star Wars: The Rise of Skywalker' should be in the top (\d+)$/,async function (top) {  
    list = await $('.lister-item-header > a');
    let topTen = list.slice(0, 10);
    expect(topTen.length).to.equal(+top, 'This is not a list of the top ten movies');
    
    for (let movie of topTen) {
      movieTitle.push(await movie.getText());
    }
    expect(movieTitle).to.include('Star Wars: Episode IX - The Rise of Skywalker', 'The movie is not on the top ten list');
    await sleep(sleepTime);
  });

}


