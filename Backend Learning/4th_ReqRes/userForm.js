const http = require("http");
const fs = require('fs');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // res.setHeader('Content-Type','json')
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Talha Habib</title></head>");
    res.write("<body><h1>Talha You have to fill the form</h1>");
    res.write("");
    res.write("<form action='/submit-details' method='POST'/>");
    res.write(
      '<input type="text" id="name" name="name" placeholder="Enter your name.."/><br>',
    );
    res.write("<label for='gender'>Gender:</label><br>");
    res.write('<input type="radio" id="male" name="gender" value="male"/>');
    res.write("<label for='male'>male</label><br>");
    res.write('<input type="radio" id="female" name="gender" value="female"/>');
    res.write("<label for='female'>female</label><br>");
    res.write('<button type="submit">Submit</button>');
    res.write("</form>");
    res.write("</body > ");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === '/submit-details' && req.method == 'POST') {
    fs.writeFileSync('user.txt', 'User details submitted successfully');
    // res.setHeader("Content-Type", "text/html");
    // res.write("<html>");
    // res.write("<head><title>Talha Habib</title></head>");
    // res.write("<body><h1>User details submitted successfully</h1>");
    // res.write("</body > ");
    // res.write("</html>");
    res.statusCode = 302; // redirection
    res.setHeader('Location', '/');
    return res.end();
    // res.statusCode = 302; //redirction
    // res.setHeader('Location', '/');
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Talha Habib</title></head>");
  res.write("<body><h1>Will be Allah's favourite person</h1></body>");
  res.write("</html>");
  res.end();
});
server.listen(3001, () => {
  console.log('Talha the server is listening at port:3001')
});
// fs.writeFile('practice.js','js code');


// const fs = require('fs');

// fs.writeFile('practice.js', 'js code', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('File created!');
//   }
// });