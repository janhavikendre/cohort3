const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());
const JWT_SECRET = "kahi";
app.use(express.json());

const users = [];
const todo = [];

app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username,
        password
    })
    res.status(200).send({
        message : "User signed up"
    })
})

app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const founUser = users.find(user=>user.username == username && user.password == password);

    if(!founUser){
        return res.status(401).send({
            message:"Credentials incorrect"
        })
    }

    const token = jwt.sign({
        username : founUser.username
    },JWT_SECRET)

    founUser.token = token;

    res.send({
        token
    })
})

function auth(req,res,next){
    const token = req.headers.token;

    if(!token){
        res.status(401).send({message:"Token is missing"})
    }
    try{
       const decodedata = jwt.verify(token,JWT_SECRET);
       req.usernamem= decodedata.username;
       next()
    }catch(e){
        res.status(404).send({message:'Invalid credential'})
    }
}

app.get('/total',auth,(req,res)=>{
    const user = users.find(u=>u.username == req.username);
    if(user){
        res.send({
            username : user.username
        })
    }else{
        res.status(404).send({
            message:"User not found"
        })
    }
})

app.post('/todo',auth,(req,res)=>{
    const {title,description} = req.body;
    const newtodo = {id: todo.length +1,username:req.username,title,description};

    todo.push(newtodo)
    res.status(201).send({
        message :"Todo - created",todos:newtodo
    })
})

app.get('/todo',auth,(req,res)=>{
 const userTodos = todo.filter(todos => todos.username == req.username);
 res.send(userTodos)
})

app.put('/todo/:id',auth,(req,res)=>{
    const todoId = parseInt(req.params.id);
    const {title,description} = req.body;

    const todos = todo.find(u=>u.id == todoId && u.username == req.username);
    if(todos){
        todos.title = title;
        todos.description = description;
        res.send({
            message : "Todo update",todos
        })
    }else{
        res.status(404).send({
            message:"Todo not found or not authorized"
        })
    }
})

app.delete('/todo/:id',auth,(req,res)=>{
    const todoId = parseInt(req.params.id);
    const todoindex = todo.findIndex(u=>u.id == todoId && u.username == req.username);
    if(todoindex !== -1){
        todo.splice(todoindex,1);
        res.send({message:"Todo delted"})
    }else{
        res.status(404).send({message:"Todo not found or not authorized"})
    }
})

app.listen(3000)