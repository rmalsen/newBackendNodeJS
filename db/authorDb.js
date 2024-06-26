const Author = require('../model/authorModel')
const mongoose = require('mongoose')


const findAuthors = async(obj)=>{
    return await Author.find(obj).populate('book').select('-__v').exec()
}

const findAuthorById = async(obj)=>{
    return await Author.findOne(obj).populate('book').select('-__v').exec()
}

const saveAuthor = async(newAuthor)=>{
    return await newAuthor.save()
}

const updateAuthor = async(filter, update)=>{
    return await Author.updateOne(filter, update, {new: true}).exec()
}

const deleteAuthor = async(obj)=>{
    return await Author.deleteOne(obj).exec()
}

module.exports = {findAuthors, findAuthorById, saveAuthor, updateAuthor, deleteAuthor}