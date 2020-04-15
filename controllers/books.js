let router = require('express').Router()
let db = require('../models')

//INDEX OF ALL BOOKS
router.get('/', (req, res) => {
  db.book.findAll()
    .then((books) => {
      res.render('books/index', {books})
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})
//ROUTE REDIRECT AFTER ADD NEW BOOKS
router.post('/', (req, res) => {
  db.book.create(req.body)
    .then(() => {
      res.redirect('/books')
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})
//NEW BOOK SUBMISSION, PASSING AUTHORS FOR DROPDOWN
router.get('/new', (req, res) => {
  db.author.findAll()
    .then(authors => {
      res.render('books/new', { authors })
    })
    .catch((err) => {
      console.log('error')
      res.render('error')
    })

})

router.get('/:id', (req, res) => {
  db.book.findOne({
    where: {id: req.params.id },
    include: [db.author]
  })
  .then((book) => {
    res.render('books/show', {book})
  })
  .catch((err) => {
    console.log(err)
    res.render('error')
  })
})

module.exports = router
