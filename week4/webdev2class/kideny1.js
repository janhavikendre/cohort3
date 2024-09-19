const express = require('express');
const app = express();
app.use(express.json());
const user=[{
    name:'janhavi',
    kidney:[{
        healthy:false
    }]
}]

app.get('/janhavi',function(req,res){
    const janhavichikidney = user[0].kidney;
    const numberofjanhavichyakidney= janhavichikidney.length;
    let janhavichyachanglyakidney = 0;
   for(let i=0;i<numberofjanhavichyakidney;i++){
    if(janhavichikidney[i].healthy){
        janhavichyachanglyakidney = janhavichyachanglyakidney+1;
    }
   }
   janhavichyakharabkidnya = numberofjanhavichyakidney - janhavichyachanglyakidney;
   res.json({
    janhavichikidney,
    numberofjanhavichyakidney,
    janhavichyachanglyakidney,
    janhavichyakharabkidnya,
   })
})

app.post('/janhavi',function(req,res){
    const isHealthy = req.body.isHealthy;//{"ishealthy":true}
    user[0].kidney.push({
        healthy:isHealthy===true,
    })
    res.json({
        msg:"Done",
        janhavi:user[0].kidney
    })
})

app.put('/janhavi',function(req,res){
    for(let i=0;i<user[0].kidney.length;i++){
        user[0].kidney[i].healthy=true;
    }
    res.json({
        msg:"done",
        kidney:user[0].kidney,
    })
})

function isthereanyunhealthykideny(){
    let anyoneunhealthykideny=false;
    for(let i=0;i<user[0].kidney.length;i++){
        if(user[0].kidney[i].healthy){
            anyoneunhealthykideny = true
        }
    } 
    return anyoneunhealthykideny;
}

app.delete('/',function(req,res){
    const newkideny =[];
    if(isthereanyunhealthykideny()){
        for(let i=0;i<user[0].kidney.length;i++){
            if(user[0].kidney[i].healthy){
             newkideny.push({
                healthy:true
             })
            }//{newkideny:[healthy:true,healthy:true]}
            //{heathy:true,healthy:true}
        }
        user[0].kidney= newkideny
        res.json({
            msg:"done"
        })
    }else{
        res.status(411).json({
            msg:"no bad kidneys"
        })
    }
})


app.listen(3000,function(){
    console.log("janhavi chya kidnya vali server run hoyli 3000 vr")
})
