// Carregar módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const adm = require('./routes/adm')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const Handlebars = require('handlebars')
const moment = require('moment')
const momentHandler = require('handlebars.moment')
momentHandler.registerHelpers(Handlebars)

// Configurações

// Sessão
app.use(
  session({
    secret: 'SessaoCriada',
    resave: true,
    saveUninitialized: true
  })
)
app.use(flash())

// Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Handlebars
app.engine(
  'handlebars',
  handlebars.engine({
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')

// Mongoose - Conexão e informação se conectou ou não.
mongoose.Promise = global.Promise
mongoose
  .connect('mongodb://localhost/blogfilmes')
  .then(() => {
    console.log('Conexao realiada com sucesso!')
  })
  .catch(err => {
    console.log('Erro ao tentar realizar conexao: ' + err)
  })

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Rotas
app.use('/', adm)

app.get('/addfilmes', (req, res) => {
  res.render('Adicionar novos filmes')
})

// Outros
const PORT = 8080
app.listen(PORT, () => {
  console.log('Servidor Iniciado!')
})
