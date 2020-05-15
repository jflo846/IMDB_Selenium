let { $, sleep } = require('./funcs');
const { username, password } = require('./credentials.json');

module.exports = function () {

  let sleepTime = 0;

  this.Given(/^that I am on the IMDB Website$/, async function () {
    await helpers.loadPage('https://www.imdb.com');
    await sleep(sleepTime);
  });

  this.Given(/^I click on 'Sign In'$/, async function () {
    //Find all buttons with the class since the sign-in button
    //does not have anything unique
    let buttons = await driver.findElements(By.css('.ipc-button__text'));
    //Loop thru the buttons in order to find the right one
    for (let signInButton of buttons) {
      //Get the text "in" the button
      let signInButtonText = await signInButton.getText();
      //If the button has the text "Sign in", click it and break the loop
      if (signInButtonText.includes("Sign In")) {
        expect(signInButton, 'Correct button did not exist').to.exist;
        await signInButton.click();
        break;
      }
    }
    await sleep(sleepTime);
  });

  this.Given(/^pick 'Sign in with IMDb'$/, async function () {
    let signInOptions = await driver.findElements(By.css('.auth-provider-text'));
    for (let signInIMDB of signInOptions) {
      let signInOptionText = await signInIMDB.getText();
      if (signInOptionText.includes("Sign in with IMDb")) {
        expect(signInIMDB, 'Correct button did not exist').to.exist;
        await signInIMDB.click();
        break;
      }
    }
    await sleep(sleepTime);
  });

  this.When(/^I enter my email$/, async function () {
    await driver.wait(until.elementLocated(By.css('.a-section')));
    let inputEmail = await $('input[type= "email"]');
    expect(inputEmail, 'The correct input field did not exist').to.exist;
    inputEmail.sendKeys(username);
    await sleep(sleepTime);
  });

  this.When(/^I enter my password$/, async function () {
    let inputPassword = await $('input[type= "password"]');
    expect(inputPassword, 'The correct input field did not exist').to.exist;
    inputPassword.sendKeys(password);
    await sleep(sleepTime);
  });

  this.When(/^click on 'Sign\-In'$/, async function () {
    let signInIMBDButton = await driver.findElement(By.css('input[id="signInSubmit"]'));
    expect(signInIMBDButton, 'The button did not exist').to.exist;
    await signInIMBDButton.click();
    await sleep(sleepTime);
  });

  this.Then(/^the place where it stood 'Sign In' should display my name$/, async function () {
    await driver.wait(until.elementLocated(By.css('.ipc-button__text')));
    let allButtons = await driver.findElements(By.css('.ipc-button__text'));
    for (let changedButton of allButtons) {
      let buttonText = await changedButton.getText();
      if (buttonText.includes("Testing")) {
        expect(changedButton, 'Correct button did not exist').to.exist
        break;
      }
    }
    await sleep(sleepTime);
  });

}