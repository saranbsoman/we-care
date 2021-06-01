// author: Saran B Soman


//update login COLUMN => 'status'
const updateLoginStatus = 'UPDATE login SET status = ? WHERE id = ?'

//update TABLE => 'patient'
const updatePatient = 'UPDATE patient SET name = ?, age = ?, gender = ?, contactno = ?, image = ? WHERE login_id = ?'

//update TABLE => 'doctor'
const updateDoctor = 'UPDATE doctor SET name = ?, age = ?, gender = ?, contactno = ?, specification = ?, image = ? WHERE login_id = ?'

module.exports