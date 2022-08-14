const mongoose = require("mongoose");
const validator = require("validator");


const signupSchema = new mongoose.Schema({
    username:{
        type : String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email")
            }
        }
        
    },
    password:{
        type:String,
        required: true,
        min : 6
    },
    cpassword:{
        type:String,
        required: true,
        min : 6
    }
})


const signupModal = mongoose.model("signup", signupSchema)

module.exports = signupModal;