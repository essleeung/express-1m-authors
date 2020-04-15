let router = require('express').Router()
//require models folder and reference this object as db
let db = require('../models')

//ALL AUTHORS DISPLAY
router.get('/', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('authors/index', {authors})
  })
  .catch((err) => {
    console.log('ERROR', err)
    res.render('error!')
  })
})
//ROUTE REDIRECT AFTER ADD NEW AUTHORS
router.post('/', (req, res) => {
  db.author.create(req.body)
  .then(() => {
    res.redirect('/authors')
  })
  .catch((err) => {
    console.log(err)
    res.render('error')
  })
})

//FORM FOR NEW AUTHORS
router.get('/new', (req, res) => {
  res.render('authors/new')
})

//ROUTE FOR ONE AUTHOR DISPLAY
router.get('/:id', (req, res) => {
  db.author.findOne({
    where: {id: req.params.id },
    include: [db.book]
  })
  .then((author) => {
    res.render('authors/show', {author})
  })
  .catch((err) => {
    console.log(err)
    res.render('error')
  })
  
})

module.exports = router
