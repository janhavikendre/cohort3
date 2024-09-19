const express = require('express');
const app = express();

let todos = [];
let currentId = 1;


app.use(express.json());


app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const newTodo = {
    
        id:currentId++, 
        title,
        description,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});


app.get('/todos', (req, res) => {
    res.json(todos);
});


app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    if (!todo) return res.status(400).json({ error: "Task not present" });
    res.json(todo);
});


app.put('/todos/:id',(req,res)=>{
    const index = todos.findIndex(t=>t.id == req.params.id);
    if (index === -1) return res.status(404).json({error:'Task not found'});

    todos[index] = {...todos[index],...req.body};
    res.json(todos[index])
})


app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    todos.splice(index, 1);
    res.status(204).end();
});

app.listen(3000);
