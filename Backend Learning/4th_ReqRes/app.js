const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // res.setHeader('Content-Type','json')
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Learning backend</title></head>");
    res.write("<body><h1>being the best in my field!</h1></body>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/getinto") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Learning backend | getinto</title></head>");
    res.write("<body><h1>kuch getinto ma hua to ya karo</h1></body>");
    res.write("</html>");
    // res.end() // just will make error because a header can't be set again after just writing this so write return before it
   return res.end();
  }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Learning backend | else</title></head>");
    res.write("<body><h1>Will be Allah's favourite person</h1></body>");
    res.write("</html>");
    res.end();
  
});
server.listen(3000, () => {
  console.log('Talha the server is listening at port:3000')
});
