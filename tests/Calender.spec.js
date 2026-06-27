const{test,expect}=require('@playwright/test')

test('@Web calender validation',async({page})=>
    {

        const monthNumber="6";
        const Date="15";
        const year="2027";
        const expecteddate=[monthNumber,Date,year];

        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

        await page.locator(".react-date-picker__inputGroup").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.getByText(year).click();
        //Calender test demo for new branch
        await page.locator(".react-calendar__tile").nth(Number(monthNumber)-1).click();
        await page.locator("//abbr[text()='"+Date+"']").click();
        const input=await page.locator(".react-date-picker__inputGroup__input");
        for (let i=0;i< expecteddate.length;i++){
        const actual= await input.nth(i).inputValue();
        expect(actual).toEqual(expecteddate[i]);

 
        }







});