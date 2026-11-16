const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "842653574159",
  database: "air_bnb",
});

module.exports = pool.promise();

