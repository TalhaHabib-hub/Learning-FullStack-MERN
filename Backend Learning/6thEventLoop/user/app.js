const http = require("http");
const FunctionAllKhanuuuu = require('./ModuleparsingActuall')
const server = http.createServer(FunctionAllKhanuuuu);
const PORT = 3005;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`)
})