var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = require('../models/index');
const User = db.users;

//register
exports.signup = function (req, res){
	//Validate Request
	// console.log(req.body.email);
	// console.log(req.body.password);
	if( !req.body.email || !req.body.password ){
		res.status(400).send(
			{
				message: "Content can not be empty"
			}
		);
		return;
	}

	//Create User
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(req.body.password, salt);

	const user = {
		password : hash,
		email : req.body.email,
		photo: "-",
	}

	User.create(user)
		.then( (data) => {
			res.send(data);
		}).catch( (err) => {
			res.status(500).send(
				{
					message: err.message || "Some error occured while creating user"
				}
			);
		});
};

//upload KTP atau SIM
exports.uploadidentity = async (req,res) => {
	const id = req.params.id;

	try{
		if(!req.files){
			res.send({
				status: false,
				message: 'No File Uploaded'
			});
		}else{
			//user the name of the input field
			let photo = req.files.photo;

			var renamePhoto = id 
				+ "-"
				+ (photo.name).substring(0, (photo.name).indexOf("."))
				+ (photo.name).substring((photo.name).indexOf("."));

			User.update({
				photo: renamePhoto
			}, {
				where: {id:id}
			}).then( (result) => {
				if(result == 1){
					photo.mv('./uploads/users/'+renamePhoto);

					//send response
					res.send({
						status: true,
						message: 'Photo post file is uploaded',
						data: {
							name: photo.name,
							rename : renamePhoto,
							mimetype: photo.mimetype,
							size: photo.size
						}
					});
				} else {
					res.send({
						message: `Cannot update Post with id = ${id}`,
					});
				}
			}).catch((err) =>{
				res.status(500).send(err);
			});
		}
	}catch(err){
		res.status(500).send(err);
	}
};

exports.resetpassword = function (req, res){
	//Validate Request
	if( !req.body.email){
		res.status(400).send(
			{
				message: "Content can not be empty"
			}
		);
		return;
	}

	//Create random password
	const length = 8;
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let new_password = '';
    for (let i = length; i > 0; --i) new_password += chars[Math.floor(Math.random() * chars.length)];

	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(new_password, salt);

	const email = req.body.email;
	User.update({
		password: hash
	}, {
		where: {email:email}
	}).then( (result) => {
		if(result == 1){
			//send response
			res.send({
				status: true,
				message: 'Your password has been reset',
				data: {
					email: email,
					new_password : new_password,
				}
			});
		} else {
			res.send({
				message: `Cannot reset password with email = ${email}`,
			});
		}
	}).catch((err) =>{
		res.status(500).send(err);
	});
};

//login
exports.signin = function (req, res){
	var email = req.body.email;
	var pass = req.body.password;

	User.findOne({ where: {email: email} })
		.then((data) => {
			var hasil = bcrypt.compareSync(pass, data.password);
			console.log(hasil);

			if (hasil == true){
				var secret = 'TEXT SECRET LETAK KAN DI ENV';
				var expiresIn = "30 days";
				// var now = Math.floor(Date.now()/1000);

				// var iat = (now - 10);
				// var expiresIn = 3600; //second
				//expr = (now + expiresIn)
				//notBefore = (now - 10)

				// var jwtId = Math.random().toString(36).substring(7);
				// var payload =  {
				// 	iat: iat,
				// 	jwtid: jwtId,
				// 	audience: 'TEST',
				// 	data: data,
				// }

				var payload = {id: data.id};

				jwt.sign(payload, secret, {
					algorithm: 'HS256', 
					expiresIn: expiresIn
				}, function (err, token){
					if(err){
						res.json({
							"result" :
							{
								"status": false,
								"msg": "Error occured while generating Token"
							}
						});
					}else{
						if(token != false){
							res.header();
							res.json({
								"result" :
								{
									"status": true,
									"token": token,
									"user": {
										id:data.id
									}
								}
							});
							res.end();
						}else{
							res.json({
								"result" :
								{
									"status": false,
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
				message: `Error retrieving user email ${email}`
			});
		});
};

//Edit Email
exports.editEmail = (req,res,next) => {

    module.exports = async nodemailer =>{

    if( !req.headers.token ){
    	res.status(400).send(
    		{
    			message: "Content can not be empty"
    		}
    	);
    	return;
    }

    var user = ( jwt.verify(req.headers.token, secret_jwt) );

    var newEmail = req.body.email;

    User.update({
    	email: newEmail
    }, {
    	where: { user_id: user.id }
    }).then( (result) => {
    	if(result == 1){
    		//send response
    		res.send({
    			status: true,
    			message: 'Your Email has been updated',
    			data: {
    				email: newEmail
    			}
    		});
    	} else {
    		res.send({
    			message: `Cannot update email id = ${id}`,
    		});
    	}
    }).catch((err) =>{
    	res.status(500).send(err);
    });
};
