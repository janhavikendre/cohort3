const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRETE = "kAHI";
const {Usermodel,Todomodel} = require('./db');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json())


mongoose.connect('mongodb+srv://Janhavi:Janhavi123@cluster0.dikjsg6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


app.post('/signup',async function(req,res){
    try{
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name
 
       await Usermodel.create({
               email:email,
               password:password,
               name:name
        })
 
        res.json({
         message :"You are logged in"
        })
    }catch(e){
        console.error(e)
    }
       
})


app.post('/signin',async function(req,res){
    try{
        const email = req.body.email;
     const password = req.body.password;

     const user = await Usermodel.findOne({
        email: email,
        password : password
     })

     console.log(user)

     if(user){
        const token = jwt.sign({
              id: user._id.toString()
        },JWT_SECRETE)
        res.json({
   token
        })
     }else{
        res.status(403).json({
     message : "Incoorect credientials"
        })
     }
    }catch(e){
        console.error(e)
    }
    
})

app.post('/todo',auth,async function(req,res){
    try{
         const title = req.body.title
        const userId = req.userId
        const done = req.body.done
        const Todo = await Todomodel.create({
         title,
         done,
         userId
      })
        res.json({
          userId:userId,
          Todo
        })
    }catch(e){
      console.error(e)
    }
})
app.get("/todo", auth, async function(req, res) {
    try{
        const userId = req.userId;

        const todos = await Todomodel.find({
            
            userId
        });
    
        res.json({
            todos
        })
    }catch(e){
        console.error(e)
    }
  
});

function auth(req,res,next){
    const token = req.headers.token;

    const decodedata = jwt.verify(token,JWT_SECRETE);

    if(decodedata){
        req.userId = decodedata.id
        next();
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
}

app.listen(3000,()=>{
    console.log("App is running on 3000 port")
})