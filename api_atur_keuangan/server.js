const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileUpload");

//Models
const db = require("./app/models/index"); 
const app = express();

//create log 
app.use(morgan('combined'));

//parse request application / json x-www-form-url=encode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({extended: false}));

//sync database
db.sequelize.sync();

//enable files.upload
app.use(fileUpload({
	createParentPath: true,
	limits:{
		fileSize: 1000000
	},
	abortOnLimit: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
require("./app/routes/order.routes")(app);
require("./app/routes/user.routes")(app);

//set port listen for request
const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
	console.log(`server is running on http://localhost: ${PORT}`);
});