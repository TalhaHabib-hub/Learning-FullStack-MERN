//Core module
// const http = require('http'); now Talha we don't need express will do it for us also talha for it you have to remove the line number 23 and replce server with app in line number 26

//External Module
const express = require('express');

//local module
const requestHandler = require('./user');

const app = express(); // it is a function that returns an app
// Talha the app here is a request handler it also take reqs and response but also gets next function
// const server = http.createServer(requestHandler)

app.use((req, res, next)=> {
  console.log("Came in first middleware ", req.url, req.method);
  next();
})
app.use((req, res, next)=> {
  console.log("Came in second middleware ", req.url, req.method);
  res.send('<h1>May Allah be with you</h1>')
})

// const server = http.createServer(app);

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`server is running on address http://localhost:${PORT}`);
});
