const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
   res.write(
    `
   <!DOCTYPE html>
<html lang="en">
<head>
  <title>TalOn</title>
</head>
<body>
  <head>
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/men">Men</a></li>
        <li><a href="/women">Women</a></li>
        <li><a href="/kids">Kids</a></li>
        <li><a href="/cart">Carts</a></li>
      </ul>
    </nav>
  </head>
</body>
</html>
    `,
  );
 if (req.url === '/home') {
    res.write('<h3>Wellcome to Home Section!</h3>')
   return res.end();
  } else if (req.url === '/women') {
    res.write('<h3>Wellcome to Women Section!</h3>')
   return res.end();
  } else if (req.url === '/men') {
    res.write('<h3>Wellcome to Mens Section!</h3>')
   return res.end();
  } else if (req.url === '/kids') {
    res.write('<h3>Wellcome to Kids Section!</h3>')
   return res.end();
  } else if (req.url == '/cart') {
    res.write('<h3>Here you can see your products!</h3>')
   return res.end();
  }
  res.write('<h2>Page not (404) found!</h2>')
 
});
server.listen(3004, () => {
  console.log("Server running on address http://loaclhost:3004");
});
