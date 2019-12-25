const getTableData = (req, res, db) => {
    db.select('*').from('leads')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

const postTableData = (req, res, db) => {
  const { first, last, email } = req.body
  const created_on = new Date()
  db('leads').insert({first, last, email, created_on})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
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