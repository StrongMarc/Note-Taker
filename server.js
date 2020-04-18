var http = require("http");

var PORT = 5150;

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT + "/notes");
});

function handleRequest(request, response) {

    // Capture the url the request is made to
    var path = request.url;
  
    // Depending on the URL, display a different HTML file.
    switch (path) {
  
    case "/notes":
      return displayNotes(response);
  
    // case "/portfolio":
    //   return displayPortfolio(response);
  
    // default:
    //   return display404(path, response);
    }
  }

  function displayNotes(response) {
    var notesHTML = "<html>" +
      "<body><h1>Home Page</h1>" +
      "</body></html>";
  
    // Configure the response to return a status code of 200 (meaning everything went OK), and to be an HTML document
    response.writeHead(200, { "Content-Type": "text/html" });
  
    // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
    response.end(notesHTML);
  }