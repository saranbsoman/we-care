//  @author: Saran B Soman

const express = require('express')
const authController = require('../controllers/auth')

const router = express.Router()


//pass login values
router.post('/login', authController.login)


module.exports = router