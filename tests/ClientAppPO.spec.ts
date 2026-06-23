import{test,expect}from'@playwright/test';
import{customTest}from'../Utils_ts/test-base';
import{POManager}from'../pageobjects/POManager'
const dataset=JSON.parse(JSON.stringify(require('../Utils/placeorderTestData.json')));
for(const data of dataset)
{

test(`Client app Login for ${data.productName}`,async ({page})=>
{
const pomanager=new POManager(page);
const product=await page.locator(".card-body");

  const loginpage =  pomanager.gotologinpage();
 await loginpage.goTo();
 await loginpage.validLogin(data.userName,data.password);

const Dashboardpages=pomanager.gotodashboardpage();
await Dashboardpages.searchproduct(data.productName);
await Dashboardpages.navigatetocart();



await page.locator("div li").first().waitFor();
const checkin=await page.locator("h3:has-text('"+data.productName+"')").isVisible();
expect(checkin).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("[placeholder*='Country']").pressSequentially("Ind");
const dropdown= page.locator(".ta-results");
await dropdown.waitFor();
const options=await dropdown.locator("button").count();
for (let i=0;i< options;++i)
{
const text=await dropdown.locator("button").nth(i).textContent();
console.log(i);
if(text ===" India"){
await dropdown.locator("button").nth(i).click();
break;
}
}
expect(page.locator(".user__name [type='text']").first()).toHaveText("mohamedparvez22@gmail.com");
await page.locator(".action__submit").click();
expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderid=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderid);
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const listing=await page.locator("tbody tr");
for(let i=0;i< await listing.count();++i){
const orders=await listing.nth(i).locator("th").textContent();
let orderid:String;
if(orderid.includes(orders)){
await listing.nth(i).locator("button").first().click();
break;
}
}
const orderdetail=await page.locator(".col-text").textContent();
expect(orderid.includes(orderdetail)).toBeTruthy();
 


});
}

customTest('Client app Login ',async ({page,testDataForOrders})=>
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