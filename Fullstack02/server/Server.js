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

// const express = require('express');
// const app = express();
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const todoModel = require("./Todo")

// const port = 8080 || process.env.port;

// app.use(bodyParser.json());
// app.use(cors());



// async function postRoute (req,res) {
//   const todo = new todoModel({
//       id: Math.random().toString(36).substring(2,9),
//       title: req.body.title,
//       description: req.body.description
//   })
//   try {
//       const newTodo = await todo.save();
//       res.status(201).json(newTodo);
//   } catch (error) {
//       res.status(400).json({message:"Error creating a Todo"});
//   }
// }

// async function getRoute(req,res) {
//   try{
//       const todos = await todoModel.find();
//       res.json(todos)
//   }
//   catch(error){
//       res.status(500).json({message:"Server Error"});
//   }
// }


// app.get("/todos", getRoute);
// app.post("/todos", postRoute);

// app.delete("/:id", async(req,res)=>{
//   try {
//     const deletedTodo = await todoModel.findByIdAndDelete(req.params.id);
//     if (!deletedTodo) {return res.status(404).json({ message: "No todo with that ID" })};
    
//     res.json(deletedTodo);
//   } catch (error) {
//     res.status(500).json({message: error.message});
//   }
// });

// app.listen(port, () => {
//   console.log(`Server started on port: ${port}`)
// })