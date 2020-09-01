module.exports = app => {
	const auth = require("../middleware/auth");
    const users = require("../controllers/user.controllers");

    let router = require("express").Router();

    router.post("/login",users.login); //masuk sebagai apa saja bisa
    router.post("/register",users.register); //sebagai suppliers

    router.post("/", auth.isAuth, users.createuser); //membuat user, password generate random, hanya admin yang bisa
    router.get("/", auth.isAuth, users.listuser); //hanya admin yang bisa
    router.get("/:id", auth.isAuth, users.detailuser);//hanya admin yang bisa
    router.put("/:id", auth.isAuth, users.updateuser);//hanya admin yang bisa
    router.delete("/:id", auth.isAuth, users.deleteuser); //hanya admin yang bisa

    app.use("/api/v1/user",router);
}