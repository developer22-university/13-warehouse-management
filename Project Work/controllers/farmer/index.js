const getCrops = require('./getCrops');
const getProfile = require('./getProfile');
const getWarehouses = require('./getWarehouses');
const register = require('./register');
const login = require('./login');
const validate = require('./validate_register');

module.exports = {
	getProfile,
	getWarehouses,
	getCrops,
	register,
	validate,
	login,
};
