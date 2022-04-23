const mongoose = require('mongoose');
const Joi = require('joi');

exports.linkSchemaValidator = Joi.object({
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

// let data = {
//     id,
//     author,
//     title,
//     description,
//     url,
//     icon,
//     privacy,
// }

