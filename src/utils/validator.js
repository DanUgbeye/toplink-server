const Joi = require('joi');

/**
 * 
 * @param data this is the request body to be validated by the validator
 * @param validator this is a joi schema to perform the validation
 * @returns 
 */
exports.validateData = (data, validator) => {
    const { error, value } = validator.validate(data);
    if (error) {
        return {
            isValid: false,
            error
        };
    } else {
        return {
            isValid: true,
            value
        };
    }
}