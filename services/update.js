//  @author: Saran B Soman

const jwt = require('jsonwebtoken')
const db = require('../db')


//update patient profile
exports.updatePatientProfile = async (req, res) => {
    try {
            // return res.send('upate profile')
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        console.log(user)
        const { name, age, gender, phno } = req.body
        console.log(req.body)

        const file = req.files.img
        console.log(file)
        const img_name = file.name
        console.log(img_name)

        if(file.mimetype == 'image/jpeg' || file.mimetype == "image/png"||file.mimetype == "image/gif") {
        file.mv('public/images/upload/'+file.name) 
        }

        db.query('UPDATE patient SET name = ?, age = ?, gender = ?, contactno = ?, image = ? WHERE login_id = ?', [name, age, gender, phno, img_name, user.id], (error) => { if(error) console.log(error)})
        res.redirect('/patientHome')
    } catch (error) {
        console.log(error)
    }
}

//update doctor profile
exports.updateDoctorProfile = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        const { name, age, gender, phno, spec } = req.body
    
        const file = req.files.img
        const img_name = file.name
        console.log(img_name)
    
        if(file.mimetype == 'image/jpeg' || file.mimetype == "image/png"||file.mimetype == "image/gif") {
          file.mv('public/images/upload/'+file.name) 
        }
    
        db.query('UPDATE doctor SET name = ?, age = ?, gender = ?, contactno = ?, specification = ?, image = ? WHERE login_id = ?', [name, age, gender, phno, spec, img_name, user.id], (error) => { if(error) console.log(error) })
        res.redirect('/doctorHome')
    } catch (error) {
        console.log(error)
    }
}