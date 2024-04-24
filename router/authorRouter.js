const auth = require('../auth/authorization')
const express = require('express')
const router = express.Router()
const {getAuthors, getAuthorById, postAuthor, patchAuthor, deleteAuthor} = require('../service/authorService');


router.get('/', [auth, getAuthors]);
router.get('/:authorId', [auth, getAuthorById])

router.post('/', [auth, postAuthor])
router.patch('/:authorId', [auth, patchAuthor])
router.delete('/:authorId', [auth, deleteAuthor])










module.exports = router;