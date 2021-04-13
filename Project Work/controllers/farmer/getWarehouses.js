module.exports = async (req, res) => {
	const warehouses = [
		{
			description: 'Mera Warehouse',
			location: {
				address: 'ABC, Near XYZ Road',
				longitude: 10.00202,
				latitude: 12.0392,
			},
			storage: 50,
		},
	];
	
	const response = {
		success: true,
		data: {
			warehouses
		},
		error: null
	}

	return res.send(response);
};
