const {test,expect}=require('@playwright/test');
const {customtest}=require('../Utils/test-base');

const{POManager}=require('../pageobjects/POManager');
const dataset=JSON.parse(JSON.stringify(require('../Utils/placeorderTestData.json')));
for(const data of dataset)
{

test(`@Webs Client App login for ${data.productName}`,async ({page})=>
{
const pomanager=new POManager(page);
const product=await page.locator(".card-body");

  const loginpage =  pomanager.gotologinpage();
 await loginpage.goTo();
 await loginpage.validLogin(data.userName,data.password);

const Dashboardpages=pomanager.gotodashboardpage();
await Dashboardpages.searchproduct(data.productName);
await Dashboardpages.navigatetocart();
const cartpage=pomanager.selectproductcheckout();
await cartpage.findProduct();
await cartpage.productisvisible(data.productName);
await cartpage.checkoutCart();

const orderpage=pomanager.verifyorderpage();
await orderpage.entercard(data.cardno);
await orderpage.selectcountry(data.country);
await orderpage.verifymailId(data.userName);
await orderpage.placeorder();
const fetchedid=await orderpage.getOrderId();

const orderhistory=pomanager.ordershistorypage();
await orderhistory.navigatetoorders();
await orderhistory.getOrderProduct(fetchedid);
await orderhistory.orderSummary(fetchedid);
});
}

customtest('Client app Login ',async ({page,testDataForOrders})=>
{
const pomanager=new POManager(page);
const product=await page.locator(".card-body");

const loginpage =  pomanager.gotologinpage();
 await loginpage.goTo();
 await loginpage.validLogin(testDataForOrders.userName,testDataForOrders.password);
const Dashboardpages=pomanager.gotodashboardpage();
await Dashboardpages.searchproduct(testDataForOrders.productName);
await Dashboardpages.navigatetocart();
await page.locator("div li").first().waitFor();
const checkin=await page.locator("h3:has-text('"+testDataForOrders.productName+"')").isVisible();
expect(checkin).toBeTruthy();
await page.locator("text=Checkout").click();
})