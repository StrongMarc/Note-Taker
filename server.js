// add dependencies npm package enquirer and path
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 5150;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route to return server html to user
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// listen on the port
app.listen(PORT, function() {
    console.log("App listening on: http://localhost:" + PORT + "/");
  });