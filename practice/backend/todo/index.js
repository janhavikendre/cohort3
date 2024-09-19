const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const JWT_SECRET = 'secret';

mongoose.connect('mongodb+srv://Janhavi:Janhavi123@cluster0.dikjsg6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const signupRoute = require('./routes/signup');
const signinRoute = require('./routes/signin');
const todoRoute = require('./routes/todo');

app.use(signupRoute);
app.use(signinRoute);
app.use(todoRoute)

app.listen(3000)
