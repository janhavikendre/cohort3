const express = require('express');
const app = express();
app.use(express.json());
var user = [{
    name:"Yash",
    kidney:[
        {
            healthy:false,
        }
    ]
}]

app.get('/',function(req,res){
    const yashkidney = user[0].kidney;
    const numberofkidneys = yashkidney.length;
    let numberofhealthykidneys = 0;
    for(let i=0;i<numberofkidneys;i++){
        if(yashkidney[i].healthy){
            numberofhealthykidneys= numberofhealthykidneys+1;
        }
    }
    const numberofunhealthykidneys = numberofkidneys - numberofhealthykidneys;
    res.json({
        numberofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidneys,
    })
})

app.post('/',function(req,res){
 const ishealthy = req.body.ishealthy;
 user[0].kidney.push({
    healthy:ishealthy==true,
 })
 res.json({
    kidney:user[0].kidney
 })
})

app.put('/',function(req,res){
    for(let i=0;i<user[0].kidney.length;i++){
        user[0].kidney[i].healthy=true;
    }
    res.json({
        kidney:user[0].kidney
    })
})

function isthereAtLeastOneUnhealthyKidney(){
    let atleastOneUnHealthyKidney = false;
    for(let i=0;i<user[0].kidney.length;i++){
        if(!user[0].kidney[i].healthy){
            atleastOneUnHealthyKidney = true
        }
    }
    return atleastOneUnHealthyKidney;
}

app.delete('/',function(req,res){
    if(isthereAtLeastOneUnhealthyKidney()){
        const newkideny = [];
        for(let i =0;i<user[0].kidney.length;i++){
            if(user[0].kidney[i].healthy){
                newkideny.push({
                    healthy:true
                })
            }
        }
        user[0].kidney = newkideny;
        res.json({
            msg:"done"
        })
    }else{
        res.status(411).json({
            msg:"You have no bad kidneys"
        })
    }
})

app.listen(5000)
