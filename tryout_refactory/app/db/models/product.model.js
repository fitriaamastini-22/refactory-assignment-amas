module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define("products", {
		name:{
			type: Sequelize.STRING,
			allowNull: false
		},
		stock:{
			type: Sequelize.INTEGER
		},
		// photo:{
		// 	type: Sequelize.STRING
		// },
		price:{
			type: Sequelize.INTEGER
		},
		id_user:{
			type: Sequelize.INTEGER,
			allowNull: false
		// 	references: { 
		// 		model: 'users',
		// 		key: 'id'
		// 	}
		},
	});

	Product.associate = function(models){
		Product.hasMany(models.ProductIn, { as: 'ProductIns', foreignKey:"id_product"});
		Product.hasMany(models.ProductOut, { as: 'ProductOuts', foreignKey:"id_product"});
		Product.belongsTo(models.User, { as: 'Supplier', foreignKey:"id_user"});
	};

	return Product;
}