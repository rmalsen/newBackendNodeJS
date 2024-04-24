const mongoose = require('mongoose')
const User = require('../model/userModel')
require('dotenv').config({path: '../dot.env'});
const connect = async ()=>{
    // await mongoose.connect(process.env.mongoDB)
    try {
        await mongoose.connect(process.env.mongoDB);
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Failed to connect to MongoDB", error);
      }
}

const disconnect = async()=>{
    await mongoose.connection.close()
}

const findUser = async(obj)=>{
    return User.findOne(obj).exec()
}

const saveUser = async(newUser)=>{
    return await newUser.save();
}

module.exports = {connect, disconnect, findUser, saveUser};