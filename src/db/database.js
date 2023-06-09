const { Sequelize } = require("sequelize");

const db = new Sequelize('sky', 'root', 'manuel31', {
    host: 'localhost',
    dialect: "mysql",
  });

  module.exports = db;