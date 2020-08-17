module.exports = (sequelize, Sequelize) =>{
	const Order = sequelize.define("orders", {
		nama_kegiatan:{
			type: Sequelize.STRING
		},
		tanggal:{
			type: Sequelize.STRING
		},
		harga:{
			type: Sequelize.INTEGER
		},
		struk:{
			type: Sequelize.STRING
		},

	});
	return Order;
}

/*
S besar (Sequelize) -> Class
s kecil (sequelize) -> berisi objek koneksi yang sudah dibuat
*/