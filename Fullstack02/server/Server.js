const express = require('express');
const panauti = express();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const cors = require('cors');
const todoModel = require("./Todo");

const port = 8080 || process.env.port

panauti.use(bodyParser.json());
panauti.use(cors());

async function updateTodo (req, res) {
    const todo = new todoModel({
        // id: Math.random().toString(36).substring(2,9),
        title: req.body.title,
        description: req.body.description,
    })
    try{const result = await todo.save();
        res.status(200).json(result);}

    catch(error){res.status(404).json({message:"Error in Todo creation"})}
}

async function findTodo (req, res) {
    try{
        const findtodo = await todoModel.find();
        res.status(200).json(findtodo)
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
        }
        res.json(removeTodo)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

panauti.get("/todo", findTodo);
panauti.post("/todo", updateTodo);
panauti.delete("/:id", deleteTodo);

panauti.listen(port,() => {
    console.log(`Server is running on ${port}`);
})

