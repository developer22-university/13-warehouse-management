const jwt = require('jsonwebtoken');
const { farmerUser } = require('../../database/models/farmer');

module.exports = async (req, res) => {
	const token = req.cookies.token;
	// Check the Existance of Token
	if (!token) {
		return res.send({
			success: false,
			data: null,
			error: {
				code: 1001,
				msg: "User Does'nt exists",
			},
		});
	}

	// Check if Token is not corrupted
	try {
		const data = jwt.verify(token, process.env.SECRET);
		const userId = data.userId;
		farmerUser.findOne({ _id: userId }, (err, data) => {
			if (err) {
				return res.send({
					success: false,
					data: null,
					error: {
						code: 1003,
						msg: 'Database Error',
					},
				});
			}

			const { firstName, lastName, email, mobile, address } = data;
			const profile = {
				firstName,
				lastName,
				email,
				mobile,
				address,
			};

			const response = {
				success: true,
				data: {
					profile,
				},
				error: null,
			};

			return res.send(response);
		});
	} catch (err) {
		return res.send({
			success: false,
			data: null,
			error: {
				code: 1002,
				msg: 'Token is Corrupted',
			},
		});
	}
};
