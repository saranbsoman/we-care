//  @author: Saran B Soman


const express = require('express')
const sendMessage = require('../services/sendMessage')

const router = express.Router()


//send messages to doctor
router.post('/sendMessageToDoctor', sendMessage.sendMessageToDoctor)

//send messages to patient
router.post('/sendMessageToPatient', sendMessage.sendMessageToPatient)


module.exports = router