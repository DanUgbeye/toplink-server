const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
// const userID = Joi.string().guid({ version: 'uuidv4' })
// const ImageExtension = require('joi-image-extension');
// const Joi = BaseJoi.extend(ImageExtension)

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

exports.userSchemaValidator = Joi.object({

    Name: Joi.object({
        first: Joi.string()
        .alpha()
        .min(2)
        .max(50)
        .required(),

        last: Joi.string()
        .alpha()
        .min(2)
        .max(50)
        .required(),
    }),

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
        .lowercase()
        .required(),

    phoneNumber: Joi.number()
        .min(9)
        .max(11),

    profilePhoto: Joi
        .url()
        .minDimensions(100, 50),

    bio: Joi.string()
        .alphanum()
        .min(20)
        .max(240),
        
    role: Joi.string()
        .required(),

    coverPhoto: Joi
        .url()
        .minDimensions(100, 50),

    subscription: Joi.string()
        .required(),

    disabled: Joi.boolean()
        .required(),
});

