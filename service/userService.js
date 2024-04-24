const User = require("../model/userModel");
const express = require("express");
const {findUser, saveUser} = require('../db/db')
const successTemplate = require('../template/successTemplate')
const errorTemplate = require('../template/errorTemplate')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const messages = require('../messages/messages')
const jwt = require('jsonwebtoken')


exports.registerUser = async (req, res) => {
  try {
    const user = await findUser({ email: req.body.email });

    if (user) {
      throw new Error("User already exists, try loggin in");
    } else {
      const newUser = new User();
      newUser._id = new mongoose.Types.ObjectId();
      const user = Object.assign(newUser, req.body);
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      const savedUser = await saveUser(user);
      return successTemplate(res, savedUser, messages.successful_registration, 201)
    }
  } catch (e) {
    return errorTemplate(res, e, e.message)
  }
};

exports.loginUser = async (req, res) => {
    try{
        const loggedUser = await findUser({ email: req.body.email });
        if (!loggedUser) {
          throw new Error("We can't find the user");
        }else{
        const user = await bcrypt.compare(req.body.password, loggedUser.password);
        if(user){
            loggedUser.password = null;
            console.log(loggedUser)
            const token = jwt.sign({user: loggedUser}, process.env.jwt)
            return successTemplate(res, loggedUser, messages.login_successful, 201, true, token)
        }else{
            throw new Error('Username and password do not match!')
        }
        }
    }catch(e){
        return errorTemplate(res, e, e.message)
    }
};
