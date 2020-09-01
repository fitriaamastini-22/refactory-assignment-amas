module.exports = app => {
    const auth = require("../middleware/auth");
    const product_in = require("../controllers/product_in.controllers");

    let router = require("express").Router();

    router.post("/",product_in.createproductin); //membuat user, password generate random, hanya admin yang bisa
    router.get("/",product_in.listproductin); //hanya admin yang bisa
    router.get("/:id",product_in.detailproductin);//hanya admin yang bisa
    router.put("/:id",product_in.updateproductin);//hanya admin yang bisa
    router.delete("/:id",product_in.deleteproductin); //hanya admin yang bisa

    app.use("/api/v1/in", auth.isAuth, router);
}