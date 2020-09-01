module.exports = app => {
    const auth = require("../middleware/auth");
    const product_out = require("../controllers/product_out.controllers");

    let router = require("express").Router();

    router.post("/",product_out.createproductout); //membuat user, password generate random, hanya admin yang bisa
    router.get("/",product_out.listproductout); //hanya admin yang bisa
    router.get("/:id",product_out.detailproductout);//hanya admin yang bisa
    router.put("/:id",product_out.updateproductout);//hanya admin yang bisa
    router.delete("/:id",product_out.deleteproductout); //hanya admin yang bisa

    app.use("/api/v1/out", auth.isAuth, router);
}