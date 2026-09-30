const express = require("express");
const bodyParser = require('body-parser')

const app = express();
// I had used this below one earlier but now using body-parser I installed that in the porject
// app.use(express.urlencoded({ extended: true }));

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

// add just before contact us because will be use there can do any where but no problem
app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  console.log("talha in 3rd middle ware");
  res.send(`<p>Thanks ${req.body.name} we got your details</p>`);

});



app.use((req, res) => {
res.status(404).send('<h1>page not found..!<.h1>')
})
const PORT = "3333";
app.listen(3333, () => {
  console.log(`server is listening at port http://localhost:${PORT}`);
});
