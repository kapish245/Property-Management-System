//requiring libraries
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

//express instance
const app = express();
require('dotenv').config();

//middlewares
app.use(morgan("dev"));

//routes
app.get("/",(req,res)=>{
    res.send("Welcome to property management system");
})  


//server listening
app.listen(process.env.PORT, async(err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`server started at port ${process.env.PORT}`);
  });
  
