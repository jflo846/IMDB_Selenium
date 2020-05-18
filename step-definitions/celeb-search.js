let { $, sleep } = require('./funcs');

module.exports = function () {
  let sleepTime;

  let numberOfCelebs;
  let nameToCheck;
 
  this.Given(/^that I clicked on the link for advanced name search$/, async function () {
    let advancedName = await driver.findElement(By.linkText('Advanced Name Search'));
    await advancedName.click();
    expect(advancedName).to.exist;
   
  });
  this.When(/^I enter (\d+) and (\d+) in the birthdate box$/, async function (startYear, endYear) {
    let birthDateStart = await driver.wait(until.elementLocated(By.name('birth_date-min')));
    await birthDateStart.sendKeys(startYear);
    expect(birthDateStart).to.exist;
    
    let birthDateEnd = await driver.wait(until.elementLocated(By.name('birth_date-max')));
    await birthDateEnd.sendKeys(endYear);
    expect(birthDateEnd).to.exist;
  });

  this.When(/^I enter (\d+)\-(\d+) in the birthday box$/, async function (day, month) {
    let birthDayAndMonth = await driver.findElement(By.name('birth_monthday'));
    await birthDayAndMonth.sendKeys(day, '-', month);
    expect(birthDayAndMonth).to.exist;
  });

  this.When(/^I click on the yellow search button on the bottom of the page$/, async function () {
    let searchButton = await $('.primary');
    await searchButton.click();
    expect(searchButton).to.exist;
  });

  this.Then(/^I should get a list of the celebs that where born on that day$/, async function () {
    let results = await driver.wait(until.elementLocated(by.css('div.desc:nth-child(3) > span:nth-child(1)'))).getText();
    numberOfCelebs = await results.slice(0, 2);
    expect(+numberOfCelebs, 'the list should show max 50 persons').to.not.be.above(50);
  });

  this.Then(/^if I want to know more about that person I shall be able to click on the name of the celebrity$/, async function () {
    let celebsBornThisDay = await driver.wait(until.elementLocated(by.css('.lister-item-header>a')))
    nameToCheck = await celebsBornThisDay.getText();
    await celebsBornThisDay.click();
    
    let personalPageName = await driver.wait(until.elementLocated(By.css('h1.header > span:nth-child(1)'))).getText();
    expect(nameToCheck).to.equal(personalPageName,'This is not the right page');
  });

  this.Given(/^that I am on the page for advanced name search$/, async function () {
    await helpers.loadPage('https://www.imdb.com/search/name/');
    let adress = await driver.getCurrentUrl();
    
    expect(adress).to.equal('https://www.imdb.com/search/name/');
  });

  this.Given(/^I enter (\d+) as startyear and (\d+) as endyear$/,async function (yearOne, yearTwo) {
    let birthDateStart = await driver.wait(until.elementLocated(By.name('birth_date-min')));
    await birthDateStart.sendKeys(yearOne);

    let birthDateEnd = await driver.wait(until.elementLocated(By.name('birth_date-max')));
    await birthDateEnd.sendKeys(yearTwo);
  });

  this.Given(/^(\d+)\-(\d+) as day and month for birthdate$/,async function (day, month) {
    let birthDayAndMonth = await driver.findElement(By.name('birth_monthday'));
    await birthDayAndMonth.sendKeys(day, '-', month);
  });

  this.Given(/^press the button to search for non born people$/,async function () {
    let searchButton = await $('.primary');
    await searchButton.click();
  });

  this.Then(/^I shall se that there are no celebs born on the day I searched for$/, async function () {
    let noResult= await driver.findElement(by.css('#main > div > div > span'));
    let text= await noResult.getText();
    expect(text).to.equal('No results.');
  });

  this.Then(/^if I klick on the IMDB home button I shall come back to the startpage$/, async function () {
    await driver.findElement(by.id('home_img_holder')).click();
    let startPage = await driver.getCurrentUrl();
    expect(startPage).to.equal('https://www.imdb.com/?ref_=nv_home');
  });
}

