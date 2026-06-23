const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');

const { Given, When, Then } = require('@cucumber/cucumber')
Given('Enter a Commerce validation by entering {string} and {string}',{timeout : 100*1000}, async function (userName, password) {

   
    const product = await this.page.locator(".card-body");
    const loginpage = this.pomanager.gotologinpage();
    await loginpage.goTo();
    await loginpage.validLogin(userName, password);
});

When('Add {string} to the cart', async function (productName) {
    const Dashboardpages = this.pomanager.gotodashboardpage();
    await Dashboardpages.searchproduct(productName);
    await Dashboardpages.navigatetocart();
});

Then('verify the {string} is present in cart page', async function (productName) {
    const cartpage = this.pomanager.selectproductcheckout();
    await cartpage.findProduct();
    await cartpage.productisvisible(productName);
    await cartpage.checkoutCart();
});

When('enter the valid card details and select country', async function () {
    const orderpage = this.pomanager.verifyorderpage();
    await orderpage.entercard("123456784321");
    await orderpage.selectcountry("Ind");
    await orderpage.verifymailId("mohamedparvez22@gmail.com");
    await orderpage.placeorder();
    this.fetchedid = await orderpage.getOrderId();
});

Then('verify that order is placed in order history page', async function () {
    const orderhistory =this.pomanager.ordershistorypage();
    await orderhistory.navigatetoorders();
    await orderhistory.getOrderProduct(this.fetchedid);
    await orderhistory.orderSummary(this.fetchedid);
});
Given('Enter a E-Commerce validation with entering {string} and {string}',async function (userName, password) {
await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await this.page.locator('#username').type(userName);
await this.page.locator("[type='password']").type(password);
await this.page.locator("#signInBtn").click();

  
});

Then('Error message should show',async function () {
await this.page.locator("[style*='block']").textContent();
await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
  
});

