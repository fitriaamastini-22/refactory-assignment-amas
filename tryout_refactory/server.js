require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary");
const lodash = require("lodash");

//Models
const db = require("./app/db/models/index");

const app = express();

//create log
app.use(morgan('combined'));

//parse request application / json x-www-form-urlencode
//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Sync database
db.sequelize.sync();

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 1000000
    },
    abortOnLimit: true
}));



//user, product, productin, productout routes
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/product_in.routes")(app);
require("./app/routes/product_out.routes")(app);
require("./app/routes/report.routes")(app);



//set port, listen for request
const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`server is running on http://localhost : ${PORT} `);
})