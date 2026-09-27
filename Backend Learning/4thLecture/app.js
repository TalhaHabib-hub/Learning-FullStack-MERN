const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);
  // res.setHeader('Content-Type','json')
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>');
  res.write('<head><title>Talha Habib</title></head>')
  res.write("<body><h1>Will be Allah's favourite person</h1></body>")
  res.write('</html>')
});
server.listen(3000);
