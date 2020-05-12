let {$, sleep} = require('./funcs');

module.exports = function() {
  let sleepTime=4000;
  let thebuzz;
  let posterShadowed;
    this.When(/^I press Coming Soon$/, async function () {
      await sleep(sleepTime);
      let comingSoon=await driver.findElement(by.linkText('Coming Soon'));
      await comingSoon.click();
      expect(comingSoon, 'Could not find the link Coming Soon')
    });

    this.Then(/^I should get a list of upcoming releases$/, async function () {      
      await driver.wait(until.elementLocated(by.css('.thebuzz', 'img.poster.shadowed')));   
      thebuzz=await $('.thebuzz');
      posterShadowed=await $('img.poster.shadowed')
    });

      this.Then(/^the list should be empty because the theaters are closed$/, function () {   
        //jag tänker att en "tom" sida som vi förväntar oss har classen thebuzz och saknar klassen för posters
        expect(thebuzz, 'Missed information on the site: Check back soon for updated movie listings.')
        expect(posterShadowed, 'There were posters on movies').to.not.exist;
      });



}
