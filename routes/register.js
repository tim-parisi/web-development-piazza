const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')

router.post('/', async(req, res)=>{
    // Validations for registering new user
    const {error} = registerValidation(req.body)
    if (error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Check existing users (validation part 2)
    const userExists = await User.findOne({email:req.body.email})
    if (userExists) {
        return res.status(400).send({message:'user already exists'})
    }

    // Generate hashed password
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password,salt)


    // Create new user
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })

    // Send user to mongoDB
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send({message:err})
    }
})

module.exports = router