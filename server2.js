const http = require("http");
const fs = require("fs");

const PORT = 5150;

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT + "/");
});

function handleRequest(request, response) {

    // Capture the url the request is made to
    var path = request.url;
  
    // Depending on the URL, display a different HTML file.
    switch (path) {

      case "/notes":
        return displayNotes(response);
      default:
        return displayIndex(response);   
    }
}

// displays index.html file
function displayIndex(response) {
  filename = "./public/index.html";
  fs.readFile(filename, "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }

      console.log(data) 

  // Configure the response to return a status code of 200 (meaning everything went OK), and to be an HTML document
  response.writeHead(200, { "Content-Type": "text/html" });

  // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
  response.end(data);
  });
}

// displays notes.html file
function displayNotes(response) {
  filename = "./public/notes.html";
  fs.readFile(filename, "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }

      console.log(data) 

  // Configure the response to return a status code of 200 (meaning everything went OK), and to be an HTML document
  response.writeHead(200, { "Content-Type": "text/html" });

  // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
  response.end(data);
  });
}