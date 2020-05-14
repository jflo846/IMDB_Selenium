let { $, sleep } = require('./funcs');

module.exports = function () {
  let sleepTime = 1000;

  let numberOfCelebs;
  let nameToCheck;
  this.Given(/^that I clicked on the link for advanced name search$/, async function () {
    let advancedName = await driver.findElement(By.linkText('Advanced Name Search'));
    await advancedName.click();
    await sleep(sleepTime);
  });
  this.When(/^I enter (\d+) and (\d+) in the birthdate box$/, async function (startYear, endYear) {
    let birthDateStart = await driver.wait(until.elementLocated(By.name('birth_date-min')));
    await birthDateStart.sendKeys(startYear);
    await sleep(3000);
    let birthDateEnd = await driver.wait(until.elementLocated(By.name('birth_date-max')));
    await birthDateEnd.sendKeys(endYear);
    await sleep(3000);
  });

  this.When(/^I enter (\d+)\-(\d+) in the birthday box$/, async function (day, month) {
    let birthDayAndMonth = await driver.findElement(By.name('birth_monthday'));
    await birthDayAndMonth.sendKeys(day,'-',month);
    await sleep(3000);
  });
  this.When(/^I click on the yellow search button on the bottom of the page$/, async function () {
    let searchButton = await $('.primary');
    await searchButton.click();
    
  });
  this.Then(/^I should get a list of the celebs that where born on that day$/, async function () {
    await sleep(3000);
    let results = await driver.wait(until.elementLocated(by.css('div.desc:nth-child(3) > span:nth-child(1)'))).getText();
    numberOfCelebs = await results.slice(0, 2);
    expect(+numberOfCelebs, 'the list should show max 50 persons').to.not.be.above(50);
  
  });
  this.Then(/^if I want to know more about that person I shall be able to click on the name of the celebrity$/, async function () {
    
    if (numberOfCelebs ==='No') {
      throw (new Error('There is no celebs born on this day'));
    } else {
      let celebsBornThisDay = await driver.wait(until.elementLocated(by.css('.lister-item-header>a')))
      nameToCheck = await celebsBornThisDay.getText();
      await celebsBornThisDay.click();
    }
    let personalPageName = await driver.wait(until.elementLocated(By.css('h1.header > span:nth-child(1)'))).getText();
    expect(nameToCheck).to.equal(personalPageName,'This is not the right page');

  });
}

