module.exports = (sequelize, Sequelize) => {
	const ProductIn = sequelize.define("product_in", {
		date:{
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		},
		total:{
			type: Sequelize.INTEGER
		},
		id_product:{
			type: Sequelize.INTEGER,
			allowNull: false
		// 	references: { 
		// 		model: 'product',
		// 		key: 'id'
		// 	}
		},
	});

	ProductIn.associate = function(models){
		ProductIn.belongsTo(models.Product, { as: 'Product', foreignKey:"id_product"});
	};

	return ProductIn;
}