const brcypt = require('bcrypt')
const {z} = require('zod')
const express = require('express');
const jwt = require('jsonwebtoken');
const { Usermodel } = require('../db');
const JWT_SECRET = "secret";

const app = express.Router()

app.post('/signin',async function(req,res){
    try{
     const requiredbody = z.object({
        email: z.string().min(3).max(100).email()
     })
     
     const parseedDataWithSuccess = requiredbody.safeParse(req.body);
      
     if(!parseedDataWithSuccess.success){
        res.json({
            message:"You have entered wrong credentials ",
            error : parseedDataWithSuccess.error
        })
        return

     }

        const email = req.body.email;
        // const password = req.body.password;
    
      const user =  await Usermodel.findOne({
            email:email,
            // password:password,
        })
    
        if(user){
            const token = jwt.sign({
               id : user._id.toString()
            },JWT_SECRET)
            res.status(200).send({
                message: "you have signed in successfully",
                token,
                user
            })
        }else{
            res.status(403).json({
                message:"Incoorect credentials"
            })
        }
    }catch(e){
        console.error(e)
    }

})

module.exports = app