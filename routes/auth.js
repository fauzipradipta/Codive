const express  = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('./public/signup', AuthController.signup)

module.exports = router