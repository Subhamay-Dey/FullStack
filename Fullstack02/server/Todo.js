const express = require('express');
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/tododatabase");

const todoSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => Math.random().toString(36).substring(2,9)
    },
    title: String,
    description: String,
})

module.exports= mongoose.model("todo, todoSchema");