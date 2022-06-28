const mongoose = require("mongoose")

const internSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        collegeId: {
            type: ObjectId,
            ref: "college",
            required: true
        },
        isDeleted: {
            type: boolean,
            default: false
        }


    }, { timestamps: true })


module.exports = mongoose.model('intern', internSchema)