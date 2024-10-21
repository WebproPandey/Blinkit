const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const productschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    price: {
        type: Number,
        required: true,
        
    },
    category: {
        type: String,
        required: true,
        minlength: 2
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
       
    },
    image: {
        type: Buffer,
    }
}, { timestamps: true });


// Joi Validation Schema
const validateProduct = (productData) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        price: Joi.string().required(),
        category: Joi.string().min(2).required(),
        stock: Joi.number().min(0).required(),
        description: Joi.string(),
        image: Joi.binary(),
    });

    return schema.validate(productData);
};

module.exports ={

    Productmodel: mongoose.model("Product", productschema),
    validateProduct,
}