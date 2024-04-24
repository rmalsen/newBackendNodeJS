const express = require("express");
const cors = require('cors')
const app = express();
const userRouter = require('../router/userRouter')
const bookRouter = require('../router/bookRouter')
const authorRouter = require('../router/authorRouter')
const {connect} = require('../db/db')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res)=>{
    res.status(200).json({message: 'Service is up and running....'})
})


app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/author', authorRouter);

app.use('/', (req, res, next)=>{
    const error = new Error("We can't load the page you're looking for...")
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    return res.status(error.status || 500).json({
        message: error.message
    })
})
connect()

module.exports = app;