//  @author: Saran B Soman

const express = require('express')
const registerService = require('../controllers/register')

const router = express.Router() 

//pass patient values for registration
router.post('/registerPatient', registerService.registerPatient)

//pass doctor values for registration
router.post('/registerDoctor', registerService.registerDoctor)

module.exports = router