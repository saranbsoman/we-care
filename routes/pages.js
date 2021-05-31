//  @author: Saran B Soman

const express = require('express')
const { verify } = require('jsonwebtoken')
const authController = require('../services/pages')

const router = express.Router()

//display index
router.get('/', (req, res) => {
    res.render('index.ejs', {name: ''})
})

//display patient registration
router.get('/register/patient', (req, res) => {
    res.render('registerPatient.ejs', {message: ''})
})

//display doctor registration
router.get('/register/doctor', (req, res) => {
    res.render('registerDoctor.ejs', {message: ''})
})

//display login page
router.get('/login', (req, res) => {
    res.render('login.ejs', {message: ''})
})

//display patient home
router.get('/patientHome', authController.patientHome, (req, res) => {
    res.render('patientHome.ejs', {message: ''})
})

//display doctor home
router.get('/doctorHome', authController.doctorHome, (req, res) => {
    res.render('doctorHome.ejs', {message: ''})
})

//logout
router.get('/logout', authController.logout)

//doctors who are available
router.get('/doctorIn', authController.doctorIn)

//unavailable doctors
router.get('/doctorOut', authController.doctorOut)

//page to message doctor
router.get('/messageDoctor', authController.messageDoctor)

//page to message patient
router.get('/messagePatient', authController.messagePatient)

//patient profile
router.get('/patientProfile', authController.patientProfile)

//doctor profile
router.get('/doctorProfile', authController.doctorProfile)

//online doctors
router.get('/onlineDoctors', authController.onlineDoctors)

//offline doctors
router.get('/offlineDoctors', authController.offlineDoctors)

//display all doctors
router.get('/allDoctors', authController.allDoctors)

//to sort language
router.get('/sortByLanguage', authController.sortByLanguage)



module.exports = router