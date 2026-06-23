const {test, expect} = require('@playwright/test');
class OrderHistoryPage{

constructor(page){

this.page=page;
this.myorder=page.locator("button[routerlink*='myorders']");
this.waitpage=page.locator("tbody");
this.orderlist=page.locator("tbody tr");
this.orderdetails=page.locator(".col-text");

}

async navigatetoorders(){
await this.myorder.click();
await this.waitpage.waitFor();

}
async getOrderProduct(orderid){
const listing=await this.orderlist;
for(let i=0;i< await listing.count();++i){
const orders=await listing.nth(i).locator("th").textContent();
if(orderid.includes(orders)){
await listing.nth(i).locator("button").first().click();
break;
}
}


}

async orderSummary(orderid){
const orderdetail=await this.orderdetails.textContent();
expect(orderid.includes(orderdetail)).toBeTruthy();



}
}
module.exports={OrderHistoryPage};



















