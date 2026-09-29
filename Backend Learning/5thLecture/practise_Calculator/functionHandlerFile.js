const { writer } = require("node:repl");

const functionUstaz = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Calculator</title></head>");
    res.write("<body><h1>Wellcome Talha hope you are doing great !</h1><br>");
    res.write("<a href='/calculator'>Calculator</a>");
    res.write("</body > ");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Calculator</title></head>");
    res.write("<body>");
    res.write("<form action='/calculate-result' method='POST'/>");
    res.write("<label for='number1'>Number:</label>");
    res.write(
      '<input type="number" id="number1" name="number1" placeholder="1st number"/><br>',
    );
    res.write("<label for='number2'>Number:</label><br>");
    res.write(
      '<input type="number" id="number2" name="number2" placeholder="2nd number"/><br>',
    );

    res.write('<button type="submit">Submit</button>');
    res.write("</form>");
    res.write("</body>");

    res.write("</html>");
    return res.end();
  } else if (req.url === "/calculate-result" && req.method === "POST") {
    let bodybuilder = [];
    let result;
    req.on("data", (chunk) => {
      bodybuilder.push(chunk);
    });
    req.on("end", () => {
      const gettingfirst = Buffer.concat(bodybuilder).toString();
      const parameters = new URLSearchParams(gettingfirst);
      const gettingFromParameters = Object.fromEntries(parameters);
      console.log(gettingFromParameters.number);
      result =
        Number(gettingFromParameters.number1) +
        Number(gettingFromParameters.number2);
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Calculator</title></head>");
      res.write("<body>");
      res.write(`<h1>The result is ${result} <h1>`);
      res.write("</body>");
      return res.end();
    });
  }
};
module.exports = functionUstaz;
