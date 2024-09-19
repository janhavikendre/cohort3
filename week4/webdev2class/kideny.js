const express = require('express');
const app = express();
app.use(express.json())

var user = [{
    name:"Yash",
    kidney:[
        {
            healthy:false,
        }
    ]

}]

app.get('/',function(req,res){
    const yashkideny= user[0].kidney;
    const numberofkidenys = yashkideny.length;
    let numberofhealthykidenys =0;
    for(let i=0;i<numberofkidenys;i++){
        if(yashkideny[i].healthy){
            numberofhealthykidenys= numberofhealthykidenys+1;
        }
    }
    const numberofunhealthykidneys = numberofkidenys-numberofhealthykidenys;
res.json({
    numberofkidenys,
    numberofhealthykidenys,
    numberofunhealthykidneys,
})    

})
app.post('/',function(req,res){
    const isHealthy = req.body.isHealthy;
    user[0].kidney.push({
        healthy:isHealthy===true,
    })
    res.json({
        msg:"Done !",
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
    let atleastOneUnhealthyKidney = false;
    for(let i=0;i<user[0].kidney.length;i++){
        if(!user[0].kidney[i].healthy){
            atleastOneUnhealthyKidney=true;
        }
    }
    return atleastOneUnhealthyKidney;
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


app.listen(3000)