// Required Modules
const router = require('express').Router();

// Controllers
const {
	register,
	getProfile,
	getWarehouses,
	getCrops,
	login,
} = require('../controllers/farmer/');

// Router Settings
router.post('/register', register);
router.post('/login', login);
router.post('/getProfile', getProfile);
router.get('/getWarehouses', getWarehouses);
router.post('/getCrops', getCrops);

// Export the router
module.exports = router;
