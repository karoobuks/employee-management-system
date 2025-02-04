const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res, next)=>{
    try{
        const newUser = await User.create(req.body)
        return res.status(201).json({newUser})
    }catch(error){
        return res.status(500).json({message:'internal server error', error:error.message})
    }
}

exports.login = async (req, res, next)=>{
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message:'Please provide email and password'})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:'Invalid email or password'})
        }

         const isPasswordCorrect = await bcrypt.compare(password, user.password)
         if(!isPasswordCorrect){
            return res.status(401).json({message:'Invalid email or password'})
         }

         const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET,{expiresIn:'1h',})
         return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
      }
}