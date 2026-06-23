const {test,expect,request}=require('@playwright/test');


let response;
let webcontext;
test.beforeAll(async ({browser})=>{
    const context=await browser.newContext();
const page=await context.newPage();
const product=await page.locator(".card-body");
const productName='ZARA COAT 3';
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill("mohamedparvez22@gmail.com");
await page.locator("#userPassword").fill("Test@123");
await page.locator("#login").click();
await page.waitForLoadState('networkidle');
await context.storageState({path:'state.json'});
webcontext=await browser.newContext({storageState:'state.json'});


    
})

test('@API Client app login',async ({})=>
{
const productName='ZARA COAT 3';
const page=await webcontext.newPage();
const product=await page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client");
await page.locator(".card-body").first().waitFor();
const items=await page.locator(".card-body b").allTextContents();
console.log(items);
const count=await product.count();
for (let i=0 ;i < count ; ++i)
{
if(await product.nth(i).locator("b").textContent()===productName)
{
await product.nth(i).locator("text= Add To Cart").click();
break;
}

}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const checkin=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
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
if(orderid.includes(orders)){
await listing.nth(i).locator("button").first().click();
break;
}
}
const orderdetail=await page.locator(".col-text").textContent();
expect(orderid.includes(orderdetail)).toBeTruthy();
 

})
test('@API Test Case 2',async()=>
{

const productName='ZARA COAT 3';
const page=await webcontext.newPage();
const product=await page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client");
await page.waitForLoadState('networkidle');
await page.locator(".card-body").first().waitFor();
const items=await page.locator(".card-body b").allTextContents();
console.log(items);




})