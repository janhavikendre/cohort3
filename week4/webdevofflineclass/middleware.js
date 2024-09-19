const express = require('express');
const app = express();

// function isoldEnough(age){
//     if(age>=14){
//         return true;
//     }else{
//         return false
//     }
// }

function isoldEnoughmidddleware(req,res,next){
    const age = req.query.age;
    if(age>=14){
        next();
    }else{
        res.json({
            msg:"Soory you are not of age"
        })
    }
}
app.use(isoldEnoughmidddleware)

// app.get('/ride',isoldEnoughmidddleware,function(req,res){
app.get('/ride',function(req,res){
    // if(isoldEnough(req.query.age)){
    res.json({
        msg:"you have successfully ride the ride 1"
    })
// }else{
//     res.status(411).json({
//         msg:"Sorry you are not of your age"
//     })
// }
})

// app.get('/ride1',isoldEnoughmidddleware,function(req,res){
app.get('/ride1',function(req,res){
    // if(isoldEnough(req.query.age)){
    res.json({
        msg:"you have successfully ride the ride 2"
    })
// }else{
//     res.status(411).json({
//         msg:"Sorry you are not of your age"
//     })
// }
})
app.listen(3000)