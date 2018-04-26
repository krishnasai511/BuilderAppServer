const mongoose = require('mongoose')
const validator = require('validator');

const schema = mongoose.Schema

const userSchema = new schema({
    username:{
        type: String,
        required: true,
        trim: true,
        // minlength:4,
        // maxlength:13
    },
    email:{
        type: String,
        required: true,
        trim: true,
        // minlength:5,
        // maxlength:32,
       unique:true,
       validate: {
           validator:validator.isEmail,
           message: '{VALUE} is not a valid email' 
       }
    },
    phonenumber:{
        type: Number,
        required: true,
        trim: true,
         minlength:3,
         maxlength:10
    },
    password:{
        type: String,
        required: true,
        trim: true,
        // minlength:4,
        // maxlength:10,
    },
    
})

module.exports = mongoose.model('user', userSchema, 'users')






