const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_sectrte = "kahi"
app.use(express.json());

const users =[];

app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
})

    res.status(200).send({
        message:"Users signed up"
    })
})

app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    let founduser = null;

    for(let i=0;i<users.length;i++){
        if(users[i].username== username && users[i].password == password){
            founduser = users[i]
        }

    }

    if(!founduser){
        res.json({
            message:"Credetinals incorrect"
    })
    return
    }else{
        const token =jwt.sign({
            username:founduser.username
        },JWT_sectrte) 
        founduser.token = token;
        res.send({
            token
        })
        console.log(users)
    }
})

app.get('/me',function(req,res){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_sectrte);

    if(decodedData.username){
        let founduser = null;

        for(let i=0;i<users.length;i++){
            if(users[i].username == decodedData.username){
                founduser = users[i]
            }
        }

        res.send({
            username:founduser.username
        })
    }
})

app.listen(3000)