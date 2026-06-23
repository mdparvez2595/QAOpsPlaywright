import{test as baseTest}from'@playwright/test';
interface TestDataForOrders {
 userName: string;
 password: string;
 productName: string;
}
export const customTest=baseTest.extend<{testDataForOrders:TestDataForOrders}>(
{
testDataForOrders:{

userName:"mohamedparvez22@gmail.com",
password:"Test@123",
productName:"iphone 13 pro"



}







})