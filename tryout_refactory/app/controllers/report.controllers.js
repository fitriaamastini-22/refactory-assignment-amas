require("dotenv").config();
const jwt = require('jsonwebtoken');

const db = require('../db/models/index');
const Op = db.Sequelize.Op;
const User = db.User;
const Product = db.Product;
const ProductOut = db.ProductOut;
const ProductIn = db.ProductIn;

exports.print = function (req, res){
};