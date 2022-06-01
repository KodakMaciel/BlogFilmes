const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Filmesnovos')
const Filmesadicionados = mongoose.model('filmes')

router.get('/', (req, res) => {
  Filmesadicionados.find()
    .sort({ date: 'desc' })
    .lean()
    .then(filmes => {
      res.render('./adm/index', { filmes })
    })
    .catch(err => {
      req.flash('error_msg', 'Erro ao listar filmes')
      res.redirect('/')
    })
})

// Filmesadicionados.find({categoria:'Terror'})

router.get('/filmes/adicionar', (req, res) => {
  res.render('./adm/addfilmes')
})

//Rota adicionar filmes
router.post('/filmesnovos', (req, res) => {
  const novoFilme = {
    nome: req.body.nome,
    diretor: req.body.diretor,
    idioma: req.body.idioma,
    categoria: req.body.opcoes
  }

  new Filmesadicionados(novoFilme)
    .save()
    .then(() => {
      req.flash('success_msg', 'Filme adicionado!')
      console.log('***Categoria Salva com Sucesso!***')
      res.redirect('/')
    })
    .catch(err => {
      req.flash('error_msg', 'Falha ao registrar, tente novamente!')
      console.log('***Erro ao salvar categoria.***')
    })
})

//Rota editar filmes
router.get('/filmes/editar/:id', (req, res) => {
  Filmesadicionados.findOne({ _id: req.params.id })
    .lean()
    .then(filmes => {
      res.render('../views/adm/editfilmes', { filmes })
    })
    .catch(err => {
      req.flash('error_msg', 'Este filme não existe!')
      res.redirect('/../')
    })
})

router.post('/filmes/editarfilme/:id', (req, res) => {
  Filmesadicionados.findOne({ _id: req.params.id })
    .then(filmes => {
      filmes.nome = req.body.nome
      filmes.diretor = req.body.diretor
      filmes.idioma = req.body.idioma
      filmes.categoria = req.body.opcoes

      filmes
        .save()
        .then(() => {
          req.flash('success_msg', 'Categoria editada com sucesso!')
          res.redirect('/../')
        })
        .catch(err => {
          req.flash(
            'error_msg',
            'Houve um erro interneo ao salvar a edicao do filme'
          )
          res.redirect('/../')
        })
    })
    .catch(err => {
      req.flash('error_msg', 'Houve um erro ao editar o filme' + err)
      res.redirect('/../')
    })
})

//Rota deletar filmes
router.post('/filmes/deletar', (req, res) => {
  Filmesadicionados.deleteOne({ _id: req.body.id })
    .then(() => {
      req.flash('success_msg', 'Filme removido com sucesso!')
      res.redirect('../')
    })
    .catch(err => {
      req.flash('error_msg', 'Houve um erro ao deletar o filme' + err)
      res.redirect('../')
    })
})

module.exports = router
