module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("users", {
		fullname:{
			type: Sequelize.STRING,
			allowNull: false
		},
		username:{
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		email:{
			type: Sequelize.STRING,
			allowNull: false
		},
		phone_number:{
			type: Sequelize.STRING
		},
		salt:{
			type: Sequelize.STRING
		},
		password:{
			type: Sequelize.STRING
		},
		role:{
			type: Sequelize.ENUM,
			values: ['admin', 'supplier']
		},
	});

	User.associate = function(models){
		User.hasMany(models.Product, { as: 'Products', foreignKey:"id_user"});
	};

	return User;
}