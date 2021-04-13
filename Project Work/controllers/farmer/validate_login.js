const Joi = require('joi');

// This function checks the validity of the inputs provided by user.

function validate(req) {
  const schema = Joi.object({
    // username: Joi.string().min(5).max(255),
    // email: Joi.string().min(5).max(255),
    userEmail: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

exports.validate = validate;
