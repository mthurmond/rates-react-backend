const getTableData = (req, res, db) => {
  db.select('*').from('leads').orderBy('lead_id', 'asc').then(items => {res.json(items)}) 
  }

const postTableData = (req, res, db) => {
  const { first, last, email } = req.body
  const created_on = new Date()
  db('leads').insert({first, last, email, created_on}).returning(['lead_id', 'first', 'last', 'email'])
  .then(item => {
    res.json(item)
    })
  }

const putTableData = (req, res, db) => {
  const { lead_id, first, last, email } = req.body
  db('leads').where({lead_id}).update({first, last, email}).returning(['lead_id', 'first', 'last', 'email'])
  .then(item => {
    console.log(item)
    res.json(item)
  })
}

const deleteTableData = (req, res, db) => {
  const { lead_id } = req.body
  db('leads').where({lead_id}).del().then(res.send('Record deleted'))
}

//https://codeshack.io/basic-login-system-nodejs-express-mysql/
const getProfileData = (req, res, db) => {
  db.select('*').from('users').orderBy('id', 'asc').then(items => {res.json(items)}) 
  }

const postLoginData = (req, res, db) => {
  //get email and password from request body
  const { email, password } = req.body
  //search for user with that email and password
  console.log(email)
  console.log(password)
  db.select('*').from('users').where({email}).returning(['email', 'password'])
  .then(item => {
    res.json(item)
  })
  //if user exists, tell them they're logged in
  //if user doesn't exist, tell them 'invalid email and/or password'

}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  getProfileData,
  postLoginData
}