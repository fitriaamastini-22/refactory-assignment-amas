'use strict';
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize =  new Sequelize (config.database, 
  config.username, 
  config.password, {
    host: config.host, 
    dialect: config.dialect, 
    operatorAliases: false, 
    pool:{
      max: config.pool.max,
      min: config.pool.min, 
      acquire: config.pool.acquire, 
      idle: config.pool.idle,  
    }
});

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

db.User = require("./users.model")(sequelize, Sequelize);
db.Product = require("./product.model")(sequelize, Sequelize);
db.ProductIn = require("./product_in.model")(sequelize, Sequelize);
db.ProductOut = require("./product_out.model")(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;