const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var session = require('express-session')

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

//use express-session to append session object to each request so server can tell which user is sending them and send back the appropriate content
app.use(session({
  secret: 'jlkvA8a8c9239slcd003k9d9kk039djJkdPQIdo993jdmd',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.json())

//accepts requests from any domain
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/home', (req, res) => main.getTableData(req, res, db))
app.post('/home', (req, res) => main.postTableData(req, res, db))
app.put('/home', (req, res) => main.putTableData(req, res, db))
app.delete('/home', (req, res) => main.deleteTableData(req, res, db))

app.get('/profile', (req, res) => main.getProfileData(req, res, db))

app.post('/login', (req, res) => main.postLoginData(req, res, db))

app.get('*', (req, res) => res.send('There is nothing here.'))

app.listen(port, () => console.log(`App listening on port ${port}!`))