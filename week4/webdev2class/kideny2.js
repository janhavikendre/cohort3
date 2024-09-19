const express = require('express');
const app = express();
app.use(express.json())
var user =[{
    name:"yash",
    kideny:[{
        healthy:true,
    }]
}]
app.get('/',function(req,res){
    const yashkideny = user[0].kideny;
    const numberofkidenys = yashkideny.length;
    let healthykidney = 0;
    for(let i=0;i<numberofkidenys;i++){
        if(user[0].kideny[i].healthy){
            healthykidney= healthykidney+1
        }

    }
    const numberofunhealthykidneys  = numberofkidenys - healthykidney;
    res.json({
        numberofkidenys,
        healthykidney,
        numberofunhealthykidneys,
    })
})

app.post('/',function(req,res){
    const ishealthy = req.params.ishealthy;
   user[0].kideny.push({
    healthy:ishealthy=== true,
   })
   res.json({
    msg:"Done",
    kideny:user[0].kideny
})
})

app.put('/',function(req,res){
    for(let i=0;i<user[0].kideny.length;i++){
        user[0].kideny[i].healthy=true
    }
    res.json({
       kidney: user[0].kideny
    })

})

function isthereanyunhealthykideny(){
    let atthereanyunhealthykideny=0
    
}