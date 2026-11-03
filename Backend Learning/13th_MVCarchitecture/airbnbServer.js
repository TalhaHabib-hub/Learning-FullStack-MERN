//External  Modules
const path = require('path');

const rootDir = require('./utils/utilpaths')

const express = require("express");
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const {error} = require('./controller/controller')


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(rootDir, 'public')))
app.use(userRouter);
app.use("/host", hostRouter);

app.use(error)
const PORT = 4444;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
