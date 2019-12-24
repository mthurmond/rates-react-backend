const express = require('express')

var db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'rates'
    }
  });

const main = require('./controllers.js')

const app = express()
const port = 3010

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/home', (req, res) => main.getTableData(req, res, db))

app.listen(port, () => console.log(`Example app listening on port ${port} and connected to!`))