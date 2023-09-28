const mysql = require("mysql");

let pool = mysql.createPool({
  host: "db4free.net",
  port: 3306,
  user: "smartbrain",
  password: "smartbrain123",
  database: "online_quiz_app",
  connectionLimit: 100,
  multipleStatements: true,
});

module.exports = pool;
