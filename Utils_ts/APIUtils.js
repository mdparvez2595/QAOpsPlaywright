class APIUtils{

constructor(apicontext,payload){

this.apicontext=apicontext;
this.payload=payload;

}

async gettoken() {
    const loginresponseAPI = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.payload
        }
    )
    const responsecode = await loginresponseAPI.json(); 
    const token=responsecode.token;
    console.log(token);
    return token;
}
async createorder (orderpayload){
     let response = {};
    response.token=await this.gettoken();
const orderresponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
   

        {
            data:orderpayload,
            headers:
            {
                'authorization':response.token,
                'content-type':'application/json'
            }
        });
      const orderres = await  orderresponse.json();
      const orderId= orderres.orders[0];
       response.orderId=orderId;
      console.log(orderId);
      return response;

} 
}
module.exports={APIUtils};