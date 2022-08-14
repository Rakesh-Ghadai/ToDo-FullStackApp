const express = require("express");
const ActivityModal = require("../models/ActivitySchema");
const router = express.Router();
const jwt = require('jsonwebtoken');
const signupModal = require("../models/signupSchema")
// const Authenticate = require("../middleware/Authenticate")


router.post("/addactivity", async(req,res)=>{
    try{
        const users = new ActivityModal(req.body);
        const createUser = await users.save();
        res.status(201).send(createUser);
    }
    catch(e){
        res.status(400).send("Error in catch");
        console.log(e)
    }
});

router.get("/activity", async (req,res)=>{
    // res.status(200).send("property GET route")
    // console.log(`This is cookie from backend ${req.headers.authorization}`)

    // console.log("get route of property")
    try{
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        console.log(verifyToken)
        if(verifyToken){
            // console.log(verifyToken)
            const userDetail = await signupModal.find({email : verifyToken }) 
            // console.log(userDetail)

            if(userDetail.length){
                const ActivityData = await ActivityModal.find();
                res.status(200).send({activity:ActivityData, userData : userDetail});
                console.log(userDetail)
                
            }else{
                res.status(409).send("Unauthorized user")
            }
            // console.log(userDetail)

        }else{
            res.status(409).send("Unauthorized user")
        }
        
    }catch(err){
        console.log(err)
        res.status(400).send(err)
        // console.log(err)
    }
    
    
    // console.log(`This is cookie from backend ${req.headers.authorization}`)
    // console.log(`This is cookie-parser ${req.cookies.jwt}`)
    
    // try{
    //     const propertyData = await userModal.find();
    //     res.status(200).send({property:propertyData});

    // }
    // catch(e){
    //     res.status(400).send(e);
    // }
})


module.exports = router;