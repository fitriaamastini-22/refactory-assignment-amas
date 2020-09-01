module.exports = app => {
    const auth = require("../middleware/auth");
    const products = require("../controllers/product.controllers");

    let router = require("express").Router();

    router.post("/",products.createproduct); //membuat user, password generate random, hanya admin yang bisa
    router.get("/",products.listproduct); //hanya admin yang bisa
    router.get("/:id",products.detailproduct);//hanya admin yang bisa
    router.put("/:id",products.updateproduct);//hanya admin yang bisa
    router.delete("/:id",products.deleteproduct); //hanya admin yang bisa
    router.post("/upload-photo-product",products.uploadphotoproduct);

    app.use("/api/v1/product", auth.isAuth, router);
}