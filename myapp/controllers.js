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

const getProfileData = (req, res, db) => {
  db.select('*').from('users').orderBy('id', 'asc').then(items => {res.json(items)}) 
  }

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  getProfileData
}