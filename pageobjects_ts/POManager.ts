
//const{Loginpage}=require('./Loginpage')
import{Loginpage} from './Loginpage';
//const{Dashboardpage}=require('./Dashboardpage')
import{Dashboardpage}from './Dashboardpage';
import{Page}from "@playwright/test";

export class POManager{
    
    loginpage:Loginpage;
    Dashboardpages:Dashboardpage;
    page:Page;


constructor(page:any){
this.page=page;
this.loginpage =  new Loginpage(this.page);
this.Dashboardpages= new Dashboardpage(this.page);


}


 gotologinpage(){

return this.loginpage;

}
 gotodashboardpage(){

return this.Dashboardpages;


}




}
module.exports={POManager};