require("dotenv").config();
const jwt = require('jsonwebtoken');

const db = require('../db/models/index');
const Op = db.Sequelize.Op;
const User = db.User;
const Product = db.Product;

exports.createproduct = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data) => {
		let id_user = '';
		if(data.role == 'admin'){
			if(!req.body.id_supplier){
				res.header();
				res.json({
					"message": "id_supplier is empty. Please send the data",
					"status": "error",
				});
				res.end();
				return;
			}
			id_user = req.body.id_supplier;
		}else{
			id_user = user.id;
		}

		if( !req.body.name || !req.body.stock || !req.body.price ){
			res.status(400).send(
				{
					message: "Content can not be empty",
					status: "error"
				}
			);
			return;
		}

		const product = {
			name : req.body.name,
			stock : req.body.stock,
			price : req.body.price,
			id_user: id_user
		}

		Product.create(product)
			.then( (data) => {
				// res.send(data);
				res.header();
				res.json({
					"message": `Success create an product`,
					"status": true,
					"data": {
						name : data.name,
						stock : data.stock,
						price : data.price,
						id_user : data.id_user,
					}
				});
				res.end();
			}).catch( (err) => {
				res.status(500).send(
					{
						message: err.message || "Some error occured while creating product",
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

exports.listproduct = function (req, res){
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

		Product.findAll({
			where: condition, 
			limit: parseInt(limit),
			 offset: ((parseInt(page)-1)*limit) ,
			include:[{
				model: User,
				as: 'Supplier'
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

exports.detailproduct = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data_user) => {
		const id = req.params.id; //iduser

		Product.findOne({
			where: {id: id}
		})
			.then((data) => {
				// res.send(data);
				if(data_user.role == 'supplier'){
					if(data.id_user != user.id){
						res.header();
						res.json({
							"message": "You are not permitted to access this",
							"status": true
						});
						res.end();
						return;
					}
				}

				res.header();
				res.json({
					"message": "Detail of product",
					"status": true,
					data
				});
				res.end();
			}).catch((err)=>{
				res.status(500).send({
					message: err.message || "Some error occured while find detail of product",
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

exports.updateproduct = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data_user) => {
		const id = req.params.id; //iduser

		Product.findOne({
			where: {id: id}
		})
			.then((data) => {
				// res.send(data);
				if(data_user.role == 'supplier'){
					if(data.id_user != user.id){
						res.header();
						res.json({
							"message": "You are not permitted to access this",
							"status": true
						});
						res.end();
						return;
					}
				}

				let id_user = '';
				if(data_user.role == 'admin'){
					if(!req.body.id_supplier){
						res.header();
						res.json({
							"message": "id_supplier is empty. Please send the data",
							"status": "error",
						});
						res.end();
						return;
					}
					id_user = req.body.id_supplier;
				}else{
					id_user = user.id;
				}

				if( !req.body.name || !req.body.stock || !req.body.price ){
					res.status(400).send(
						{
							message: "Content can not be empty",
							status: "error"
						}
					);
					return;
				}

				const product_up = {
					name : req.body.name,
					stock : req.body.stock,
					price : req.body.price,
					id_user: id_user
				}

				Product.update(product_up, {
					where: {id: id}
				})
					.then( (res_data) => {
						// res.send(data);
						res.header();
						res.json({
							"message": `Success update an product`,
							"status": true
						});
						res.end();
					}).catch( (err) => {
						res.status(500).send(
							{
								message: err.message || "Some error occured while creating product",
								status: "error"
							}
						);
					});
			}).catch((err)=>{
				res.status(500).send({
					message: err.message || "Some error occured while find detail of product",
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

exports.deleteproduct = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data) => {
		const id = req.params.id; //iduser

		Product.findOne({
			where: {id: id}
		})
			.then((product) => {
				// res.send(data);
				if(data.role == 'supplier'){
					if(product.id_user != user.id){
						res.header();
						res.json({
							"message": "You are not permitted to access this",
							"status": true,
						});
						res.end();
						return;
					}
				}

				Product.destroy({
					where: { id:id }
				}).then( (result) => {
					if(result == 1){
						//send response
						res.send({
							status: true,
							message: `product ${id} has been deleted`,
						});
					} else {
						res.send({
							message: `Cannot delete product id = ${id}`,
							status: "error"
						});
					}
				}).catch((err) =>{
					res.status(500).send({
						message: err.message || "Some error occured while product deleted",
						status: "error"
					});
				});
			}).catch((err)=>{
				res.status(500).send({
					message: err.message || "Some error occured while find detail of product",
					status: "error"
				});
			});
	}).catch((err)=>{
		res.status(500).send({
			message: `Error retrieving user ${user.id}`,
			status: "error"
		});
	});	
};

exports.uploadphotoproduct = function (req, res){
};



