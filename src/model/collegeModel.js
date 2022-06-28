const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    logoLink: { requireed: true },
    isDeleted: {
        type: boolean,
        default: false
    }

},{timestamps:true})


module.exports=mongoose.model('college',collegeSchema)