const {
  findAuthors,
  findAuthorById,
  saveAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../db/authorDb");
const Author = require("../model/authorModel");
const successTemplate = require("../template/successTemplate");
const errorTemplate = require("../template/errorTemplate");
const messages = require("../messages/messages");
const mongoose = require('mongoose')
const Book = require('../model/bookModel')


exports.getAuthors = async (req, res) => {
  try {
    const authors = await findAuthors({});
    if (!authors) {
      return successTemplate(res, authors, messages.no_authors_found, 200);
    } else {
      return successTemplate(res, authors, messages.authors_found, 200);
    }
  } catch (e) {
    return errorTemplate(res, e, messages.no_authors_found, 500);
  }
};

exports.getAuthorById = async (req, res) => {
    try {
        const id = req.params.authorId;
        const author = await findAuthorById({_id: id})
        if(!author){
            throw new Error('Author does not exist')
        }else{
            return successTemplate(res, author, messages.authors_found, 200)
        }
    } catch (e) {
        return errorTemplate(res, e, e.message, 500)
    }
};


exports.postAuthor = async (req, res) => {
  try {
    const author = await findAuthorById({
      name: req.body.name,
      book: req.body.bookId,
    });
    if (author) {
      throw new Error("Author already exists");
    } else {
        const id = new mongoose.Types.ObjectId();
      const newAuthor = new Author({ _id: id });
      const assignedAuthor = Object.assign(newAuthor, req.body);
      const savedAuthor = await saveAuthor(assignedAuthor);
      
      return successTemplate(res, savedAuthor, messages.author_saved, 200);
    }
  } catch (e) {
    return errorTemplate(res, e, e.message, 500);
  }
};

// exports.postAuthor = async (req, res) => {
//     try {
      
//       if (!mongoose.Types.ObjectId.isValid(req.body.bookId)) {
//         throw new Error('Invalid book ID'); 
//       }
//       const book = await Book.findById(req.body.bookId);
//       if (!book) {
//         throw new Error('Book not found');
//       }
//       const author = await findAuthorById({
//         name: req.body.name,
//         book: req.body.bookId,
//       });
  
//       if (author) {
//         throw new Error("Author already exists");
//       } else {
//         const newAuthor = new Author({
//           _id: new mongoose.Types.ObjectId(),
//           name: req.body.name,
//           book: req.body.bookId,
//           publisher: req.body.publisher,
//           website: req.body.website,
//           twitter: req.body.twitter,
//           about: req.body.about
//         });
  
//         const savedAuthor = await saveAuthor(newAuthor);
//         return successTemplate(res, savedAuthor, messages.author_saved, 200);
//       }
//     } catch (e) {
//       return errorTemplate(res, e, e.message);
//     }
//   };


exports.patchAuthor = async (req, res) => {
    try {
        const id = req.params.authorId;
        const author = new Author()
        const update = Object.assign(author, req.body)
        const result = await updateAuthor({_id: id}, update)
        return successTemplate(res, result, messages.author_updated, 200)
        
    } catch (e) {
       return errorTemplate(res, e, messages.author_not_updated, 500) 
    }
};
exports.deleteAuthor = async (req, res) => {
    try {
        const id = req.params.authorId;
        const author = await deleteAuthor({_id: id})
        return successTemplate(res, author, messages.author_deleted, 200)
    } catch (e) {
        return errorTemplate(res, e, messages.author_not_deleted, 500) 
    }
};
