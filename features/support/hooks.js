const playwright = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const {Before,After,BeforeStep,AfterStep,Status}=require('@cucumber/cucumber');



Before(async function () {

     const browser = await playwright.chromium.launch({
        headless:false

    });
    const context = await browser.newContext();
     this.page = await context.newPage();
    this.pomanager = new POManager(this.page);
  // This hook will be executed before all scenarios
});
After(function () {
  // Assuming this.driver is a selenium webdriver
  console.log("All step is executed");
   
});

BeforeStep( function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    this.driver.takeScreenshot({path:'screenshot1.png'});
  }
});