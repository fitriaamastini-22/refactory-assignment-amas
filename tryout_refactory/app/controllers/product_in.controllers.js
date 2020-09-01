require("dotenv").config();
const jwt = require('jsonwebtoken');

const db = require('../db/models/index');
const Op = db.Sequelize.Op;
const User = db.User;
const Product = db.Product;
const ProductIn = db.ProductIn;

exports.createproductin = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data) => {
		const productin = {
			date : req.body.date,
			total : req.body.total,
			id_product : req.body.id_product
		}

		ProductIn.create(productin)
			.then( (res_productin) => {
				Product.findOne({
					where: {id: productin.id_product}
				})
				.then((product) => {
					// res.send(data);

					const product_up = {
						stock: (parseInt(product.stock) + parseInt(productin.total)) 
					}

					Product.update(product_up, {
						where: {id: productin.id_product}
					})
						.then( (result_up) => {
							if(result_up == 1){
								res.header();
								res.json({
									"message": `Success create an product In`,
									"status": true,
									"data": {
										date : res_productin.date,
										total : res_productin.total,
										id_product : res_productin.id_product,
										stock: product_up.stock,
									}
								});
								res.end();
							}
							else{
								res.header();
								res.json({
									"message": `No change in update an product's stock`,
									"status": true,
								});
								res.end();
							}

						}).catch( (err) => {
							res.status(500).send(
								{
									message: err.message || "Some error occured while update product stock",
									status: "error"
								}
							);
						});
				}).catch((err)=>{
					res.status(500).send({
						message: err.message || "Some error occured while find searching product to get stock",
						status: "error"
					});
				});
			}).catch( (err) => {
				res.status(500).send(
					{
						message: err.message || "Some error occured while creating product in",
						status: "error"
					}
				);
			});
	}).catch((err)=>{
		res.status(500).send({
			message: `Error retrieving user ${user.id}, err: ${err.message}`,
			status: "error"
		});
	});		
};

exports.listproductin = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data) => {
		let id_user = '';
		if(data.role != 'supplier'){
			id_user = null;
		}else{
			id_user = user.id;
		}

		const limit = req.query.limit || 10;
		const page = req.query.page || 1;

		const search = req.query.search;

		let condition = search? { 
			[Op.or] : [
				{name: { [Op.like]: `%${search}%` }},
			] 
		} : null;

		if(id_user != null){
			if(condition == null){
				condition = {id_user: id_user}
			}
			else{
				condition.id_user = id_user;
			}
		}

		ProductIn.findAll({
			where: condition, 
			limit: parseInt(limit),
			offset: ((parseInt(page)-1)*limit) ,
			include: [{
				model: Product,
				as: 'Product',
				include: [{
					model: User,
					as: 'Supplier'
				}]
			}]
		})
			.then((data) => {
				// res.send(data);
				res.header();
				res.json({
					"message": "List of products",
					"status": true,
					data
				});
				res.end();
			}).catch((err)=>{
				res.status(500).send({
					message: err.message || "Some error occured while find list of product",
					status: "error"
				});
			});
	}).catch((err)=>{
		res.status(500).send({
			message: `Error retrieving user ${user.id}, err: ${err.message}`,
			status: "error"
		});
	});	
};

exports.detailproductin = function (req, res){
};

exports.updateproductin = function (req, res){
};

exports.deleteproductin = function (req, res){
};
