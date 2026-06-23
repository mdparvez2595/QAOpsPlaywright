const {test,expect,request}=require('@playwright/test');
const {APIUtils}=require('../Utils/APIUtils');
const payload={userEmail: "mohamedparvez22@gmail.com", userPassword: "Test@123"};
const orderpayload={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const Fakepayload={data:[],message:"No Orders"};

let response;
test.beforeAll(async ()=>{
    const apicontext = await request.newContext();
    const apiutil=new APIUtils(apicontext,payload);
   response=await apiutil.createorder(orderpayload);
   

    
})

test('Client app automate',async ({page})=>
{
await page.addInitScript(value=>{
    window.localStorage.setItem('token',value); 
    },response.token);
// const context=await browser.newContext();
// const page=await context.newPage();
const product=await page.locator(".card-body");
const productName='ZARA COAT 3';
await page.goto("https://rahulshettyacademy.com/client");

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a217f4b17ee3e78babb3516",
   async route => {

   const response=await page.request.fetch(route.request());
   let body=JSON.stringify(Fakepayload);
   route.fulfill({
    response,
    body

   })
})

await page.locator("button[routerlink*='myorders']").click();

await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a217f4b17ee3e78babb3516");
console.log(await page.locator(".mt-4").textContent());
 
await page.pause();

});