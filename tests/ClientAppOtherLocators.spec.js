const {test,expect}=require('@playwright/test');

test('Client app automate',async ({browser})=>
{

const context=await browser.newContext();
const page=await context.newPage();
const product=await page.locator(".card-body");
const productName='ZARA COAT 3';
await page.goto("https://rahulshettyacademy.com/client");
await page.getByPlaceholder("email@example.com").fill("mohamedparvez22@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("Test@123");
await page.getByRole("button",{name:"Login"}).click();
await page.waitForLoadState('networkidle');
await page.locator(".card-body").first().waitFor();
await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:'Add To Cart'}).click();
await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();

await page.locator("div li").first().waitFor();
await expect( page.getByText("ZARA COAT 3")).toBeVisible();

await page.getByRole("listitem").last().getByRole("button",{name:'Checkout'}).click();

await page.getByPlaceholder("Select Country").pressSequentially("Ind");
const dropdown= page.locator(".ta-results");
await page.getByRole("button",{name:'India'}).nth(1).click();
await page.getByText("PLACE ORDER").click();
expect(page.getByText("Thankyou for the order.")).toBeVisible();
const orderid=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderid);
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const listing=await page.locator("tbody tr");
for(let i=0;i< await listing.count();++i){
const orders=await listing.nth(i).locator("th").textContent();
if(orderid.includes(orders)){
await listing.nth(i).locator("button").first().click();
break;
}
}
const orderdetail=await page.locator(".col-text").textContent();
expect(orderid.includes(orderdetail)).toBeTruthy();
 
await page.pause();

});