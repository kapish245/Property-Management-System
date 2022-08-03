const createError = require('http-errors');
const mongoose = require('mongoose');

const logger = require('../../utils/logger.init');
const Property = require("../model/property.model");
const { options } = require('../routes/property.routes');

module.exports={
    returnAllPropertyData:function(){
        return new Promise(async (resolve, reject) => { 
            try {
                const result = await Property.find({},{ __v:0}).lean()
                logger.info({operation:"returnAllPropertyData",result:result})
                if(!result){
                    throw createError(404,"property does not exist");
                }
                resolve(result);
            } catch (error) {
                logger.error(error.message);
                reject(error)
            }
         })
    },
    returnSinglePropertyData:function({id}){
        return new Promise(async (resolve, reject) => { 
            try {
                const result = await Property.findById(id);
                logger.info({operation:"returnSinglePropertyData",result:result})
                if(!result){
                    throw createError(404,"property does not exist");
                }
                resolve(result)
            } catch (error) {
                if(error instanceof mongoose.CastError)
                    reject(createError(400,"invalid Property Id"))
                logger.error(error.message);
                reject(error);
            }
         })
    },
    insertPropertyData:function({name,description,size}){
        return new Promise(async (resolve, reject) => { 
            try {
                const property = new Property({
                    name:name,
                    description:description,
                    size:size
                })
                const result = await property.save();
                logger.info({operation:"insertPropertyData",result:result})
                resolve(result)
            } catch (error) {
                if(error.name = "ValidationError")
                    reject(createError(422,"All fields [name,description,size] are mandatory"))
                logger.error(error.message);
                reject(error);
            }
         })
    },
    updatePropertyData:function({id},updateBody){
        return new Promise(async (resolve, reject) => { 
            try {
                const result = await Property.findByIdAndUpdate(id,updateBody,{new:true});
                if(!result){
                    throw createError(404,"property does not exist");
                }
                logger.info({operation:"updatePropertyData",result:result});
                resolve(result);
            } catch (error) {
                if(error instanceof mongoose.CastError)
                    reject(createError(400,"invalid Property Id"))
                logger.error(error.message);
                reject(error);
            }
         })
    },
    removePropertyData:function({id}){
        return new Promise(async (resolve, reject) => { 
            try {
                const result = await Property.findByIdAndDelete(id);
                if(!result){
                    throw createError(404,"property does not exist");
                }
                resolve({operation:"removePropertyData",result:result});
            } catch (error) {
                if(error instanceof mongoose.CastError)
                    reject(createError(400,"invalid Property Id"))
                logger.error(error.message);
                reject(error);
            }
         })
    },
}