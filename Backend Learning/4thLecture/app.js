const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // res.setHeader('Content-Type','json')
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Talha Habib</title></head>");
    res.write("<body><h1>Be The Best dn't care The rests!</h1></body>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/getinto") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Talha Habib</title></head>");
    res.write("<body>kuch bhi na hua to ya karo</h1></body>");
    res.write("</html>");
   return res.end();
  }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Talha Habib</title></head>");
    res.write("<body><h1>Will be Allah's favourite person</h1></body>");
    res.write("</html>");
    res.end();
  
});
server.listen(3000);
