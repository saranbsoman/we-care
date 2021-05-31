//  @author: Saran B Soman

const express = require('express')
const path = require('path')
const db = require('./db')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const fileUpload = require('express-fileupload')


const app = express()


//to get css file from public folder
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

db.connect((error) => {
    if(error){
        console.log(error)
    } else{
        console.log('MySQL connected...')
    }
})

//parse URL encoded bodies sent by HTML forms
app.use(express.urlencoded({ extended: false }))
// parse JSON bodies from API clients
app.use(express.json())
//get cookies
app.use(cookieParser())
//upload images
app.use(fileUpload())

//define the extension for templates
app.set('view-engine','ejs')

//Define routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register'))
app.use('/update', require('./routes/update'))
app.use('/sendMessage', require('./routes/sendMessage'))


const port = process.env.PORT || 3001
app.listen(port, console.log(`server is up and running on ${port} ...`))

