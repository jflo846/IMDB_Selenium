let {$, sleep} = require('./funcs');

module.exports = function() {
  let sleepTime=0;
  let thebuzz;
  let posterShadowed;
  let topRatedNodeList;

  this.When(/^I press Coming Soon$/, async function () {
    await sleep(sleepTime);
    let comingSoon=await driver.findElement(by.linkText('Coming Soon'));
    await comingSoon.click();
    expect(comingSoon, 'Could not find the link Coming Soon');
  });

  this.Then(/^I should get a list of upcoming releases$/, async function () {      
    await driver.wait(until.elementLocated(by.css('.thebuzz', 'img.poster.shadowed')));   
    thebuzz=await $('.thebuzz');
    posterShadowed = await $('img.poster.shadowed');
  });

  this.Then(/^the list should be empty because the theaters are closed$/, function () {   
    //jag tänker att en "tom" sida som vi förväntar oss har classen thebuzz och saknar klassen för posters
    expect(thebuzz, 'Missed information on the site: Check back soon for updated movie listings.').to.exist;
    expect(posterShadowed, 'There were posters on movies').to.not.exist;
  });
    
  this.When(/^I press the Top rated movies$/, async function () {
    await sleep(sleepTime);
    let topRated=await driver.findElement(by.linkText('Top Rated Movies'));
    await topRated.click();
    expect(topRated, 'Could not find the link Top Rated Movies');
  });


  this.Then(/^I should get a list of the top (\d+) movies$/, async function (amountTopRated) {
    await sleep(sleepTime);
    topRatedNodeList=await $('.titleColumn');
    let topratedLength=[...topRatedNodeList].length;
    expect(topratedLength).to.equal(+amountTopRated,
      'Wrong amount of top rated movies');
  });

  this.Then(/^The "([^"]*)" should be number one$/, async function (expectedNbrOne) {
    //TODO Behöver få ordning på firefox så den kör engelska jämt, av något skäl byter den tillbaks till svenska
    await sleep(sleepTime); 
    let toFind=topRatedNodeList[0]
    let movieTitle= await toFind.getText();
    expect(movieTitle).to.include(expectedNbrOne, 
      'Wrong title as number one.');
    });

 
  this.When(/^I press DVD & Blu-ray Releases$/, async function () {
    await sleep(sleepTime);
    let relesesDVD=await driver.findElement(by.linkText('DVD & Blu-ray Releases'));
    await relesesDVD.click();
    expect(relesesDVD, 'Could not find the link DVD & Blu-ray Releases').to.exist;
    await sleep(sleepTime);
    
  });
 
  this.Then(/^I should get a list of upcoming releases that I can watch during this corona pandemic$/, async function () {
    await driver.wait(until.elementLocated(by.css('.lister-item-header')));   
    
    let nodeDvdList=await $('.lister-item-header');
     expect(nodeDvdList,'Could not find a list of DVD & Blu-ray Releases').to.exist;
  });
 

}
