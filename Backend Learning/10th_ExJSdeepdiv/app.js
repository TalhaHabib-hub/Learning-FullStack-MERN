//Core module
// const http = require('http'); now Talha we don't need express will do it for us also talha for it you have to remove the line number 23 and replce server with app in line number 26

//External Module
const express = require('express');


const app = express(); // it is a function that returns an app
// Talha the app here is a request handler it also take reqs and response but also gets next function
// const server = http.createServer(requestHandler)


// Talha
// 1. order matters
// 2.talha you can't call next after send();
// 3. "/" matches everything
// 4. Calling res.send implicitly calls res.end();
app.get("/",(req, res, next)=> {
  console.log("Came in first middleware ", req.url, req.method);
  // res.send("<h3>Hey Talha you are at /</h3>")  // Talha you can not call next() after send()
  next();
})
app.get("/submit-details",(req, res, next)=> {
  console.log("Came in 3rd  middleware ", req.url, req.method);
  res.send('<h1>May Allah be with you</h1>')
})
app.use("/",(req, res, next)=> {
  console.log("Came in 2nd middleware ", req.url, req.method);
  res.send("<h3>Hey Talha you are at / with the second middle ware was directed from the first middleware</h3>")  // Talha you can not call next() after send()
  next();
})

// const server = http.createServer(app);

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`server is running on address http://localhost:${PORT}`);
});
