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
}
)
