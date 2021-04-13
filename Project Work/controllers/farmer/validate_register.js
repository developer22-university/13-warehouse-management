// Required Modules
const Joi = require('joi');

// Checks the validity of the Inputs of a Farmer during Registration
function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(5).max(50).required().token(),
    password: Joi.string().min(6).max(255).required(),
    confirmPassword: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    mobile: Joi.string().min(5).max(50).required().pattern(/^[0-9]+$/),
  });
  return schema.validate(user);
}

exports.validate = validateUser;
