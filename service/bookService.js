const {findBooks, findBook, saveBook, updateBook, deleteBook} = require('../db/bookDb')
const successTemplate = require('../template/successTemplate')
const errorTemplate = require('../template/errorTemplate')
const messages = require('../messages/messages')
const Book = require('../model/bookModel')
const mongoose = require('mongoose')



exports.getAllBooks = async(req, res)=>{
try {
    const books = await findBooks({}, '-__v')
    return successTemplate(res, books, messages.books_found, 200)

} catch (e) {
    return errorTemplate(res, e, messages.book_not_found, 500)
}
}


exports.getAllBookIds = async(req, res)=>{
    try {
        const books = await findBooks({}, '_id, title')
        return successTemplate(res, books, messages.books_found, 200)
    } catch (error) {
        return errorTemplate(res, e, messages.book_not_found, 500)
    }
}

exports.getBookById = async(req, res)=>{
    try {
        const id  = req.params.bookId;
        const book = await findBook({_id: id}, '-__v')
        return successTemplate(res, book, messages.books_found, 200)

        
    } catch (e) {
        return errorTemplate(res, e, messages.book_not_found, 500)
    }
}

exports.postBook = async(req, res)=>{
    try {
        const bookStub = new Book();
        const foundBook = Object.assign(bookStub, req.body)
        const book = await findBook(foundBook)

        if(book){
            throw new Error('Book already exists')
        }else{
            let newBook = new Book({ _id: new mongoose.Types.ObjectId()})
            newBook = Object.assign(newBook, req.body)
            const savedBook = await saveBook(newBook)
            return successTemplate(res, savedBook, messages.book_saved, 201)
        }
    } catch (e) {
        return errorTemplate(res, e, e.message, 501)
    }
}


exports.updateBook = async(req, res)=>{
    try {
        const id  = req.params.bookId;
        const book = new Book();
        const update = Object.assign(book, req.body);
        const result = await updateBook({_id: id}, update)

        if(result.modifiedCount === 0){
            return errorTemplate(res, { message: "No book found with that ID to update." }, messages.book_not_updated, 404)
        }
        return successTemplate(res, result, messages.book_updated, 200)
    } catch (e) {
        console.log(e.message)
        return errorTemplate(res, e, messages.book_not_updated, 500)
    }
}
// exports.updateBook = async(req, res) => {
//     try {
//         const id = req.params.bookId;
//         const updateData = req.body;  // Use request body directly if it contains the update fields
//         const result = await updateBook({_id: id}, updateData);

//         if (result.modifiedCount === 0) {
//             return errorTemplate(res, { message: "No book found with that ID to update." }, messages.book_not_updated, 404);
//         }
//         return successTemplate(res, result, messages.book_updated, 200);
//     } catch (e) {
//         console.log(e.message);
//         return errorTemplate(res, e, messages.book_not_updated, 500);
//     }
// };

exports.deleteBook = async(req, res)=>{
    try {
        const id = req.params.bookId;
        const result = await deleteBook({_id: id});
        return successTemplate(res, result, messages.book_deleted, 200)
    } catch (e) {
        return errorTemplate(res, e, messages.book_not_deleted, 500)
    }
}