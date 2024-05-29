const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

app.set('view engine', "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")))

app.get("/", function(req, res) {
    fs.readdir(`./documents`, function(err, documents) {
        res.render("index", {documents: documents});
    })
})

app.post("/create", function(req, res) {
    console.log(req.body);
})

app.listen(3000);