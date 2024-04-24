require('dotenv').config()
const jwt = require('jsonwebtoken')
const errorTemplate = require('../template/errorTemplate')
const messages = require('../messages/messages')


module.exports =(req, res, next)=>{
try{
    const [,token] = req.headers.authorization.split(' ');
    jwt.verify(token, process.env.jwt)
    next()

}catch(e){
    return errorTemplate(res, e, messages.auth_failed, 500)
}
}