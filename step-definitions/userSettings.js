let { $, sleep } = require('./funcs');
const { username, password } = require('./credentials.json');

module.exports = function () {

  let sleepTime = 5000;

  this.Given(/^that I am have signed in to my account$/, async function () {
    await helpers.loadPage('https://www.imdb.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.imdb.com%2Fregistration%2Fap-signin-handler%2Fimdb_us&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=imdb_us&openid.mode=checkid_setup&siteState=eyJvcGVuaWQuYXNzb2NfaGFuZGxlIjoiaW1kYl91cyIsInJlZGlyZWN0VG8iOiJodHRwczovL3d3dy5pbWRiLmNvbS8_cmVmXz1sb2dpbiJ9&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&tag=imdbtag_reg-20');
    let emailInput = await $('input[type= "email"]');
    emailInput.clear();
    emailInput.sendKeys(username);
    let passwordInput = await $('input[type= "password"]');
    passwordInput.clear();
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
    expect(accountLink, 'Could not find correct link').to.exist;
    await accountLink.click();
    await driver.wait(until.elementLocated(By.css('#main')));
    let updatedBio = await driver.findElement(By.css('.multiline')).getText();
    expect(updatedBio).to.equal(newBio);
  });

  this.When(/^I click on 'Edit' next to my name$/, async function () {
    await driver.wait(until.elementLocated(By.css('#main')));
    let editButton = await driver.findElement(by.partialLinkText('Edit'));
    expect(editButton, 'Could not find correct button').to.exist;
    await editButton.click();
    await sleep(sleepTime);
  });

  let newName;
  this.When(/^change my name$/, async function () {
    await driver.wait(until.elementLocated(By.css('.auth-input-title')));
    let nameInput = await $('input[name="nick"]');
    await nameInput.click();
    if (await driver.findElement(By.css('input[value^="Test"]'))) {
      if (await $('input[value$="er"]')) {
        await nameInput.clear();
        await nameInput.sendKeys('Testing_Testing');
        newName = 'Testing_Testing';
      }
      if (await $('input[value$="ing"]')) {
        await nameInput.clear();
        await nameInput.sendKeys('Tester_Tester');
        newName = 'Tester_Tester';
      }
    }
    await sleep(sleepTime);
  });

  this.When(/^click on 'Save Changes'$/, async function () {
    let saveChangesButton = await $('input[value="Save Changes"]');
    expect(saveChangesButton, 'Could not find correct button').to.exist;
    await saveChangesButton.click();
    await sleep(sleepTime);
  });

  this.Then(/^my name should have changed$/, async function () {
    await driver.wait(until.elementLocated(By.css('.success')));
    let updatedName = await driver.findElement(By.css('.success > h2 > strong')).getText();
    expect(updatedName).to.equal(newName);
  });

  //Nytt scenario
  let currentPassword;
  let newPassword;
  let newCheckPassword;
  let savePasswordButton;
  let changePasswordButton;

  this.When(/^click on 'Login and security'$/, async function () {
    await driver.wait(until.elementLocated(By.css('.article')));
    let securityLink = await driver.findElement(by.partialLinkText('Login and security'));
    expect(securityLink, 'Correct link does not exist').to.exist;
    await securityLink.click();
    await sleep(sleepTime);
  });

  this.When(/^click on 'Edit' next to 'Password'$/, async function () {
    await driver.wait(until.elementLocated(By.css('.a-section')))
    changePasswordButton = await $('input[id="auth-cnep-edit-password-button"]');
    expect(changePasswordButton, 'Could not find correct button').to.exist;
    await changePasswordButton.click();
    await sleep(sleepTime);
  });

  this.When(/^enter my current password$/, async function () {
    await driver.wait(until.elementLocated(By.css('.a-box-inner')));
    currentPassword = await $('input[id="ap_password"]');
    expect(currentPassword, 'Could not find the correct input field').to.exist;
    await currentPassword.sendKeys('Hello123');
    await sleep(sleepTime);
  });

  this.When(/^enter my new password$/, async function () {
    newPassword = await $('input[id="ap_password_new"]');
    expect(newPassword, 'Could not find the correct input field').to.exist;
    await newPassword.sendKeys('Hello321');
    await sleep(sleepTime);
  });

  this.When(/^reenter my new password$/, async function () {
    newCheckPassword = await $('input[id="ap_password_new_check"]');
    expect(newCheckPassword, 'Could not find the correct input field').to.exist;
    await newCheckPassword.sendKeys('Hello321');
    await sleep(sleepTime);
  });

  this.When(/^click on 'Save changes'$/, async function () {
    savePasswordButton = await $('input[id="cnep_1D_submit_button"]');
    expect(savePasswordButton, 'Could not find the correct button').to.exist;
    await savePasswordButton.click();
    await sleep(sleepTime);
  });

  this.Then(/^my password should be updated$/, async function () {
    //Testas i nästa steg 
  });

  this.Then(/^I should get the message 'Success You have successfully modified your account!'$/, async function () {
    await driver.wait(until.elementLocated(By.css('.a-alert-heading')));
    let successMessage = await driver.findElement(By.css('#auth-success-message-box')).getText();
    expect(successMessage).to.include('Success');
    await sleep(sleepTime);
  });

  this.Then(/^I should be able to change it back to the original password$/, async function () {
    changePasswordButton = await $('input[id="auth-cnep-edit-password-button"]');
    await changePasswordButton.click();
    currentPassword = await $('input[id="ap_password"]');
    await currentPassword.sendKeys('Hello321');
    newPassword = await $('input[id="ap_password_new"]');
    await newPassword.sendKeys('Hello123');
    newCheckPassword = await $('input[id="ap_password_new_check"]');
    await newCheckPassword.sendKeys('Hello123');
    savePasswordButton = await $('input[id="cnep_1D_submit_button"]');
    await savePasswordButton.click();
    await sleep(sleepTime);
  });

}