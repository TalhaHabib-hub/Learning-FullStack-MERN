//External  Modules
const path = require('path');

const rootDir = require('./utils/utilpaths')

const express = require("express");
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");

const app = express();
app.use(userRouter);
app.use("/host",hostRouter);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir,'views','error.html'))
  
})
const PORT = 4444;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
