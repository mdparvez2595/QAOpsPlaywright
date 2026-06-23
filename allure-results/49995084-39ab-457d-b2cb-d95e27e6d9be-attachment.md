# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientApp.spec.js >> @Web Client app automate
- Location: tests\ClientApp.spec.js:4:1

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: locator.fill: Test timeout of 40000ms exceeded.
Call log:
  - waiting for locator('#userEmail')

```

# Test source

```ts
  1  | const {test,expect}=require('@playwright/test');
  2  | 
  3  | 
  4  | test('@Web Client app automate',async ({page})=>
  5  | {
  6  | const userName="mohamedparvez22@gmail.com";
  7  | const password="Test@123";
  8  | const product=await page.locator(".card-body");
  9  | const productName='ZARA COAT 3';
> 10 |  await page.locator("#userEmail").fill(userName);
     |                                   ^ Error: locator.fill: Test timeout of 40000ms exceeded.
  11 |  await page.locator("#userPassword").fill(password);
  12 |  await page.locator("#login").click();
  13 | await page.waitForLoadState('networkidle');
  14 | await page.locator(".card-body").first().waitFor();
  15 | const items=await page.locator(".card-body b").allTextContents();
  16 | console.log(items);
  17 | const count=await product.count();
  18 | for (let i=0 ;i < count ; ++i)
  19 | {
  20 | if(await product.nth(i).locator("b").textContent()===productName)
  21 | {
  22 | await product.nth(i).locator("text= Add To Cart").click();
  23 | break;
  24 | }
  25 | 
  26 | }
  27 | await page.locator("[routerlink*='cart']").click();
  28 | await page.locator("div li").first().waitFor();
  29 | const checkin=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  30 | expect(checkin).toBeTruthy();
  31 | await page.locator("text=Checkout").click();
  32 | await page.locator("[placeholder*='Country']").pressSequentially("Ind");
  33 | const dropdown= page.locator(".ta-results");
  34 | await dropdown.waitFor();
  35 | const options=await dropdown.locator("button").count();
  36 | for (let i=0;i< options;++i)
  37 | {
  38 | const text=await dropdown.locator("button").nth(i).textContent();
  39 | console.log(i);
  40 | if(text ===" India"){
  41 | await dropdown.locator("button").nth(i).click();
  42 | break;
  43 | }
  44 | }
  45 | expect(page.locator(".user__name [type='text']").first()).toHaveText("mohamedparvez22@gmail.com");
  46 | await page.locator(".action__submit").click();
  47 | expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  48 | const orderid=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  49 | console.log(orderid);
  50 | await page.locator("button[routerlink*='myorders']").click();
  51 | await page.locator("tbody").waitFor();
  52 | const listing=await page.locator("tbody tr");
  53 | for(let i=0;i< await listing.count();++i){
  54 | const orders=await listing.nth(i).locator("th").textContent();
  55 | if(orderid.includes(orders)){
  56 | await listing.nth(i).locator("button").first().click();
  57 | break;
  58 | }
  59 | }
  60 | const orderdetail=await page.locator(".col-text").textContent();
  61 | expect(orderid.includes(orderdetail)).toBeTruthy();
  62 |  
  63 | await page.pause();
  64 | 
  65 | });
```