//  @author: Saran B Soman

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../db')


//function to login
exports.login = async (req, res) => {
    try {
        
        const {email, pswd} = req.body
        console.log(req.body)
        if( !email || !pswd ) {
            console.log('enter email or password')
            return res.status(400).render('login.ejs', {
                message: 'Please provide email and password'
            })
        }

        db.query('SELECT * from login WHERE email = ?', [email], async (error, results) => {
            
            if(error) console.log(error)
            else if ( results == '') {
                return res.status(401).render('login.ejs', {
                    message: 'Incorrect email or password'
                })
            }
            else if ( !results || !(await bcrypt.compare(pswd, results[0].password)) ) {
                return res.status(401).render('login.ejs', {
                    message: 'Incorrect email or password'
                })
            } else {
                console.log('logged In')

                const id = results[0].id

                const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })

                console.log(`The token is ${token}`)

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                //set cookie
                res.cookie('jwt', token, cookieOptions)

                //get cookie
                // const cookieToken = req.cookies.jwt
                

                //get id from token
                const userId = await jwt.verify(token, process.env.JWT_SECRET)
                
                console.log(userId.id)

                db.query('SELECT * FROM login WHERE id = ?', [userId.id], (error, results) => {
                    if(error) console.log('error getting data from login')
                    else {
                        const user = results[0].usertype
                        console.log(user)
                        // res.send(user)
                        if( user == 'doctor')  {
                            db.query('SELECT name FROM doctor WHERE login_id = ?', [userId.id], (error, result) => {
                                if(error) console.log(error)
                                let name = result[0].name
                                console.log(`Name is ${name}`)
                                db.query('UPDATE login SET status = "online" WHERE id = ?', [userId.id], (error) => {if(error) console.log(error)})
                                res.redirect('/doctorHome')
                            })
                            

                        } else if ( user == 'patient' ) {
                            db.query('SELECT name FROM patient WHERE login_id = ?', [userId.id], (error, result) => {
                                if(error) console.log(error)
                                let name = result[0].name
                                console.log(`Name is ${name}`)
                                db.query('UPDATE login SET status = "online" WHERE id = ?', [userId.id], (error) => {if(error) console.log(error)})
                                res.redirect('/patientHome')
                            })
                            
                        }
                    }
                })

            }
        })
    } catch (error) {
        console.log(error)
    }
}
