// author: Saran B Soman


//query to get data from TABLE => 'login'
const getLoginData = 'SELECT * FROM login WHERE id = ?'

//get data from TABLE => 'doctor'
const getDoctorData = 'SELECT * FROM doctor WHERE login_id = ?'

//get data from TABLE => 'patient'
const getPatientData = 'SELECT * FROM patient WHERE login_id = ?'

//get all data from TABLE => 'languages'
const getLanguages = 'select * from languages'

module.exports