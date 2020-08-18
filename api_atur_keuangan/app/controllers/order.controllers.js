var jwt = require('jsonwebtoken');
const db = require("../models/index");
const Order = db.orders; 
const Op = db.Sequelize.Op;
const secret_jwt = 'TEXT SECRET LETAK KAN DI ENV';

//order 
exports.create = (req,res) => {
	//Validate request 
	// console.log("order");
	if (!req.body.nama_kegiatan){
		res.status(400).send(
			{
				message: "Content can not be empty"
			}
		);
		return;
	}

	var user = ( jwt.verify(req.headers.token, secret_jwt) );

	//Create Order
	const order = {
		nama_kegiatan: req.body.nama_kegiatan,
		tanggal: req.body.tanggal,
		harga: req.body.harga,
		struk: "-", 
		user_id: user.id,
	}

	Order.create(order)
		.then((data) => {
			res.send(data);
		}).catch((err) => {
			res.status(500).send(
				{
					message: err.message || "Some error occured while creating order"
				}
			);
		});
};

//put upload Image
exports.uploadImageOrder = async (req,res) => {
	const id = req.params.id;
	const nama_kegiatan = req.params.nama_kegiatan;

	try{
		if(!req.files){
			res.send({
				status: false,
				message: 'No File Uploaded'
			});
		}else{
			//user the name of the input field
			let photo = req.files.photo;
			var renamePhoto = + id 
				+ "-"
				+ nama_kegiatan 
				+ (photo.name).substring((photo.name).indexOf("."));

			Order.update({
				struk: renamePhoto
			}, {
				where: {id:id}
			}).then( (result) => {
				if(result == 1){
					photo.mv('./uploads/orders/'+renamePhoto);

					//send response
					res.send({
						status: true,
						message: 'Photo order file is uploaded',
						data: {
							name: photo.name,
							rename : renamePhoto,
							mimetype: photo.mimetype,
							size: photo.size
						}
					});
				} else {
					res.send({
						message: `Cannot update Order with id = ${id}`,
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

//retrieve all 
exports.findAll = (req,res) => {
	var user = ( jwt.verify(req.headers.token, secret_jwt) );

	const tanggal = req.query.tanggal;

	let condition = tanggal? { tanggal: { [Op.like]: `%${tanggal}%` }, id:user.id } : null;

	Order.findAll({where: condition})
		.then((data) => {
			res.send(data);
		}).catch((err)=>{
			res.status(500).send({
				message: err.message || "Some error occured while find order"
			});
		});
};

exports.editorder = async (req,res) => {
	const id = req.body.id;
	const nama_kegiatan = req.body.nama_kegiatan;
	const tanggal = req.body.tanggal;
	const harga = req.body.harga;
	var user = ( jwt.verify(req.headers.token, secret_jwt) );

	Order.update({
		nama_kegiatan: nama_kegiatan,
		tanggal: tanggal,
		harga: harga,
	}, {
		where: {id:id, user_id: user.id }
	}).then( (result) => {
		if(result == 1){
			//send response
			res.send({
				status: true,
				message: 'Your order has been updated',
				data: {
					id: id,
					nama_kegiatan: nama_kegiatan,
					tanggal: tanggal,
					harga: harga,
				}
			});
		} else {
			res.send({
				message: `Cannot update order id = ${id}`,
			});
		}
	}).catch((err) =>{
		res.status(500).send(err);
	});
};
