const successTemplate = (res, result, message, status, boole, token)=>{
    return res.status(status).json({
        message: message,
        result: result,
        logged: boole,
        token, token
    })
}

module.exports = successTemplate