const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const cors = require('cors');
const port = 3000 || process.env.port

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("hello guys")
});

app.listen(port , () => {
    console.log(`Server is running on ${port}`);
})