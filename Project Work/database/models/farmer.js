const mongoose = require('mongoose');

exports.farmerUser = mongoose.model(
	'Farmer',
	new mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		password: String,
		email: String,
		mobile: String,
		crop: [
			{
				storageTime: Date,
				quantity: Number,
				warehouseId: Number,
				paymentId: String,
				cropType: String,
			},
		],
	})
);
