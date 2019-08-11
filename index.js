var http = require('http');
var url = require('url');
var fs = require('fs');

//create a server obj
http.createServer((req, res) => {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  if (filename == "./") filename = "./index.html";
  if (filename.endsWith("index")) filename += ".html";
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      fs.readFile("./404.html", function(err, data) {
        res.end(data);
      })
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(80); //the server object listens on port 80