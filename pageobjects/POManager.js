
const{Loginpage}=require('./Loginpage')
const{Dashboardpage}=require('./Dashboardpage')
const{CartPage}=require('../pageobjects/CartPage');
const{OrderReviewPage}=require('../pageobjects/OrderReviewPage');
const{OrderHistoryPage}=require('../pageobjects/OrderHistoryPage');

class POManager{

constructor(page){
this.page=page;
this.loginpage =  new Loginpage(this.page);
this.Dashboardpages= new Dashboardpage(this.page);
this.ordersHistoryPage = new OrderHistoryPage(this.page);
this.ordersReviewPage = new OrderReviewPage(this.page);
this.cartPage = new CartPage(this.page);

}

 gotologinpage(){

return this.loginpage;

}
 gotodashboardpage(){

return this.Dashboardpages;


}
selectproductcheckout(){
return this.cartPage;
}
verifyorderpage(){
return this.ordersReviewPage;
}

ordershistorypage(){
return this.ordersHistoryPage;
}




}
module.exports={POManager};