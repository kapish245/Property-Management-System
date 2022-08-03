const express = require('express');

const logger = require('../../utils/logger.init');
const propertyService = require("../services/property.service");
module.exports={
    getAllProperty:function(){
        return new Promise(async(resolve, reject) => { 
            try {
                const result = await propertyService.returnAllPropertyData();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    },
    getSingleProperty:function(requestParams){
        return new Promise(async(resolve, reject) => { 
            try {
                const result = await propertyService.returnSinglePropertyData(requestParams);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    },
    createProperty:function(requestBody){
        return new Promise(async(resolve, reject) => { 
            try {
                const result = await propertyService.insertPropertyData(requestBody);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    },
    updateProperty:function(requestParams,requestBody){
        return new Promise(async(resolve, reject) => { 
            try {
                const result = await propertyService.updatePropertyData(requestParams,requestBody);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    },
    deleteProperty:function(requestParams){
        return new Promise(async(resolve, reject) => { 
            try {
                const result = await propertyService.removePropertyData(requestParams);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    },


}