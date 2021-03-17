const mongoose = require ('mongoose')
const schema = mongoose.schema

const userSchema = new mongoose.Schema({
    email :{
        type: String
    }, 
    password:{
        type: String
     }
}, {timestamp: true})

const user = mongoose.model('User', userSchema)
module.exports = user