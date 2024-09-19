// const axios = require('axios');
// async function main(){
//     const response = await axios.get("https://dummyjson.com/todos");
//     //response.data
//     console.log(response.data.todos)
//     console.log(response.data.todos.length)
// }
// main()

//postmethod

// const axios = require('axios');
// async function main(){
//     const response = await axios.post("https://www.postb.in/1726307846000-1974139597732");
//     console.log(response.data);
// }
// main()

//Authorization

//body can be the second argument which can be send means arugemnt
//right next to api or url 
//and ani key after the body like headers and all
const axios = require('axios');
async function main(){
    const response = await axios.post("https://www.postb.in/1726307846000-1974139597732",{
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
