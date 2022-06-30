const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')


const isValidation = function (value) {
    if (typeof value == 'undefined' || value == null) return false
    if (typeof value == "string" && value.trim().length == 0) return false
    return true
}

const createCollege = async function (req, res) {
    try {
        let data = req.body
        var regEx = /^[a-zA-Z]+/;


        const { name, fullName, logoLink } = data

        /// validation /////

        if (!Object.keys(data).length) { return res.status(400).send({ status: false, message: 'Please enter data' }) }

        if (!name) return res.status(400).send({ status: false, message: 'Name must be present' })
        if (!isValidation(name)) return res.status(400).send({ status: false, message: "Name should be valid" })
        if (!regEx.test(name)) {
            return res.status(400).send({ status: false, msg: "Name must be in alphabate" });
        }

        let SearchName = await collegeModel.findOne({ name: name })
        if (SearchName) return res.status(400).send({ status: false, msg: "Already exist" })

        if (!fullName) return res.status(400).send({ status: false, message: 'fullname must be present' })
        if (!isValidation(fullName)) res.status(400).send({ status: false, message: 'fullName should be valid' })
        if (!regEx.test(fullName)) {
            return res.status(400).send({ status: false, msg: "Full Name must be in alphabate" }); //last main no dene se nehi aa raha hai
        }

        if (!logoLink) return res.status(400).send({ status: false, message: 'logoLink is required' })
        if (!isValidation(logoLink)) return res.status(400).send({ status: false, message: 'logolink must be present' })

        let collegeData = await collegeModel.create(data)

        return res.status(201).send({ status: true, data: collegeData })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}


const collegeDetails = async (req, res) => {

    try {
        let collegeName = req.query.collegeName
        let college = req.query
        if (Object.keys(college).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid details in Query" });
        }

        let collegeDetails = await collegeModel.findOne({ name: collegeName })
        if (!collegeDetails) return res.status(404).send({ status: false, msg: "College doesn't exist" })
        let interns = await internModel.find({ collegeId: collegeDetails._id }).select({ name: 1, email: 1, mobile: 1 })

        if (interns.length === 0)
            interns = "No Intern found"

        let data = { name: collegeDetails.name, fullName: collegeDetails.fullName, logoLink: collegeDetails.logoLink, interns: interns }
        res.status(200).send({ status: true, data: data })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails