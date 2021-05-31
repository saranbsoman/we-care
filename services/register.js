//  @author: Saran B Soman

const bcrypt = require('bcryptjs')
const {schema, patientSchema} = require('../validation')
const db = require('../db')
const {dupEmail, insertPatient, insertLanguage, insertLogin, insertDoctor} = require('../query/db')

//function for patient registration
exports.registerPatient = async(req, res) => {
    try {
        console.log(req.body)
        const {error} = patientSchema.validate(req.body)
        if(error){
            const msg = error.details[0].message
            return res.status(400).render('registerPatient.ejs', {
                message: msg
            })
        } else {

        //is called destructuring assignment
        const { name, age, gender, phno, lang, email, pswd, pswdConfirm } = req.body
        console.log(lang)


        db.query(dupEmail, [email], async (error, results) => {
            if(error) {
                console.log(error)
            }

            if(results.length > 0) {
                console.log(results)
                console.log('This email is already in use')
                return res.render('registerPatient.ejs', {
                    message: 'This email is already in use'
                })
            } else if(pswd !== pswdConfirm) {
                return res.render('registerPatient.ejs', {
                    message: 'The password donot match'
                })
            } else {
                
                let hashedPswd = await bcrypt.hash(pswd, 8)
                console.log(hashedPswd)

                db.query(insertLogin, {email: email, password: hashedPswd, usertype: 'patient'}, (error, results) => {
                    if(error) {
                        console.log('error in login table')
                    } else {
                        console.log(results)
                        db.query(dupEmail, [email], (error, rows, fields) => {
                            if(error) console.log('error in selecting from login')
                            else {
                                console.log(rows[0].id)
                                console.log(fields)
                                const login_id = rows[0].id


                                // const file = 'admin.png'
                                const img_name = 'propic.jpg'
                                console.log(img_name)

                                // if(file.mimetype == 'image/jpeg' || file.mimetype == "image/png"||file.mimetype == "image/gif") {
                                // file.mv('public/images/upload/'+img_name) 
                                // }


                                db.query(insertPatient, {name: name, age: age, gender: gender, contactno: phno, image: img_name, login_id: rows[0].id}, (error, results) => {
                                    if (error) {
                                        console.log(error)
                                    } else {

                                        if(lang.length > 4) {
                                            let language = lang
                                            db.query(insertLanguage, {language, login_id}, (error) => {
                                                if(error) console.log(error)
                                            })
                                        } else {  
                                            lang.forEach(element => {
                                                let lan = ''
                                                console.log(element)
                                                language = element
                                                db.query(insertLanguage, {language, login_id}, (error) => {
                                                    if(error) console.log(error)
                                                })
                                            })
                                            
                                        } 
                                            
                    
                                        console.log(results)
                                        console.log('register success')
                                        res.render('login.ejs', {message: ''})
                                    }
                                })
                            }
                        })
                    }
                })
            
            } 
        })
    }

    } catch (error) {
        console.log(error)
    }
}


//function for doctor registration
exports.registerDoctor = (req, res) => {
    try {
        console.log(req.body)

        //is called destructuring assignment
        const { name, age, gender, phno, spec, lang, email, pswd, pswdConfirm } = req.body
        // return res.send(lang)
        const {error} = schema.validate(req.body)
        if(error) {
            const msg = error.details[0].message
            // res.send(msg)
            return res.status(400).render('registerDoctor.ejs', {
                message: msg
            })
        }

        // if( !name ) {
        //     return res.status(400).render('registerDoctor.ejs', {
        //         message: 'Please fill the form'
        //     })
        // }

        db.query(dupEmail, [email], async (error, results) => {
            if(error) {
                console.log(error)
            }

            if(results.length > 0) {
                console.log(results)
                console.log('This email is already in use')
                return res.render('registerDoctor.ejs', {
                    message: 'This email is already in use'
                })
            } else if(pswd !== pswdConfirm) {
                return res.render('registerDoctor.ejs', {
                    message: 'The password donot match'
                })
            } else {
                
                let hashedPswd = await bcrypt.hash(pswd, 8)
                console.log(hashedPswd)

                db.query(insertLogin, {email: email, password: hashedPswd, usertype: 'doctor'}, (error, results) => {
                    if(error) {
                        console.log('error in login table')
                    } else {
                        console.log(results)
                        db.query(dupEmail, [email], (error, rows, fields) => {
                            if(error) console.log('error in selecting from login')
                            else {
                                console.log(rows[0].id)
                                console.log(fields)
                                const login_id = [rows[0].id]

                                // const file = 'admin.png'
                                const img_name = 'propic.jpg'
                                console.log(img_name)

                                // if(file.mimetype == 'image/jpeg' || file.mimetype == "image/png"||file.mimetype == "image/gif") {
                                // file.mv('public/images/upload/'+img_name) 
                                

                                db.query(insertDoctor, {name: name, age: age, gender: gender, contactno: phno, specification: spec, image: img_name, login_id: rows[0].id}, (error, results) => {
                                    if (error) {
                                        console.log(error)
                                    } else {
                                        console.log(lang)
                                        // let i = 0
                                        // lang.forEach(i  => i++)
                                        console.log(`Length of lang ${lang.length}`)
                                        if(lang.length > 4) {
                                            const language = lang
                                            db.query(insertLanguage, {language, login_id}, (error) => {
                                                if(error) console.log(error)
                                            })
                                        } else {  
                                            lang.forEach(element => {
                                                let lan = ''
                                                console.log(element)
                                                language = element
                                                db.query(insertLanguage, {language, login_id}, (error) => {
                                                    if(error) console.log(error)
                                                })
                                            })
                                            
                                        } 
                                        // console.log(results)
                                        console.log('register success')
                                        res.render('login.ejs', {message: ''})
                                    }
                                })
                            }
                        })
                    }
                })
            
            } 
        })
    } catch (error) {
        console.log(error)
    }

}