const bcrypt = require('bcrypt');
const _ = require('lodash');
const { farmerUser } = require('../../database/models/farmer');
const { validate } = require('./validate_login');
const { errorCustom } = require('../error/error');

var jwt = require('jsonwebtoken');

// This function checks the user's login credentials in database and respond accordingly.

module.exports = async (req, res) => {
	// First Validate The HTTP Request
	const { error } = validate(req.body);
	if (error) {
		const errorBlock = errorCustom(
			error.details[0].path[0],
			error.details[0].type
		);
		return res.send({ success: false, data: null, error: errorBlock });
	}

	//  Now find the user by their email address
	let user = await farmerUser.findOne({ email: req.body.userEmail });
	if (!user) {
		user = await farmerUser.findOne({ username: req.body.userEmail });
		if (!user) {
			return res.send({
				success: false,
				data: null,
				error: { errCode: 1052, msg: 'Incorrect email/username or password.' },
			});
		}
	}

	// Then validate the Credentials in MongoDB match
	// those provided in the request
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) {
		return res.send({
			success: false,
			data: null,
			error: { errCode: 1052, msg: 'Incorrect email/username or password.' },
		});
	}

	const token = jwt.sign(
		{
			userId: user._id,
		},
		process.env.SECRET
	);

	res.cookie('token', token);

	return res.send({
		success: true,
		data: _.pick(user, [
			'_id',
			'firstName',
			'lastName',
			'username',
			'password',
			'email',
			'mobile',
		]),
		error: null,
	});
};
