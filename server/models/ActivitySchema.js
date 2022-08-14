const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    activity:{
        type : String,
        required:true
    }
})

const ActivityModal = mongoose.model("activity", ActivitySchema)

module.exports = ActivityModal;