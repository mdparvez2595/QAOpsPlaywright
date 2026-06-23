const {test, expect} = require('@playwright/test');



class Dashboardpage{

constructor(page){
  this.page=page;
    this.product= page.locator(".card-body");
    this.productsName=page.locator(".card-body b");
  this.cart= page.locator("[routerlink*='cart']");





}

async searchproduct(productName){
    await this.product.first().waitFor();
const items=await this.productsName.allTextContents();
console.log(items);
const count=await this.product.count();
for (let i=0 ;i < count ; ++i)
{
if(await this.product.nth(i).locator("b").textContent()===productName)
{
await this.product.nth(i).locator("text= Add To Cart").click();
break;
}

}



}

async navigatetocart(){

await this.cart.click();

}
}
module.exports={Dashboardpage};