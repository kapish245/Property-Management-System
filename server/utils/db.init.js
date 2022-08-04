const mongoose = require('mongoose');
const logger = require('./logger.init');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI,(err)=>{
    if(err)
        logger.error(err);
    logger.info("Database connected successfully")
})

module.exports=mongoose;