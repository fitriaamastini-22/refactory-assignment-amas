module.exports = app => {
	const auth = require("../middleware/auth");
	const orders  = require("../controllers/order.controllers");
	
	let   router = require("express").Router();

	//create new order
	router.post("/",orders.create);
	router.get("/",orders.findAll);
	router.post("/editorder",orders.editorder);

	router.put("/image-photo/:id/:nama_kegiatan", orders.uploadImageOrder);

	app.use("/api_atur_keuangan/orders", auth.isAuth, router);
}