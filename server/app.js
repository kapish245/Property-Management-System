//requiring libraries
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');


const logger = require('./utils/logger.init');
const propertyRouter = require('./api/routes/property.routes');
const mongoose = require("./utils/db.init");

//express instance
const app = express();
require('dotenv').config();

//middlewares
app.use(require("morgan")("combined", { "stream": logger.stream }));
app.use(express.json())
app.use('/api',propertyRouter);
//routes
app.get("/",(req,res)=>{
    res.send("Welcome to property management system");
})  

app.use((req,res,next)=>{
    next(createError(404,"NotFound"));
})

//error handler
app.use((err,req,res,next)=>{
    res.status(err.status||500).send({
        error:{
            status:err.status||500,
            message:err.message
        }
    });
})

//server listening
app.listen(process.env.PORT, (err) => {
    try {
        if(err) {
            throw new Error(err)
          }
          logger.info(`server started at port ${process.env.PORT}`);
    } catch (error) {
        logger.error(error)
        return;
    }
    
  });
  
