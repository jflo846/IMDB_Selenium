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

  let newBio;
  this.When(/^I write something in my 'bio'$/, async function () {
    await driver.wait(until.elementLocated(By.css('#main')));
    let bioArea = await driver.findElement(By.css('.multiline'));
    expect(bioArea, 'Could not find the bio-textarea').to.exist;
    await bioArea.click();
    let bioText = await driver.findElement(By.css('.multiline')).getText();
    if (bioText === "Hello! Welcome to my Bio") {
      //Reset the bioArea
      await bioArea.clear();
      await bioArea.sendKeys('This is my Bio');
      newBio = "This is my Bio"
    } else if (bioText === "This is my Bio") {
      await bioArea.clear();
      await bioArea.sendKeys('Hello! Welcome to my Bio');
      newBio = "Hello! Welcome to my Bio";
    }
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
    expect(updatedBio).to.equal(newBio);
  });

  this.When(/^I click on 'Edit' next to my name$/, async function () {
    await driver.wait(until.elementLocated(By.css('#main')));
    let editButton = await driver.findElement(by.partialLinkText('Edit'));
    await editButton.click();
    await sleep(sleepTime);
  });

  let newName;
  //Tar hand om det här i helgen eller på måndag :) -Ullis
  this.When(/^change my name$/, async function () {
    /*let nameInput = await $('input[name="nick"]');
    await nameInput.click();
    let currentName1 = await driver.findElement(by.css('input[value = "Tester_Tester"]'));
    if (currentName1 === true) {
      await nameInput.clear();
      newName = await nameInput.sendKeys('Testing_Testing');
    }
    //let currentName2 = await driver.findElement(by.css('input[value = "Testing_Testing"]'));
    if (currentName2 === true) {
      await nameInput.clear();
      newName = await nameInput.sendKeys('Tester_Tester');
    }
    await sleep(sleepTime);*/
  });

  this.When(/^click on 'Save Changes'$/, async function () {
    let saveChangesButton = await $('input[value="Save Changes"]');
    await saveChangesButton.click();
    await sleep(sleepTime);
  });

  this.Then(/^my name should have changed$/, async function () {
    await driver.wait(until.elementLocated(By.css('.success')));
    let updatedName = await driver.findElement(By.css('.success > h2 > strong')).getText();
    expect(updatedName).to.equal(newName);
  });

}