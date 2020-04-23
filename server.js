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

var id = readJSON();

// read db.JSON
function readJSON (){
  let fileName = "./db/db.json"
  fs.readFile(fileName, "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    // make db.JSON in to obj
    id = JSON.parse(data)
  
 });  // end fs.readFile
}


// route to return server html to user
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// route to post and append to db.JSON
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  
  id.push(newNote);
  noteStr = JSON.stringify(id);  // turn id to string
  let filename = "./db/db.json"
  writeToJSON(filename, noteStr);
  res.end();
});

// function to write JSON
function writeToJSON(filename, data){
  // code for writing db.JSON
  fs.writeFile(filename, data, function(err){
    if(err){
      throw err;
    }
    console.log("Successfuly wrote to db.JSON")
 });
}

// AJAX to db.JSON
app.get("/api/notes", function(req, res) {
    return res.json(id);
});


app.delete("/api/notes/:id", function(req, res) {
  var note = req.params.id;

  for (var i = 0; i < id.length; i++) {
    if (note === id[i].title) {
      // remove note object from array
      id.splice(i, 1);
  
      idStr = JSON.stringify(id); // turn id to string
      let filename = "./db/db.json"
      writeToJSON(filename, idStr)
      return res.json(id);
    }
  }

  return res.send("No note found");
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// listen on the port
app.listen(PORT, function() {
    console.log("App listening on: http://localhost:" + PORT + "/");
});
