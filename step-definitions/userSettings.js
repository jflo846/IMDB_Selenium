let { $, sleep } = require('./funcs');
const { username, password } = require('./credentials.json');

module.exports = function () {

  let sleepTime = 3000;

  this.Given(/^that I am have signed in to my account$/, async function () {
    await helpers.loadPage('https://www.imdb.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.imdb.com%2Fregistration%2Fap-signin-handler%2Fimdb_us&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=imdb_us&openid.mode=checkid_setup&siteState=eyJvcGVuaWQuYXNzb2NfaGFuZGxlIjoiaW1kYl91cyIsInJlZGlyZWN0VG8iOiJodHRwczovL3d3dy5pbWRiLmNvbS8_cmVmXz1sb2dpbiJ9&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&tag=imdbtag_reg-20');
    let emailInput = await $('input[type= "email"]');
    emailInput.sendKeys(username);
    let passwordInput = await $('input[type= "password"]');
    passwordInput.sendKeys(password);
    let signInIMBDButton = await driver.findElement(By.css('input[id="signInSubmit"]'));
    await signInIMBDButton.click();
    await sleep(sleepTime);
  });

  this.Given(/^I am on the frontpage$/, async function () {
    await driver.wait(until.elementLocated(By.css('.ipc-button__text')));
  });

  this.When(/^I click on my name$/, async function () {
    let allButtons = await driver.findElements(By.css('.ipc-button__text'));
    for (let changedButton of allButtons) {
      let buttonText = await changedButton.getText();
      if (buttonText.includes("Testing")) {
        expect(changedButton, 'Correct button did not exist').to.exist
        await changedButton.click();
        break;
      }
    }
    await sleep(sleepTime);
  });

  this.When(/^chose 'Account settings'$/, async function () {
    await driver.wait(until.elementLocated(By.css('[role="menuitem"]')));
    let accountLink = await driver.findElement(by.partialLinkText('Account settings'));
    expect(accountLink, 'Correct link does not exist').to.exist;
    await accountLink.click();
    await sleep(sleepTime);
  });

  this.When(/^I pick 'Edit profile'$/, async function () {
    await driver.wait(until.elementLocated(By.css('.article')));
    let accountLink = await driver.findElement(by.partialLinkText('Edit profile'));
    expect(accountLink, 'Correct link does not exist').to.exist;
    await accountLink.click();
    await sleep(sleepTime);
  });

  this.When(/^I write something in my 'bio'$/, async function () {
    await driver.wait(until.elementLocated(By.css('#main')));
    let bioArea = await driver.findElement(By.css('.multiline'));
    expect(bioArea, 'Could not find the bio-textarea').to.exist;
    await bioArea.click();
    //Reset the bioArea
    await bioArea.clear();
    await bioArea.sendKeys('Oh hi Mark!');
    await sleep(sleepTime);
  });

  this.When(/^click on 'Save Description'$/, async function () {
    let saveButton = await driver.findElement(By.css('div[data-userbio-save]'));
    expect(saveButton, 'Could not find the save button').to.exist;
    await saveButton.click();
    await sleep(sleepTime);
  });

  this.Then(/^my bio should display what I just wrote$/, async function () {
    await driver.wait(until.elementLocated(By.partialLinkText('Edit profile')));
    let accountLink = await driver.findElement(by.partialLinkText('Edit profile'));
    await accountLink.click();
    await driver.wait(until.elementLocated(By.css('#main')));
    let updatedBio = await driver.findElement(By.css('.multiline')).getText();
    expect(updatedBio).to.include('Mark');
  });

}