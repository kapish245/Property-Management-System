const logger = require('../../utils/logger.init');
const Property = require("../model/property.model");
const createError = require('http-errors');
const { options } = require('../routes/property.routes');

module.exports={
    returnAllPropertyData:function(){
        return new Promise((resolve, reject) => { 
            try {
                const result = Property.find()
                logger.info({operation:"returnAllPropertyData",result:result})
                resolve(result);
            } catch (error) {
                reject(error)
            }
         })
    },
    returnSinglePropertyData:function({id}){
        return new Promise(async (resolve, reject) => { 
            try {
                const result = await Property.findById(id);
                logger.info({operation:"returnSinglePropertyData",result:result})
                resolve(result)
            } catch (error) {
                reject(new Error(error));
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
                reject(new Error(error));
            }
         })
    },
    updatePropertyData:function({id},updateBody){
        return new Promise(async (resolve, reject) => { 
            try {
                const result = await Property.findByIdAndUpdate(id,updateBody,{new:true});
                logger.info({operation:"updatePropertyData",result:result});
                resolve(result);
            } catch (error) {
                reject(new Error(error));
            }
         })
    },
    removePropertyData:function({id}){
        return new Promise(async (resolve, reject) => { 
            try {
                const result = await Property.findByIdAndDelete(id);
                resolve({operation:"removePropertyData",result:result});
            } catch (error) {
                reject(new Error(error));
            }
         })
    },
}