const express = require('express');
const { Usermodel } = require('../db');
const { z } = require('zod');
const app = express.Router();
const bcrypt = require('bcrypt');

app.post('/signup',async function(req,res){
    try{
         
        const requiredbody = z.object({
            email:z.string().min(3).max(100).email(),
            password: z.string().min(3).max(100),
            name:z.string().min(3).max(30)
        })

        const parsedbody = requiredbody.safeParse(req.body);

        if(!parsedbody.success){
            res.json({
                message:"You have entered worng credentials",
                error: parsedbody.error
            })
            return
        }



        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        const hashedpassowrd = await bcrypt.hash(password,5)
    
    const user =    await Usermodel.create({
            email:email,
            password:hashedpassowrd,
            name:name
        })
    
        res.json({
            message : "You are signed up",
            User : user
        })
    }catch(e){
        console.error(e)
    }
})

module.exports = app;