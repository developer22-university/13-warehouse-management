const Joi = require('joi');



// This function checks the validity of the inputs of admin during registration

function validateUser(user) {

    const schema = Joi.object({
        first_name: Joi.string().min(5).max(50).required(),
        last_name: Joi.string().min(5).max(50).required(),
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        mobile: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(user);
}


exports.validate = validateUser;
