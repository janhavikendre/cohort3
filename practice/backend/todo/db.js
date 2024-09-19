const mongoose = require('mongoose');

const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const user = new mongoose.Schema({
    email: {type:String,unique : true},
    password : String,
    name : String
})

const Todo = new mongoose.Schema({
    title: String,
    done: Boolean,
    description:String,
    userId : ObjectId
})

const Usermodel = mongoose.model('users',user);
const Todomodel = mongoose.model('todo',Todo);

module.exports= {
    Usermodel : Usermodel,
    Todomodel: Todomodel
}