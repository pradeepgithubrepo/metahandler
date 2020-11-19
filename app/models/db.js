// const mysql = require("mysql");
const Pool = require('pg').Pool
const dbConfig = require("../config/db.config.js");

// var connection = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });


const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'metarepo',
  password: 'password',
  port: 5432,
})

module.exports = pool;
