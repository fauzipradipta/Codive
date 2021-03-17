const User = require ('../models/User')
const bcrypt = require('bcryptjs')
const jwt   = require('jsonwebtoken')

const register = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
    })

    let user = new User({
        email: req.body.email, 
        password: hashedPass
    })
    user.save().then(user =>{
            res.json({
                message: 'User Added Successfully!'
            })
    })
    .catch(error => {
        res.json({
            message:'An error accured'
        })
    })
}

module.exports ={
    register
}