const express = require('express');
const app = express();
app.use(express.json());

app.get('/add',function(req,res){
    a= parseInt(req.query.a);
    b=parseInt(req.query.b);

    res.json({
        ans: a + b
    })
})
app.get('/add1/:a/:b',function(req,res){
    a = parseInt(req.params.a);
    b= parseInt(req.params.b);
    res.json({
        ans:a+b
    })
})

app.get('/subtract',function(req,res){
    a = req.query.a;
    b=req.query.b;

    res.json({
        ans:a-b
    })
})

app.get('/subtract1',function(req,res){
    a = req.params.a;
    b= req.params.b;
    res.json({
        ans:a-b
    })
})

app.get('/multiply',function(req,res){
    a = req.query.a;
    b= req.query.b;
    res.json({
        ans:a*b
    })
})

app.get('/multiply1',function(req,res){
    a = req.params.a;
    b= req.params.b;
    res.json({
        ans:a*b
    })
})

app.get('/divsion',function(req,res){
    a = req.query.a;
    b=req.query.b;
    res.json({
        divison:a/b
    })
})

app.get('/divsion1',function(req,res){
    a= req.params.a;
    b= req.params.b;
    res.json({
        ans:a/b
    })
})


app.listen(3000)
