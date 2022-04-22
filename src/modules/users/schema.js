const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseJoi = require('joi');
const userID = Joi.string().guid({ version: 'uuidv4' })
const ImageExtension = require('joi-image-extension')
const Joi = BaseJoi.extend(ImageExtension)
const Name = require('./className')
exports.validator = Joi.object({
    id: userID.required()
        .required()
        .strict(),
    Name: Joi.string()
        .alpha()
        .min(2)
        .max(50)
        .required(),
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(50)
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        })
        .lowercase(),
    phoneNumber: Joi.number()
        .min(9)
        .max(11)
        .required(),
    profilePhoto: Joi
        .url()
        .minDimensions(100, 50)
        .required(),
    bio: Joi.string()
        .alphanum()
        .min(20)
        .max(240)
        .required(),
    role: Joi.string()
        .required(),
    coverPhoto: Joi
        .url()
        .minDimensions(100, 50)
        .required(),
    subscription: Joi.string()
        .required(),
    disabled: Joi.boolean()
        .required(),
});

exports.userSchema = new mongoose.Schema({
    id: String,
    name: {
        first : String,
        last : String
    },
    username: String,
    email: String,
    phoneNumber: Number,
    profilePhoto: String,
    bio: String,
    role: String,
    coverPhoto: String,
    subscription: String,
    disabled: Boolean
});

let data = {
    id,
    Name,
    username,
    email,
    phoneNumber,
    profilePhoto,
    bio,
    role,
    coverPhoto,
    subscription,
    disabled
}

function validateUserSchema(data){
    return Joi.validate(data, validator, (err, value) => {

        if (err) {

            return value

        } else {

            return value
        }
    });
}