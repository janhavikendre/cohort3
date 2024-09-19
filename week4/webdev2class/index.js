const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send("Hello world");
})
app.post('/',function(req,res){
    res.send("Hello world from post")
})
app.listen(3000,function(){
    console.log("you code is running")
});