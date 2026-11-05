//Core module
// const http = require('http'); now Talha we don't need express will do it for us also talha for it you have to remove the line number 23 and replce server with app in line number 26

//External Module here we are using express module to create a server and handle the request and response
const express = require('express');
const bodyParser = require('bodyParser')

//express is a function that returns an app which is a request handler
//it can also be named as createpplication
const app = express(); // it is a function that returns an app
// Talha the app here is a request handler it also take reqs and response but also gets next function
// const server = http.createServer(requestHandler)


// Talha
// 1. order matters
// 2. talha you can't call next after send();
// 3. "/" matches everything
// 4. Calling res.send implicitly calls res.end();
app.get("/",(req, res, next)=> {
  console.log("Came in first middleware ", req.url, req.method);
  // res.send("<h3>Hey Talha you are at /</h3>")  // Talha you can not call next() after send()
  next();
})

// earlier 
// const server = http.createServer((req, res) => {
//   console.log(req);
// })
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


// Talha in the above one the get is : an HTTP method for which the middleware function applies.
// also talha in the first place before callback function we gave path (route) for which the middleware function applies
// then talha the callback function is called the middlware function
//Talha the callback argument to the middleware function is called the "next"
// Talha the first argument which is request is and HTTP request argument to the middleware function
// and the res argument to the middleware function

// use is Talha a wild card means executes for all but by making the things specific like get or post will obay the exact path given