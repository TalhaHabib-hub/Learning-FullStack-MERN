const http = require('http')
const handlerfunction = require('./functionHandlerFile')
const server = http.createServer(handlerfunction);

const PORT = 503;
server.listen(503, () => {
  console.log(`server is running at port http://localhost ${PORT}`)
})