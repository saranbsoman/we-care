//  @author: Saran B Soman

const jwt = require('jsonwebtoken')
const db = require('../db')
const {insertMessage} = require('../query/auth')


//send messages to doctor
exports.sendMessageToDoctor = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        patient_id = user.id
        const { message, doctor_id } = req.body
        console.log(req.body)
        db.query(insertMessage,{message, patient_id, doctor_id, sender:'patient'}, (error, results) => {
            if(error) console.log(error)
            if(results) {
                console.log('message sent')
                res.redirect('/messageDoctor?id='+doctor_id)
            }
        })
    } catch (JsonWebTokenError) {
        res.render('index.ejs', {name: ''})
    }
}

//send messages to patient
exports.sendMessageToPatient = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        doctor_id = user.id
        const { message, patient_id } = req.body
        console.log(req.body)
        db.query(insertMessage,{message, patient_id, doctor_id, sender: 'doctor'}, (error, results) => {
            if(error) console.log(error)
            if(results) {
                console.log('message sent')
                res.redirect('/messagePatient?id='+patient_id)
            }
        })
    } catch (JsonWebTokenError) {
        res.render('index.ejs', {name: ''})
    }
}