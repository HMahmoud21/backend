const Sequelize = require('sequelize');
const db = new Sequelize('projet-pfe', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
module.exports = db;