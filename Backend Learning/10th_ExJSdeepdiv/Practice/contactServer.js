const express = require("express");
const dummyRoutes = require("./routes/dummyMiddleWares");
const homeSlashRouter = require("./routes/homeSlashRouter");
const contactUsRouter = require("./routes/contactUsrouter");
const postContactUsRouter = require("./routes/PostContactUsRouter");
const errorRouter = require("./routes/errorMiddlewareRouter");

const app = express();

app.use(dummyRoutes);
app.use(homeSlashRouter);
app.use(contactUsRouter);
app.use(postContactUsRouter);
app.use(errorRouter);

const PORT = "3333";
app.listen(3333, () => {
  console.log(`server is listening at port http://localhost:${PORT}`);
});
