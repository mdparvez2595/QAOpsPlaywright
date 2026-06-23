const {test,expect}=require('@playwright/test')
test.describe.configure({mode:'parallel'})
test('More validation',async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
page.on('dialog',dialog => dialog.accept());
await page.locator("#alertbtn").click();
await page.locator("#mousehover").hover();
const framepage=page.frameLocator("#courses-iframe");
await framepage.locator("li a[href*='lifetime-access']:visible").click();
const contents=await framepage.locator(".text h2").textContent();
console.log(contents.split(" ")[1]);

});

test('screenshot taken',async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({path:'snap.png'});
await page.locator("#hide-textbox").click();
page.screenshot({path:'screensave.png'});
await expect(page.locator("#displayed-text")).toBeHidden();



})

test('visual screenshot',async({page})=>
{
await page.goto("https://www.google.com/");
expect (await page.screenshot()).toMatchSnapshot('landing.png');




})