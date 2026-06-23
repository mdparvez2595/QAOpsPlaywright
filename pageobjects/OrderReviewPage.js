const {test, expect} = require('@playwright/test');
class OrderReviewPage{
constructor(page){

this.page=page;
this.carddetails=page.locator('.input.txt.text-validated');
this.dropdown= page.locator(".ta-results")
this.entercountry=page.locator("[placeholder*='Country']");
this.email=page.locator(".user__name [type='text']");
this.placeorders=page.locator(".action__submit");
this.thankyou=page.locator(".hero-primary");
this.getid=page.locator(".em-spacer-1 .ng-star-inserted");
}



async entercard(cardno){
await this.carddetails.first().fill(cardno);

}

async selectcountry(country){


await this.entercountry.pressSequentially(country);
//const dropdown= page.locator(".ta-results");
await this.dropdown.waitFor();
const options=await this.dropdown.locator("button").count();
for (let i=0;i< options;++i)
{
const text=await this.dropdown.locator("button").nth(i).textContent();
console.log(i);
if(text ===" India"){
await this.dropdown.locator("button").nth(i).click();
break;
}
}

}
async verifymailId(email){

expect(this.email.first()).toHaveText(email);
}

async placeorder(){
await this.placeorders.click();
}
async getOrderId(){
expect(this.thankyou).toHaveText(" Thankyou for the order. ");
const orderid=await this.getid.textContent();
console.log(orderid);
return orderid
}

}
module.exports={OrderReviewPage}