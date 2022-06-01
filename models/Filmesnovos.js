const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Filmesnovos = new Schema({
  nome: {
    type: String,
    require: true
  },
  diretor: {
    type: String,
    default: 'Nao preenchido'
  },
  idioma: {
    type: String,
    default: 'Nao preenchido'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  categoria: {
    type: String,
    enum: ["Terror", "Comedia"]
  }
})
mongoose.model('filmes', Filmesnovos)
