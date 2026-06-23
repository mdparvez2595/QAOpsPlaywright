const {test,expect,request}=require('@playwright/test');


test('Basic login',async({browser}) =>

{
const context=await browser.newContext();

const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
page.route('**/*.{jpg,png,jpeg}',
    route=>route.abort());
const userName=page.locator('#username');
const signIn=page.locator("#signInBtn");
const cardTitles=page.locator(".card-body a");
page.on('request',request=>request.url());
page.on('response',response=>response.url(), response.status());

console.log(await page.title());

await page.locator('#username').type("rahulshetty");
await page.locator("[type='password']").type("learning");
await signIn.click();
await page.locator("[style*='block']").textContent();
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
//console.log(await cardTitles.first().textContent());
//console.log(await cardTitles.nth(1).textContent());
const allTitles=await cardTitles.allTextContents();
console.log(allTitles);









}
)