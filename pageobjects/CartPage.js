const {test, expect} = require('@playwright/test');
class CartPage{


constructor(page){
this.page=page;
this.checkout=page.locator("text=Checkout")
this.productName=page.locator("div li")

}





async findProduct(){

await this.productName.first().waitFor();

}

async productisvisible(productName){
const bool=await this.getProductLocator(productName).isVisible();
expect(bool).toBeTruthy();
}

getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}
async checkoutCart(){

await this.checkout.click();
}



}
module.exports={CartPage};