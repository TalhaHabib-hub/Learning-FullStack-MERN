const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
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
  } else if (req.url.toLowerCase() === "/submit-details" &&
    req.method == "POST") {
    const body = [];
    //here we are saying whenever you find data tell me
    req.on("data", (chunk) => {
      console.log('chunck-> ',chunk);//Output :  <Buffer 6e 61 6d 65 3d 46 61 72 6d 61 6e 2b 55 6c 6c 61 68 26 67 65 6e 64 65 72 3d 6d 61 6c 65>
      body.push(chunk);
    });
    req.on("end", () => {
      const completeBody = Buffer.concat(body).toString();
      console.log('completeBody ->',completeBody);//name=Farman+Ullah&gender=male
      console.log('URLSearchParams ->',URLSearchParams)//[class URLSearchParams]
      const params = new URLSearchParams(completeBody);
      console.log('params ->', params)//URLSearchParams { 'name' => 'Farman Ullah', 'gender' => 'male' }
      // const bodyObject = {};
      // for (const [key, value] of params.entries()) {
      //   bodyObject[key] = value;
      // }
      // here below is the easy way to do the above 4 lines are
      const bodyObject = Object.fromEntries(params);
      console.log('object ->',Object);// [Function: Object]
      console.log('bodyObject->',bodyObject);// { name: 'Farman Ullah', gender: 'male' }
      fs.writeFileSync("faramna.txt", JSON.stringify(bodyObject)); // we should not use the sync here becsuse it stops the event loop completely
    });
    res.statusCode = 302; //redirction
    res.setHeader("Location", "/");
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Talha Habib</title></head>");
  res.write("<body><h1>Will be Allah's favourite person</h1></body>");
  res.write("</html>");
  res.end();
});
server.listen(3000, () => {
  console.log("The server is running at localhost:3000");
});

//Talha here we have got the complete body now we will do our complete parsing in the next file

// const fs = require('fs');

// fs.writeFile('practice.js', 'js code', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('File created!');
//   }
// });
