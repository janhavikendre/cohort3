const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'USER_APP'
const app = express();
app.use(express.json());

const users = [];


app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    })
    res.send({
        messsage:"signed up"
    })
})

app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(user=>user.username === username && user.password === password);
    if(user){
        const token = jwt.sign({
            username:user.username
        },JWT_SECRET);

        user.token = token;
        res.send({
            token
        })
        console.log(users);
    }else{
        res.status(403).send({
            messsage:"Invalid username or password"
        })
    }
})

app.get('/me',(req,res)=>{
    const token = req.headers.authorization;
    const userDeatils = jwt.verify(token,JWT_SECRET);

    const username = userDeatils.username;
    const user = users.find(user=>user.username == username);
    if(user){
        res.send({
            username:user.username
        })
    }else{
        res.status(401).send({
            messsage:"Unauthorized"
        })
    }

})


app.listen(3000);