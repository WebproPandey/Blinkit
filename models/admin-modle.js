const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const adminschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures unique email
        match: /.+\@.+\..+/ // Basic email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
       type: String,
       enum: ["admin", "superadim"], // Admin and User roles
       required: true

    }
    
}, { timestamps: true });


const validateAdmin = (adminData) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid("admin", "superadmin").required() 
    });

    return schema.validate(adminData);
};

module.exports ={
   adminModel: mongoose.model("admin", adminschema),
    validateAdmin,
}

