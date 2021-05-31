//  @author: Saran B Soman

//VALIDATION
const { ref } = require('@hapi/joi')
const Joi = require('@hapi/joi')

const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().min(1).required(),
    gender: Joi.string().required(),
    phno: Joi.number().min(10).required(),
    spec: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    pswd: Joi.string().min(5).required(),
    pswdConfirm: Joi.string().min(5).required()

}).unknown()

const patientSchema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().min(1).required(),
    gender: Joi.string().required(),
    phno: Joi.number().min(10).required(),
    lang: Joi.required(),
    email: Joi.string().min(6).required().email(),
    pswd: Joi.string().min(5).required(),
    pswdConfirm: Joi.string().min(5).required()
}).unknown()

const loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    pswd: Joi.string().min(8).required()
})



module.exports = {schema, loginSchema, patientSchema}