//  @author: Saran B Soman

const express = require('express')
const updateService = require('../controllers/update')

const router = express.Router() 

//pass patient values for updation 
router.post('/updatePatientProfile', updateService.updatePatientProfile)

//pass doctor values for updation
router.post('/updateDoctorProfile', updateService.updateDoctorProfile)

module.exports = router