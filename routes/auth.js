const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

router.post('/', async(req, res)=>{
    // Validation
    const {error} = loginValidation(req.body)
    if(error) {
        return res.send({message:error['details'][0]['message']})
    }

    // Check existing users (validation part 2)
    const user = await User.findOne({email:req.body.email})
    if (!user) {
        return res.status(400).send({message:'username or password is incorrect'})
    }

    // Check Password
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password)
    if (!passwordValidation) {
        return res.status(400).send({message:'username or password is incorrect'})
    }

    // Generate authToken
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({'auth-token':token})
})

module.exports = router