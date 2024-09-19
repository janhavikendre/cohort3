
const express = require('express');
const { Todomodel } = require('../db');
const { auth } = require('../middleware');
const { z } = require('zod');
const app = express.Router();
app.post('/todo',auth,async function(req,res){
    try{

        const requiredbody = z.object({
            title : z.string().min(1).max(3),
            description:z.string()
        })
    
        const parsedbody = requiredbody.safeParse(req.body);
    
        if(!parsedbody.success){
            return res.status(400).json({
                error:parsedbody.error,
                message:"You have entered wrong body"
            })
        }
    

      const title = req.body.title;
      const done = req.body.done;
      const userId = req.userId;
      const description = req.body.description

      const todo =await Todomodel.create({
        title,
        done,
        userId,
        description
      })

      res.status(200).json({
        userId,
        todoid :  todo._id,
        todo
      })
    }catch(e){
        console.error(e)
    }
})

app.get('/todo',auth,async function(req,res){
    try{
     const userId = req.userId;
     const todo = await Todomodel.find({userId});
     res.json({
        todo
     })
    }catch(e){
            console.log(e)
    }
})

app.get('/todo/:id',auth,async function(req,res){
  try{
    const userId = req.userId;
    const todoid = req.params.id;

    const todo = await Todomodel.find({_id:todoid,userId});

    if(!todo) return res.status(404).json({message:"Todo not found"})
    res.json({
        todo
    })
  }catch(e){
    console.error(e);
  }
})

app.put('/update/:id',auth,async function(req,res){
  try{

   
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;
    const Todoid = req.params.id;
    const description = req.body.description;

    const todo = await Todomodel.findOneAndUpdate(
        {_id:Todoid,userId},
        {title,done,description},
        {new:true}
    )

    // const todo = await Todomodel.findByIdAndUpdate(
    //     Todoid,
    //     {title,done},
    //     {new:true}
    // )

    if(!todo){
        return res.status(404).json({
            message:"Todo not found"
        })
    }

    res.json({
       message:"Todo updated successfully",
        todo
    })

  }catch(e){
   console.error(e);
   res.status(500).json({message:"Internal server error"})
  }
})
app.delete('/todo/:id',auth,async function(req,res){
    try{

        const userId = req.userId;
        const todoid = req.params.id;
    
        const todo = await Todomodel.findOneAndDelete({_id:todoid,userId});
    
        if(!todo){
            return res.status(404).json({
                message:"Todo not found"
            })
        }
        res.json({
            message:"Todo delted successfully"
        })
    }catch(e){
        console.error(e)
    }
})

module.exports = app;