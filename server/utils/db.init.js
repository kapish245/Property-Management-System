const mongoose = require('mongoose');
const logger = require('./logger.init');
require('dotenv').config();

mongoose.connect(process.env.MONGODBURI,(err)=>{
    if(err)
        logger.error(err);
    logger.info("Database connected successfully")
})

module.exports=mongoose;