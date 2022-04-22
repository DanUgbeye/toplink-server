const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const userID = Joi.string().guid({ version: 'uuidv4' })
exports.validator = Joi.object({
    id: userID.required()
        .required()
        .strict(),
    author: Joi.string()
        .alphanum()
        .min(4)
        .max(50)
        .required(),
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string(),
    url: ('http:/', Joi.string()
        .uri()
        .required()),
    icon: Joi.string()
        .required(),
    privacy: Joi.string()
});

exports.linkSchema = new mongoose.Schema({
    id: String,
    author: String,
    title: String,
    description: String,
    url: String,
    icon: String,
    privacy: String,

});

let data = {
    id,
    author,
    title,
    description,
    url,
    icon,
    privacy,
}


function validateUserSchema(data) {
    return Joi.validate(data, validator, (err, value) => {

        if (err) {

            return value

        } else {

            return value
        }
    });
}

