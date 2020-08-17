module.exports = app => {
	const users  = require("../controllers/user.controllers");
	let   router = require("express").Router();

	//create new post
	router.post("/signup",users.signup);
	router.post("/uploadidentity/:id",users.uploadidentity);

	router.post("/resetpassword",users.resetpassword);

	router.post("/signin",users.signin);
	
	app.use("/api_atur_keuangan/users", router);
}