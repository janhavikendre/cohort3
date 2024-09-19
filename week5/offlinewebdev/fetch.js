// function main(){
//  fetch('https://dummyjson.com/todos')
//   .then(async response=>{
//     const json = await response.json()
//     console.log(json)
//     console.log(json.todos.length)
//   })

// }
// main()

// async function main(){
//  const response = await   fetch('https://dummyjson.com/todos')
     
//  const json = await response.json()
//  console.log(json)
//  console.log(json.todos.length)
//    }
//    main()

//postmethod

// async function main(){
//     const response = await   fetch('https://www.postb.in/1726307846000-1974139597732',{
//         method:"POST"
//     })
        
//     const data = await response.text()
//     console.log(data)
   
//       }
//       main()

//authorization

async function main(){
    const response = await   fetch('https://www.postb.in/1726307846000-1974139597732',{
        method:"POST",
        body:{
            username : "Yash",
            password : "234"
        },
        headers:{
            "Authorization": "Bearer 123"
        }
    })
        
    const data = await response.text()
    console.log(data)
   
      }
      main()