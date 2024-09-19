const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "kahi";
const app = express()
app.use(express.json());

const users = [];

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post('/signup',function(req,res){
    try{
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    })

    res.status(200).send({
        message:"You have signed up"
    })
}catch(error){
    res.status(400).send({
        message:"Failed to login"
})
}
})

app.post('/signin',function(req,res){
 try{
    const username = req.body.username;
    const password = req.body.password;

    const founduser = users.find(user=>user.username === username && user.password === password);

    if(!founduser){
        return res.status(401).send({
            message:"Credentials incorrect"
    })
    }else{
        const token = jwt.sign({
            username:founduser.username
        },JWT_SECRET);
        founduser.token = token
        res.send({
            token,
            username:founduser.username
    })
    }
 }catch(error){
    res.status(401).send({
        message:"Something went wrong"
    })
 }
})

function auth(req,res,next){
    const token = req.headers.token;

    if(!token){
        return res.status(401).send({message:"Token is missing"});
    }
    
    try{
     const decodedData = jwt.verify(token,JWT_SECRET);
     req.username = decodedData.username;
     next();
    }catch(error){
     res.status(401).send({message:"Invalid token"})
    }
}

app.get('/me',auth,function(req,res){
    try{
    const founduser = users.find(u=>u.username == req.username)
    if(founduser){
        res.send({
            username:founduser.username
        })
    }else{
        res.status(404).send({
            message:"User not found"
    })
    }}catch(error){
    res.status(404).send({message:"something went wrong"});
    console.log(error)
    }
})

app.listen(3000,()=>{
    console.log("app is listeing to port 3000")
})