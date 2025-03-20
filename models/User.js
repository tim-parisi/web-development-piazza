const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type:String,
        require:true,
    },
    email: {
        type:String,
        require:true,
    },
    password: {
        type:String,
        require:true,
        max:1024
    },
})

module.exports = mongoose.model('users', UserSchema)