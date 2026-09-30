const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('1st dummy middle ware', req.url)
  next();
})
app.use((req, res, next) => {
  console.log('2nd dummy middle ware', req.method)
  next();
})

app.get("/", (req, res, next) => {
  res.send(`<h1>Home</h1> <a href="/contact-us">Go to Contacts</a>`)
});
app.get("/contact-us", (req, res, next) => {
  console.log("Talha I am in 2nd middle ware...!");
  console.log(req.url, req.header);
   res.send(`
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Enter name" />
      <input type="email" name="email" placeholder="Enter email" />
      <button type="submit">Submit</button>
    </form>
  `);
});
app.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  console.log("talha in 3rd middle ware");
  res.send("<p>Thanks we got your details</p>");

});

app.use((req, res) => {
res.status(404).send('<h1>page not found..!<.h1>')
})
const PORT = "3333";
app.listen(3333, () => {
  console.log(`server is listening at port http://localhost:${PORT}`);
});
