const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Validation>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const regEx = /^[a-zA-Z ]*$/;
const regEx1 = /[a-zAa-z\,]+[0-9]?/
const regexlogolink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/

const isValidation = function (value) {
    if (typeof value == 'undefined' || value == null) return false
    if (typeof value == "string" && value.trim().length == 0) return false
    return true
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>postapi>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


const createCollege = async function (req, res) {
    try {
        let data = req.body
        const { name, fullName, logoLink } = data

        /// validation /////

        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: 'Please enter data' }) }

        if (!name) return res.status(400).send({ status: false, message: 'Name must be present' })
        if (!isValidation(name)) return res.status(400).send({ status: false, message: "Name should be valid" })
        if (!regEx.test(name)) {
            return res.status(400).send({ status: false, msg: "Name must be in alphabate" });
        }

        const SearchName = await collegeModel.findOne({ name: name })
        if (SearchName) return res.status(400).send({ status: false, msg: "name must be unique" })

        if (!fullName) return res.status(400).send({ status: false, message: 'fullname must be present' })
        if (!isValidation(fullName)) return res.status(400).send({ status: false, message: 'fullName should be valid' })
        if (!regEx1.test(fullName)) {
            return res.status(400).send({ status: false, msg: "Full Name must be in alphabate" });
        }

        if (!logoLink) return res.status(400).send({ status: false, message: 'logoLink is required' })
        if (!isValidation(logoLink)) return res.status(400).send({ status: false, message: 'logolink must be present' })
        if (!regexlogolink.test(logoLink)) return res.status(400).send({ status: false, message: 'logolink must be valid' })

        const collegeData = await collegeModel.create(data)
        let newData = { name: collegeData.name, fullName: collegeData.fullName, logoLink: collegeData.logoLink, isDeleted: collegeData.isDeleted }
        return res.status(201).send({ status: true, data: newData })


    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>getapi>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const collegeDetails = async (req, res) => {

    try {
        let collegeName = req.query.collegeName

        if (!collegeName || !collegeName.trim()) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid details in Query" });
        }

        const collegeDetails = await collegeModel.findOne({ name: collegeName })
        if (!collegeDetails) return res.status(404).send({ status: false, msg: "College doesn't exist" })
        let interns = await internModel.find({ collegeId: collegeDetails._id }).select({ name: 1, email: 1, mobile: 1 })

        let data = { name: collegeDetails.name, fullName: collegeDetails.fullName, logoLink: collegeDetails.logoLink, interns: interns }
        res.status(200).send({ status: true, data: data })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports = { createCollege, collegeDetails }
