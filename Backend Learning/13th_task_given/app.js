const path = require("path");
const express = require("express");

const storeRouter = require("./routes/storeRouter");
const { adminRouter } = require("./routes/adminRouter");
const rootDir = require("./utils/pathUtil");
const { error } = require("./controllers/errorController");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use(adminRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(error);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
