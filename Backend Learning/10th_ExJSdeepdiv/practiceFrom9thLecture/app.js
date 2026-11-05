const express = require("express");
const bodyParser = require('body-parser');
// Talha the one who made the body parser they know that we are going to use this in express so we can get the parserd data in a middleware so go to the line just before post middleware which is about to get the parsed data
const app = express();

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
// Talha add it just before the middlware that need the data to be parsed for itself also Talha this will parsed the body and add that to the request
app.use(bodyParser.urlencoded()) 
app.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  console.log("talha in 3rd middle ware");
  res.send(`<p>Thank you ${req.body.name} we will contact you with email: ${req.body.email} shortly!</p>`);

});

app.use((req, res) => {
res.status(404).send('<h1>page not found..!<.h1>')
})
const PORT = "3333";
app.listen(3333, () => {
  console.log(`server is listening at port http://localhost:${PORT}`);
});

//Talha as you can see above we can do normal routing using get and post  with giving path but dear Talha express also ships a router which we can access after this in this lecture 10 that is used