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
      <ul style="display: flex; list-style: none; justify-content: space-around; background-color: #f2f2f2; padding: 10px; backgroun-color: aqua">
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
  if (req.url === "/home") {
    res.write('<h3 style="color: blue;">Wellcome to Home Section!</h3>');
    return res.end();
  } else if (req.url === "/women") {
    res.write('<h3 style="color: pink;">Wellcome to Women Section!</h3>');
    return res.end();
  } else if (req.url === "/men") {
    res.write('<h3 style="color: orange;">Wellcome to Mens Section!</h3>');
    return res.end();
  } else if (req.url === "/kids") {
    res.write('<h3 style="color: green;">Wellcome to Kids Section!</h3>');
    return res.end();
  } else if (req.url == "/cart") {
    res.write('<h3 style="color:maroon;">Here you can see your products!</h3>');
    return res.end();
  }
  res.write('<h2 style="color: red;">Page not (404) found!</h2>');
});
server.listen(3004, () => {
  console.log("Server running on address http://loaclhost:3004");
});
