const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
        //name lowercse or not- Ta se puchna hai
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    logoLink: { 
        type: String,
        required: true },
    isDeleted: {
        type: Boolean,
        default: false
    }

},{timestamps:true})


module.exports=mongoose.model('college',collegeSchema)