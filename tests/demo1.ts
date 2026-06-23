
import{expect,type Locator,type Page}from '@playwright/test';
let message1 :string ="Hello";
message1 ="Bye";
console.log(message1);

let age:number =5;
let isActive:boolean=true;

let number:number []=[10,20,30];

let data :any="Complete the test";
data=42;

function add(a:number,b:number){
    return a+b;
}

add(3,2);
let user2 :{name:string,age:number,location:string}={name:"bob",age:34,location:"Chennai"};
console.log(user2);
user2.location="hyderabad";

class Dashboardpage{

page: Page;
product:Locator;
productsName:Locator;
cart:Locator;

constructor(page:any){
    this.page=page;
    this.product= page.locator(".card-body");
    this.productsName=page.locator(".card-body b");
  this.cart= page.locator("[routerlink*='cart']");





}

async searchproduct(productName:String){
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




