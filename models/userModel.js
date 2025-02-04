const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {checkSchema, validationResult} = require('express-validator')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'please enter your firstName']
    },
    lastName:{
        type:String,
        required:[true, 'please enter your lastName']
    },
    userName:{
        type:String,
        required:[true, 'please enter your username'],
        minLength:4
    },
    image:String,
    email:{
        type:String,
        unique:true,
        required:[true, 'please enter your email'],
        // isEmail:true,
        // errorMessage:'please provide a valid email'
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email',
          ],
    },
    password:{
        type:String,
        required:[true, 'please enter your password'],
        minLength:6
    },
    passwordConfirm:{
        type:String,
        required:[true, 'please confirm your password'],
        validate:{
            validator: function (el){
             return   el === this.password
            },
            message:'password are not the same'
        }
    }
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, 10)
        this.passwordConfirm = undefined
        next()
})

const User = mongoose.model('User', userSchema)

module.exports = User