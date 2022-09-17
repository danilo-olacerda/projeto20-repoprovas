import joi from 'joi';

const newUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassowrd: joi.string().valid(joi.ref('password')).required()
});

export default newUserSchema;