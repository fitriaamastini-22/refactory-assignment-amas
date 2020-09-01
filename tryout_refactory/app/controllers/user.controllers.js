require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../db/models/index');
const Op = db.Sequelize.Op;
const User = db.User;


//register
exports.register = function (req, res){
	if( !req.body.fullname || !req.body.username || !req.body.email || !req.body.password ){
		res.status(400).send(
			{
				message: "Content can not be empty",
				status: "error"
			}
		);
		return;
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(req.body.password, salt);

	const user = {
		fullname : req.body.fullname,
		username : req.body.username,
		email : req.body.email,
		phone_number : req.body.phone_number,
		password : hash,
		salt : salt,
		role: 'supplier'
	}

	User.create(user)
		.then( (data) => {
			// res.send(data);
			res.header();
			res.json({
				"message": "Success register an user",
				"status": true,
				"data": {
					fullname : data.fullname,
					username : data.username,
					email : data.email,
					phone_number : req.body.phone_number,
					role: data.role
				}
			});
			res.end();
		}).catch( (err) => {
			res.status(500).send(
				{
					message: err.message || "Some error occured while creating user",
					status: "error"
				}
			);
		});
};

exports.login = function (req, res){
	const username = req.body.username;
	const pass = req.body.password;

	User.findOne({ where: {username: username} })
		.then((data) => {
			const hasil = bcrypt.compareSync(pass, data.password);
			// console.log(hasil);

			if (hasil == true){
				const secret = process.env.SECRET_JWT;
				const expiresIn = "30 days";

				const payload = {id: data.id};

				jwt.sign(payload, secret, {
					algorithm: 'HS256', 
					expiresIn: expiresIn
				}, function (err, token){
					if(err){
						res.json({
							"result" :
							{
								"message": "Error occured while generating Token",
								"status": "error",
							}
						});
					}else{
						if(token != false){
							res.header();
							res.json({
								"result" :
								{
									"status": "success",
									"data":{
										"token": token,
									}
								}
							});
							res.end();
						}else{
							res.json({
								"result" :
								{
									"status": "error",
									"msg": 'Could not Create Token'
								}
							});
							res.end();
						}
					}
				});
			}else{
				console.log("ERR");
			}
		}).catch((err)=>{
			res.status(500).send({
				message: `Error retrieving username ${username}, err: ${err.message}`,
				status: "error"
			});
		});	
};

exports.createuser = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data) => {
		if(data.role != 'admin'){
			res.header();
			res.json({
				"message": "You are not permitted to create user",
				"status": "error",
			});
			res.end();
		}else{
			if( !req.body.fullname || !req.body.username || !req.body.email || !req.body.role ){
				res.status(400).send(
					{
						message: "Content can not be empty",
						status: "error"
					}
				);
				return;
			}

			let password = req.body.password;
			if( !password ){
				const length = 8;
				const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
				password = '';
			    for (let i = length; i > 0; --i) password += chars[Math.floor(Math.random() * chars.length)];
			}

			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);

			const user = {
				fullname : req.body.fullname,
				username : req.body.username,
				email : req.body.email,
				phone_number : req.body.phone_number,
				password : hash,
				salt : salt,
				role: req.body.role,
			}

			User.create(user)
				.then( (data) => {
					// res.send(data);
					res.header();
					res.json({
						"message": `Success create an user, password is: ${password}`,
						"status": true,
						"data": {
							fullname : data.fullname,
							username : data.username,
							email : data.email,
							phone_number : data.phone_number,
							role: data.role
						}
					});
					res.end();
				}).catch( (err) => {
					res.status(500).send(
						{
							message: err.message || "Some error occured while creating user",
							status: "error"
						}
					);
				});
		}
	}).catch((err)=>{
		res.status(500).send({
			message: `Error retrieving user ${user.id}, err: ${err.message}`,
			status: "error"
		});
	});	
};

