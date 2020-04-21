// add dependencies npm package enquirer, path and fs
var express = require("express");
var path = require("path");
const fs = require("fs");

var app = express();
var PORT = process.env.PORT || 5150;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tutor Maria Wong mentioned this code is necessary to show save button
app.use(express.static("public"));

var noteArray = readJSON();

function readJSON (){
    let fileName = "./db/db.json"
    fs.readFile(fileName, "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }

        noteArray = JSON.parse(data)
        console.log(noteArray)
        // teamArray.push(newDataStr)
    
      });  // end fs.readFile
}


// route to return server html to user
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
  
    console.log(newNote);
  
    noteArray.push(newNote);
  
    res.json(newNote);
  });

app.get("/api/notes", function(req, res) {
    console.log("hello")
    console.log(noteArray)
    return res.json(noteArray);
  });



// listen on the port
app.listen(PORT, function() {
    console.log("App listening on: http://localhost:" + PORT + "/");
  });