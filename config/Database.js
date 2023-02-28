const mysql =require("mysql");
var Sequelize = require('sequelize');


const db=mysql.createConnection({
host: "localhost",
    user: "root",
    database: "projet-pfe2",
 });//

  
  db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
  })
  module.exports = db;