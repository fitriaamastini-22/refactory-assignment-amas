module.exports = (sequelize, Sequelize) => {
	const ProductOut = sequelize.define("product_out", {
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

	ProductOut.associate = function(models){
		ProductOut.belongsTo(models.Product, { as: 'Product', foreignKey:"id_product"});
	};

	return ProductOut;
}