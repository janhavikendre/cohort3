const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const app = express();
app.use(cors())
const JWT_SECRET = 'kahi';
app.use(express.json());

const users = [];
const todo = [];

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

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

    const foundUser = users.find(user=>user.username == username && user.password== password);

    if(!foundUser){
        return res.status(401).send({
            message : "Credentials incorrect"
        })
    }

    const token = jwt.sign({
        username : foundUser.username
    },JWT_SECRET)

    foundUser.token = token;

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
        const decodeddata = jwt.verify(token,JWT_SECRET);
        req.username = decodeddata.username;
        next()
    }catch(e){
        res.status(404).send({message:'invaid credentials'})
    }
}

app.get('/total',auth,(req,res)=>{
    const user = users.find(u=>u.username== req.username )
    if(user){
        res.send({
            username :user.username
        })
    }else{
        res.status(404).send({
            message:"User not foun"
        })
    }
})

app.post('/todo',auth,(req,res)=>{
    const {title,description} = req.body;
    const newtodo = {id : todo.length+1,username:req.username,title,description};

    todo.push(newtodo);
    res.status(201).send({
        message:"To-created" ,todos: newtodo
    })
})

app.get('/todo',auth,(req,res)=>{
 const userTodos = todo.filter(todos => todos.username == req.username);
 res.send(userTodos);
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
            message:"Todo not found or not authprized"
        })
    }
})

app.delete('/todo/:id',auth,(req,res)=>{
    const todoId = parseInt(req.params.id);

    const todoIndex = todo.findIndex(u=>u.id == todoId && u.username == req.username);
    if(todoIndex !== -1){
        todo.splice(todoIndex,1);
        res.send({message:"Todo delted"})
    }else{
        res.status(404).send({message:"Todo not found or not authorized"})
    }
})

app.listen(3000,()=>{
    console.log('app is listeing on 3000 port')
})