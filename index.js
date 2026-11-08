const dns = require('node:dns');
dns.setServers(['1.1.1.1','8.8.8.8']);
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const todoSchema = require('./model/todoModel');

mongoose.connect('mongodb+srv://akash75:mnw6kevWY3MxnFg2@cluster0.iz6tr2d.mongodb.net/task')
.then( () => console.log('connect!!'))

app.get("/", (req,res) =>{
    res.json({
        message : "Data go to frontnd"
    });
});

app.post("/create/todo", (req,res) =>{
    let {user_task,user_priority} = req.body;
    if(!user_task){
        return res.send('task required')
    };
    let createTodo = new todoSchema({
        user_task : user_task,
        user_priority : user_priority
    });
    createTodo.save();
    res.json({
        message : 'task completed'
    });   
});

function secuarity(req,res,next){
    if(req.headers.authorization == '23490'){
        next();
    }else{
        res.send('you ar az fake')
    };
};

app.get('/all-data',secuarity, async (req,res) =>{
    let allData = await todoSchema.find({});
    res.send(allData)
});


app.delete('/delete/todo/:id', async (req,res) =>{
     let {id} = req.params;
     let todoDelete = await todoSchema.findByIdAndDelete(id);
     res.send('Delete todo');
});
app.post('/update-todo/:id', async (req,res) =>{
      let {id} = req.params;
      let updateTodo = await todoSchema.findByIdAndUpdate({_id : id},req.body,{returnDocument : 'after'});
      res.send(updateTodo);
});

app.listen(5000,()=>{
    console.log("Server Running")
});