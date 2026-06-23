import{test,expect,Locator,Page}from'@playwright/test';
export class Loginpage{
page:Page;
userName:Locator;
password:Locator;
signIn:Locator;
    

constructor(page:Page){

    this.page=page;
    this.userName= page.locator("#userEmail");
    this.password=page.locator("#userPassword");
    this.signIn=page.locator("#login");

}

async goTo(){

await this.page.goto("https://rahulshettyacademy.com/client");


}


async validLogin(username:string,password:string){

await this.userName.fill(username);
await this.password.fill(password);
await this.signIn.click();
await this.page.waitForLoadState('networkidle');


}



}
module.exports={Loginpage};