module.exports = app => {
    const auth = require("../middleware/auth");
    const report = require("../controllers/report.controllers");

    let router = require("express").Router();

    router.post("/:type",report.print); // :type (IN/OUT)

    app.use("/api/v1/print", auth.isAuth, router);
}