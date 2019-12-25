const getTableData = (req, res, db) => {
  db.select('*').from('leads').then(items => {res.json(items)}) 
  }

const postTableData = (req, res, db) => {
  const { first, last, email } = req.body
  const created_on = new Date()
  db('leads').insert({first, last, email, created_on}).then(res.send('Record added'))
  }

const putTableData = (req, res, db) => {
  const { lead_id, first, last, email } = req.body
  db('leads').where({lead_id}).update({first, last, email}).then(res.send('Record updated'))
}

const deleteTableData = (req, res, db) => {
  const { lead_id } = req.body
  db('leads').where({lead_id}).del().then(res.send('Record deleted'))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
}