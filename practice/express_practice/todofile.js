const { error } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const FILE_PATH = './todos.json';

function readTodos(){
    if(!fs.existsSync(FILE_PATH)){
        return [];
    }
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
}

function writeTodos(todos){
    fs.writeFileSync(FILE_PATH,JSON.stringify(todos,null,2));
}

app.post('/',function(req,res){
    const {title,description}=req.body;
    const todos = readTodos();
    const newtodo={
        id:todos.length ? todos[todos.length-1].id +1 :1,
        title,
        description,
    };
    todos.push(newtodo);
    writeTodos(todos);
    res.status(201).json(newtodo)
})

app.get('/todos',function(req,res){
    const todos = readTodos();
    res.json(todos);
})

app.get('/todos/:id',function(req,res){
    const todos = readTodos();
    const todo = todos.find(t=>t.id== req.params.id);
    if(!todo) return res.status(400).json({error:"Task not present"});
    res.json(todo)
})
app.put('/todos/:id',function(req,res){
    const todos = readTodos();
    const index = todos.findIndex(t=>t.id === req.params.id);
    if(index === -1) return res.status(400).json({error:"Task not present"})
  
     todos[index] = {...todos[index],...req.body};
     writeTodos(todos);
     res.json(todos[index])   

})
app.delete('/todos/:id',function(req,res){
    let todos = readTodos();
    const index = todos.findIndex(t=>t.id === req.params.id);
    if(index === -1) return res.status(404).json({error:"Task not found"})

    todos = todos.filter(t=>t.id != req.params.id);
    writeTodos(todos);
    res.status(204).end();

})
app.listen(3000)