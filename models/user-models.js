const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const AddressSchema = mongoose.Schema({
    state: {
        type: String,
        required: true,
        minlength: 2
    },
    city: {
        type: String,
        required: true,
        minlength: 2
    },
    pin: {
        type: Number,
        required: true,
        min: 10000, 
        max: 999999 
    },
    address: {
        type: String,
        required: true,
        minlength: 5
    }
});

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ 
    },
    password: {
        type: String,
        minlength: 6
    },
    phone: {
        type: Number,
        match: /^[0-9]{10}$/
    },
    addresses:{
     type:[AddressSchema],
     validate: [arrayLimit , "{PATH} exceeds the limit of 5"]
    }
    
}, { timestamps: true });

function arrayLimit(val){
  return val.length <=5
}


const validateUser = (userData) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6),
        phone: Joi.string().pattern(/^[0-9]{10}$/),
        addresses: Joi.array().items(
            Joi.object({
                state: Joi.string().min(2).required(),
                city: Joi.string().min(2).required(),
                pin: Joi.number().integer().min(100000).max(999999).required(),
                address: Joi.string().min(5).required()
            })
        )
    });

    return schema.validate(userData);
};

module.exports = {
   userModel:mongoose.model("user", userschema),
  validateUser
}
