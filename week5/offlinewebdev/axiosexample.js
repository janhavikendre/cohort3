// in a get request second argument should not be body
//in all other request second argument can be anything

const axios = require('axios');
async function main(){
    const response = await axios.post("https://httpdump.app/dumps/b149282c-a906-47ab-9581-e1281bb39b55",{
        username : "Yash",
        password : "123"
    },{
          headers :{
            "Authorization":"Bearer 123"
          }
    });
    console.log(response.data);
}
main()
