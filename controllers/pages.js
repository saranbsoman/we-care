//  @author: Saran B Soman

const jwt = require('jsonwebtoken')
const db = require('../db')

//get values to patient home
exports.patientHome = async (req, res) => {
    try {
        //get cookie
    const cookieToken = req.cookies.jwt
    console.log(`cookie token => ${cookieToken}`)
    
    //get id from token
    const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
    console.log(user.id)

    
    db.query('SELECT * FROM patient WHERE login_id = ? ',[user.id] , (error, results) => {
        if(error) console.log(error)
        if(results.length > 0) {
            const {name, image} = results[0]
            console.log(name)
            db.query('SELECt * FROM login, doctor WHERE login.id = doctor.login_id AND login.status="in"', (error, row) => {
                if(error) throw error
                if(row.length > 0) {
                    // console.log(row[0])
                    val = {print: row};
                    // console.log(val)
                    console.log(row)
                    // const docname = row[0].name
                    db.query('select * from languages', (error, langs) => {
                        if(error) console.log(error)
                        if(langs.length > 0) {
                            return res.render('patientHome.ejs',{name, image, row, results, langs})

                        }                      
                    })    
                } else {
                    res.render('patientHome.ejs',{name, image, row: '', results: '', langs: ''})

                }
            })            
        }
    })
    } catch (error) {
        console.log(error)
    }
}

//get values to doctor home
exports.doctorHome = async (req, res) => {
    try {
        //get cookie
        const cookieToken = req.cookies.jwt
        console.log(`cookie token => ${cookieToken}`)
        
        //get id from token
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        console.log(`login id => ${user.id}`)

        
        db.query('SELECT * FROM doctor, login  WHERE doctor.login_id = login.id AND doctor.login_id = ?', [user.id], (error, result) => {
            if(error) console.log(error)
            let {name, image} = result[0]
            let login_id = user.id
            let status = result[0].status
            console.log(result)
            db.query('SELECT * FROM message, patient WHERE message.patient_id = patient.login_id AND message.doctor_id = ? GROUP BY login_id DESC ORDER BY message.id DESC', [user.id], (error, row) => {
                if(error) console.log(error)
                // const {message, patient_id} = row
                console.log(row)
                res.render('doctorHome.ejs',{name, image, row, status})
                        
            })       
        })
    } catch (error) {
        console.log(error)
    }
} 

//get available doctors
exports.doctorIn = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        db.query('UPDATE login SET status = "in" WHERE id = ?', [user.id], (error) => {if(error) console.log(error)})
        res.redirect('/doctorHome')
    } catch (error) {
        console.log(error)
    }
}

//get unavailable doctors
exports.doctorOut = async (req, res) => {
   try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        db.query('UPDATE login SET status = "out" WHERE id = ?', [user.id], (error) => {if(error) console.log(error)})
        res.redirect('/doctorHome')
   } catch (error) {
       console.log(error)
   }
}

//display and get message page values
exports.messageDoctor = async(req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        console.log(`cookie token => ${cookieToken}`)
        
        //get id from token
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        console.log(`login id => ${user.id}`)

        const lid = req.query.id
        console.log(`user id is => ${lid}`)
        // res.send(lid)

        
        db.query('SELECT * FROM patient WHERE login_id = ?', [user.id], (error, result) => {
            if(error) console.log(error)
            let {name, image} = result[0]
            // let login_id = user.id
            // let status = result[0].status
            db.query('SELECT * FROM doctor WHERE login_id = ?', [lid], (error, values) => {
                if(error) console.log(error)
                if(values.length > 0){
                    console.log('halooooo')
                    db.query('SELECT * FROM message WHERE patient_id = ? AND doctor_id = ?', [user.id, lid], (error, msg) => {
                        if(error) console.log(error)
                        if(msg.length > 0){
                            console.log('heeeyaaaaa')
                            res.render('messageDoctor.ejs',{name, image, lid, values, msg})
                        } else {
                            console.log('olaaaa')
                            res.render('messageDoctor.ejs',{name, image, lid, values, msg: ''})
                        }
                    })
                    
                }
            })       
        })
    } catch (error) {
        console.log(error)
    }
}

