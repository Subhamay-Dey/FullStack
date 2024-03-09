const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const cors = require('cors');
const todoModel = require("./Todo");

const port = 3000 || process.env.port

app.use(bodyParser.json());
app.use(cors());

async function updateTodo (req, res) {
    const todo = new todoModel({
        id: Math.random().toString(36).substring(2,9),
        title: req.body.title,
        description: req.body.description,
    })
    try{const result = await todo.save();
        res.status(201).json(result);}
    catch(error){res.status(400).json({message:"Error in Todo creation"})}
}

async function findTodo (req, res) {
    try{
        const findTodo = await todoModel.find();
        res.json(findTodo)
    }
    catch(error){
        res.status(500).json({message:'Server Error'})
    }
}

async function deleteTodo (req, res){
    try{
        const removeTodo = await todoModel.findByIdAndDelete(req.params.id);
        if(!removeTodo){
            return res.status(404).json({message:"No todo with the given ID was found"});
            res.json(removeTodo)
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

app.get("/todo", findTodo);


app.listen(port,() => {
    console.log(`Server is running on ${port}`);
})