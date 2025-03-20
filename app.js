const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


require('dotenv/config')
app.use(bodyParser.json())


const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)

const authRoute = require('./routes/auth')
app.use('/login', authRoute)

const registerRoute = require('./routes/register')
app.use('/register', registerRoute)


console.log(process.env.DB_CONNECTOR)

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('Your mongoDB connector is on...')
})

app.listen(3000, ()=>{
    console.log('Server is running')
})