exports.listuser = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data) => {
		if(data.role != 'admin'){
			res.header();
			res.json({
				"message": "You are not permitted to get list of users",
				"status": "error",
			});
			res.end();
		}else{
			const limit = req.query.limit || 10;
			const page = req.query.page || 1;

			const search = req.query.search;

			let condition = search? { [Op.or] : [
				{fullname: { [Op.like]: `%${search}%` }},
				{email: { [Op.like]: `%${search}%` }},
				{username: { [Op.like]: `%${search}%` }}
			] } : null;

			User.findAll({
				attributes: ['fullname', 'username', 'email', 'phone_number', 'role' ], 
				where: condition, 
				limit: parseInt(limit),
				offset: ((parseInt(page)-1)*limit) 
			})
				.then((data) => {
					// res.send(data);
					res.header();
					res.json({
						"message": "List of users",
						"status": true,
						data
					});
					res.end();
				}).catch((err)=>{
					res.status(500).send({
						message: err.message || "Some error occured while find list of user",
						status: "error"
					});
				});
		}
	}).catch((err)=>{
		res.status(500).send({
			message: `Error retrieving user ${user.id}, err: ${err.message}`,
			status: "error"
		});
	});	
};

exports.detailuser = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data) => {
		if(data.role != 'admin'){
			res.header();
			res.json({
				"message": "You are not permitted to get user's detail",
				"status": "error",
			});
			res.end();
		}else{
			const id = req.params.id; //iduser
			User.findOne({
				attributes: ['fullname', 'username', 'email', 'phone_number', 'role' ],
				where: {id: id}
			}).then((data) => {
					// res.send(data);
					res.header();
					res.json({
						"message": `Detail of user id = ${id}`,
						"status": true,
						data
					});
					res.end();
				}).catch((err)=>{
					res.status(500).send({
						message: err.message || "Some error occured while find user",
						status: "error"
					});
				});
		}
	}).catch((err)=>{
		res.status(500).send({
			message: `Error retrieving user ${user.id}, err: ${err.message}`,
			status: "error"
		});
	});	

};

exports.updateuser = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data) => {
		if(data.role != 'admin'){
			res.header();
			res.json({
				"message": "You are not permitted to update user data",
				"status": "error",
			});
			res.end();
		}else{
			const id = req.params.id; //iduser
			let user_up = {
				fullname : req.body.fullname,
				username : req.body.username,
				email : req.body.email,
				phone_number : req.body.phone_number,
				role: req.body.role
			}

			//send response
			let is_update_pass = '';
			console.log(req.body.changepassword);

			if( req.body.changepassword){
				let password = req.body.password;
				if (!password || password == '' ){
					const length = 8;
					const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
					password = '';
				    for (let i = length; i > 0; --i) password += chars[Math.floor(Math.random() * chars.length)];
				}
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				user_up.password = hash;
				user_up.salt = salt;
				is_update_pass += `, new password: ${password}`;
			};

			console.log(user_up);
			console.log(id);

			User.update(user_up, {
				where: { id: id }
			}).then( (result) => {
				if(result == 1){

					res.send({
						status: true,
						message: `User ${id} has been updated ${is_update_pass}`,
						"data": {
							fullname : user_up.fullname,
							username : user_up.username,
							email : user_up.email,
							phone_number : user_up.phone_number,
							role: user_up.role
						}
					});
				} else {
					res.send({
						message: `Cannot update user id = ${id}`,
						status: "error"
					});
				}
			}).catch((err) =>{
				res.status(500).send({
					message: err.message || "Some error occured while update user",
					status: "error"
				});
			});
		}
	}).catch((err)=>{
		res.status(500).send({
			message: `Error retrieving user ${user.id}, err: ${err.message}`,
			status: "error"
		});
	});
};

exports.deleteuser = function (req, res){
	const user = ( jwt.verify(req.headers.token, process.env.SECRET_JWT) );
	// console.log("user "+user.id);
	User.findOne({ where: {id: user.id} })
	.then((data) => {
		if(data.role != 'admin'){
			res.header();
			res.json({
				"message": "You are not permitted to delete user data",
				"status": "error",
			});
			res.end();
		}else{
			const id = req.params.id; //iduser
			User.destroy({
				where: { id:id }
			}).then( (result) => {
				if(result == 1){
					//send response
					res.send({
						status: true,
						message: `User ${id} has been deleted`,
					});
				} else {
					res.send({
						message: `Cannot delete user id = ${id}`,
						status: "error"
					});
				}
			}).catch((err) =>{
				res.status(500).send({
					message: err.message || "Some error occured while delete user",
					status: "error"
				});
			});
		}
	}).catch((err)=>{
		res.status(500).send({
			message: `Error retrieving user ${user.id}, err: ${err.message}`,
			status: "error"
		});
	});
};