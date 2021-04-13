// Required Modules
const bcrypt = require('bcrypt');
const _ = require('lodash');

// Database Model
const { farmerUser } = require('../../database/models/farmer');

// Utilities
const { validate } = require('./validate_register');
const { errorCustom } = require('../error/error');

// Router Definition
module.exports = async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		const errorBlock = errorCustom(
			error.details[0].path[0],
			error.details[0].type
		);
		return res.send({ status: 'Fail', data: null, error: errorBlock });
	}

	// Check if the Farmer Already Exists (Same Username)
	const username = await farmerUser.findOne({ username: req.body.username });
	if (username != null) {
		return res.send({
			status: 'Fail',
			data: null,
			error: { errCode: 1021, msg: 'This username has already been taken.' },
		});
	}

	// Check if the Farmer Already Exists (Same Email Address)
	const email = await farmerUser.findOne({ email: req.body.email });
	if (email) {
		return res.send({
			status: 'Fail',
			data: null,
			error: { errCode: 1022, msg: 'User already exists' },
		});
	}

	// Insert the new Farmer
	let farmer = new farmerUser(
		_.pick(req.body, [
			'firstName',
			'lastName',
			'username',
			'password',
			'email',
			'mobile',
		])
	);

	// Encrypt the password
	const salt = await bcrypt.genSalt(10);
	farmer.password = await bcrypt.hash(farmer.password, salt);

	// Save the Farmer in the Database
	const response = await farmer.save();

	// Database Error
	if (!response) {
		return res.send({
			success: false,
			data: null,
			error: { code: 1100, msg: 'Database Error' },
		});
	}

	// Return Successfully
	return res.send({
		success: true,
		data: _.pick(farmer, [
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
