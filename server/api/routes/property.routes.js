const express = require('express');
const router = express.Router();

const logger = require('../../utils/logger.init');
const propertyController = require("../controller/property.controller");

router.get("/getProperty",async(req,res,next)=>{
        try {
            const result = await propertyController.getAllProperty();
            res.send({status:"Fetched",result:result})
        } catch (error) {
            next(error);
        }
    
})

router.post("/createProperty",async(req,res,next)=>{
        try {
            const result = await propertyController.createProperty(req.body);
            res.status(201).send({status:"Created",result:result})
        } catch (error) {
            next(error)
        }
})
router.get("/getProperty/:id",async(req,res,next)=>{
    try {
        const result = await propertyController.getSingleProperty(req.params);
        res.send({status:"Fetched",result:result})
    } catch (error) {
        next(error);
    }

})

router.put("/updateProperty/:id",async(req,res,next)=>{
    try {
        const result = await propertyController.updateProperty(req.params,req.body);
        res.send({status:"Updated",result:result})
    } catch (error) {
        next(error);
    }

})

router.delete("/deleteProperty/:id",async(req,res,next)=>{
    try {
        const result = await propertyController.deleteProperty(req.params);
        res.send({status:"Deleted",result:result})
    } catch (error) {
        next(error);
    }

})

module.exports=router;