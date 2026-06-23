const {test,expect,request}=require('@playwright/test');
const {APIUtils}=require('../Utils/APIUtils');
const payload={userEmail: "mohamedparvez22@gmail.com", userPassword: "Test@123"};
const orderpayload={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let response;
test.beforeAll(async ()=>{
    const apicontext = await request.newContext();
    const apiutil=new APIUtils(apicontext,payload);
   response=await apiutil.createorder(orderpayload);
   

    
})

test('@API Client app automate',async ({page})=>
{
await page.addInitScript(value=>{
    window.localStorage.setItem('token',value); 
    },response.token);
// const context=await browser.newContext();
// const page=await context.newPage();
const product=await page.locator(".card-body");
const productName='ZARA COAT 3';
await page.goto("https://rahulshettyacademy.com/client");

await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const listing=await page.locator("tbody tr");
for(let i=0;i< await listing.count();++i){
const orders=await listing.nth(i).locator("th").textContent();
if(response.orderId.includes(orders)){
await listing.nth(i).locator("button").first().click();
break;
}
}
const orderdetail=await page.locator(".col-text").textContent();
expect(response.orderId.includes(orderdetail)).toBeTruthy();
 


});