//display and get message to doctor page value
exports.messagePatient = async(req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        const did = user.id
        const pid = req.query.id
        db.query('SELECT * FROM doctor WHERE login_id = ?', [did], (error, results) => {
            if (error) console.log(error)
            if(results.length > 0) {
                const {name, image} = results[0]
                db.query('SELECT * FROM message WHERE patient_id = ? AND doctor_id = ?', [pid, did], (error, msg) => {
                    if(error) console.log(error)
                    if(msg.length > 0){
                        db.query('SELECT * FROM patient WHERE login_id = ?', [pid], (error, values) => {
                            const id = values[0].login_id
                            if(error) console.log(error)
                            if(values.length > 0){
                                    res.render('messagePatient.ejs',{name, image, lid : pid, id, values, msg})  
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

//display patient profile
exports.patientProfile = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
    
        db.query('SELECt * from patient WHERE login_id = ?', [user.id], (error, results) => {
            if(error) console.log(error)
            if(results.length > 0) {
                res.render('patientProfile.ejs', {results})
            } else {
                console.log('No such records')
            }
        })
    } catch (error) {
        console.log(error)
    }
}

//display doctor profile
exports.doctorProfile = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
    
        db.query('SELECt * from doctor WHERE login_id = ?', [user.id], (error, results) => {
            if(error) console.log(error)
            if(results.length > 0) {
                res.render('doctorProfile.ejs', {results})
            } else {
                console.log('No such records')
            }
        })
    } catch (error) {
        console.log(error)
    }
}

//get online doctors
exports.onlineDoctors = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        db.query('SELECT * FROM patient WHERE login_id = ? ',[user.id] , (error, results) => {
            const {image} = results[0]
            if(error) console.log(error)
            if(results.length > 0) {
                const {name} = results[0]
                console.log(name)
                db.query('SELECT * from login, doctor WHERE login.id = doctor.login_id AND login.status = "in" ', (error, row) => {
                    if(error) console.log(error)
                    if(row.length > 0) {
                        db.query('select * from languages', (error, langs) => {
                            if(error) console.log(error)
                            if(langs.length > 0) {
                                return res.render('patientHome.ejs',{name, image, row, results, langs})   
                            }                            
                        })
                    //    const msg = 'nobody online'
                
                    } else {
                        res.render('patientHome.ejs',{name, image, row: '', results: '', langs: ''})
    
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

//get offline doctors
exports.offlineDoctors = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        db.query('SELECT * FROM patient WHERE login_id = ? ',[user.id] , (error, results) => {
            const {image} = results[0]
            if(error) console.log(error)
            if(results.length > 0) {
                const {name} = results[0]
                console.log(name)
                db.query('SELECT * from login, doctor WHERE login.id = doctor.login_id AND login.status = "offline"', (error, row) => {
                    if(error) console.log(error)
                    if(row.length > 0) {
                        db.query('select * from languages', (error, langs) => {
                            if(error) console.log(error)
                            if(langs.length > 0) {
                                return res.render('patientHome.ejs',{name, image, row, results, langs})
    
                            } else {
                                res.render('patientHome.ejs',{name, image, row: '', results: '', langs: ''})
    
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


//get all doctors
exports.allDoctors = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        db.query('SELECT * FROM patient WHERE login_id = ? ',[user.id] , (error, results) => {
            const {image} = results[0]
            if(error) console.log(error)
            if(results.length > 0) {
                const {name} = results[0]
                console.log(name)
                db.query('SELECT * from login, doctor WHERE login.id = doctor.login_id', (error, row) => {
                    if(error) console.log(error)
                    if(row.length > 0) {
                        db.query('select * from languages', (error, langs) => {
                            if(error) console.log(error)
                            if(langs.length > 0) {
                                return res.render('patientHome.ejs',{name, image, row, results, langs})
    
                            } else {
                                res.render('patientHome.ejs',{name, image, row: '', results: '', langs: ''})
    
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


//fuction to sort language
exports.sortByLanguage = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        db.query('SELECT * FROM patient WHERE login_id = ? ',[user.id] , (error, results) => {
            const {image} = results[0]
            if(error) console.log(error)
            if(results.length > 0) {
                const {name} = results[0]
                console.log(name)
                db.query('SELECT * from login, doctor WHERE login.id = doctor.login_id', (error, row) => {
                    if(error) console.log(error)
                    if(row.length > 0) {
                        db.query('select * from languages', (error, langs) => {
                            if(error) console.log(error)
                            if(langs.length > 0) {
                                db.query('SELECT * from languages, doctor WHERE languages.login_id = doctor.login_id GROUP BY languages.login_id', (error, sort) => {
                                    if(error) console.log(error)
                                    if(sort.length > 0) {
                                        return res.render('patientHome.ejs',{name, image, row, results, langs, sort})
                                    } else {
                                        res.render('patientHome.ejs',{name, image, row: '', results: '', langs: '', sort: ''})
            
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


//logout function thats expire cookie 
exports.logout = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt
        const user = await jwt.verify(cookieToken, process.env.JWT_SECRET)
        db.query('UPDATE login SET status = "offline" WHERE id = ?', [user.id], (error) => {if(error) console.log(error)})
        // res.clearCookie(cookieToken)
        const cookieOptions = {
            expires: new Date(
                Date.now()
            ),
            httpOnly: true
        }
        res.cookie('jwt', cookieToken, cookieOptions)
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}
