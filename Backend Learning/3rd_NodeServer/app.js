//core module
const http = require("http");
/*
function requestListener(req, res) {
  console.log(req);
}
// here below we have passed the function to the function of the http module 
http.createServer(requestListener);
*/
// Talha the write side of the = returns an object which we stores as server and we will listen on that object
const server = http.createServer((req, res) => {
  console.log(req);
  process.exit();
});

// server.listen(3000);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server running on address http://localhost${PORT}`);
});

// Talha first import http for client serve communication actually can say for servermaking

//   then just http.createServer(())
//   it gets a function so give it req, res

//   to listen for continuously user serve.listen which that above things returns
