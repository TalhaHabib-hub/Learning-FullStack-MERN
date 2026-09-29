const fs = require('fs');
const FunctionAllKhan = (req, res) => {
  console.log(req.url, req.method);
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
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const completeBody = Buffer.concat(body).toString();
      console.log(completeBody);
      const params = new URLSearchParams(completeBody);
      const bodyObject = Object.fromEntries(params);
      console.log(Object);
      console.log(bodyObject);
      fs.writeFileSync('text.txt',JSON.stringify(bodyObject));
    })
    res.statusCode = 302;
    res.setHeader('Location', '/');
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Talha Habib</title></head>");
  res.write("<body><h1>Will be Allah's favourite person</h1></body>");
  res.write("</html>");
  res.end();
};


module.exports = FunctionAllKhan;