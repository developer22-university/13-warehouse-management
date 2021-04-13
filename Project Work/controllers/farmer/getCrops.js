module.exports = async (req, res) => {
	const crops = [
		{
			storageTime: Date.now(),
			quantity: 20,
			warehouseId: 20,
			paymentId: '12873912703lkjda',
			cropType: 'Wheat',
		},
		{
			storageTime: Date.now(),
			quantity: 30,
			warehouseId: 50,
			paymentId: '1873912703lkjda',
			cropType: 'Rice',
		},
	];

	const response = {
		success: true,
		data: {
			crops,
		},
		error: null,
	};

	return res.send(response);
};
