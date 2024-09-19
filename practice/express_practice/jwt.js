const express = require("express");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Yash";
const app = express();
app.use(express.json());
const users =[];

app.post('/signup',(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username,
    password
  })
  res.send({
    message:"Signed up"
  })
})

app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(users=>user.username === username && user.password === password);
    if(user){
        const token = jwt.sign({
            username:user.username
        },username);
        user.token = token
        res.send({
            token
        })
        console.log(user)
    }else{
        res.status(403).send({
            message:"Invalid username or password"
        })
    }
})

app.get('/me',(req,res)=>{
    const token = req.headers.authorization;
    const userdetails = jwt.verify(token,JWT_SECRET);
    const username = userdetails.username;
    const user = users.find(users=>user.username=== username);
    if(user){
        res.send({
            username:user.username
        })
    }else{
        res.status(401).send({
            message:"Unauthorized"
        })
    }
})
app.listen(3000)
