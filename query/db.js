// @author : Saran B Soman


//query to verify email
const dupEmail = 'SELECT * from login WHERE email = ?'

//query to get data from TABLE => 'login'
const getLoginData = 'SELECT * FROM login WHERE id = ?'

//get data from TABLE => 'doctor'
const getDoctorData = 'SELECT * FROM doctor WHERE login_id = ?'

//get data from TABLE => 'patient'
const getPatientData = 'SELECT * FROM patient WHERE login_id = ?'

//update login COLUMN => 'status'
const updateLoginStatus = 'UPDATE login SET status = ? WHERE id = ?'

//get data from TABLE => 'doctor' where login.status = 'in'
const getDoctorDataStatus = 'SELECt * FROM login, doctor WHERE login.id = doctor.login_id AND login.status = ? '

//get all data from TABLE => 'languages'
const getLanguages = 'select * from languages'

//insert into TABLE => 'login'
const insertLogin = 'INSERT INTO login SET ?'

//insert into TABLE => 'patient'
const insertPatient = 'INSERT INTO patient SET ?'

//insert into TABLE => 'doctor'
const insertDoctor = 'INSERT INTO doctor SET ?'

//insert into TABLE => 'languages'
const insertLanguage = 'INSERT INTO languages ?'

//insert into TABLE => 'message'
const insertMessage = 'INSERT INTO message set ?'

//get data from TABLE => 'message' 
const getMessageDataId = 'SELECT * FROM message WHERE patient_id = ? AND doctor_id = ?'

//update TABLE => 'patient'
const updatePatient = 'UPDATE patient SET name = ?, age = ?, gender = ?, contactno = ?, image = ? WHERE login_id = ?'

//update TABLE => 'doctor'
const updateDoctor = 'UPDATE doctor SET name = ?, age = ?, gender = ?, contactno = ?, specification = ?, image = ? WHERE login_id = ?'

module.exports = {
    dupEmail,
    getDoctorData, 
    getPatientData, 
    getLoginData, 
    updateLoginStatus, 
    getDoctorDataStatus,
    getLanguages,
    insertLogin,
    insertPatient,
    insertLanguage,
    insertDoctor,
    insertMessage,
    getMessageDataId,
    updatePatient,
    updateDoctor
}