const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")
let regexMail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
let regexNumber = new RegExp('[0-9]{10}');
var regName = /^[a-zA-Z]+$/;


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const createIntern = async function (req, res) {
    try {
        const requestBody = req.body;
        const intern = req.body
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please enter data" })
        }

        const { name, email, mobile, collegeName } = requestBody;

        if (!isValid(name)) return res.status(400).send({ status: false, msg: "Name is required" })
        const validName = regName.test(intern.name)
        if (validName == false) return res.status(400).send({ status: false, msg: "name must be in alphabet" })

        if (!isValid(email)) return res.status(400).send({ status: false, msg: "Email is required" })

        let checkMail = regexMail.test(intern.email)
        if (checkMail == false) return res.status(400).send({ status: false, msg: "email is not valid" })

        const emailAlraedyUsed = await internModel.findOne({ email: email })
        if (emailAlraedyUsed) {
            return res.status(400).send({ status: false, msg: "Email already used" })
        }

        if (!isValid(mobile)) return res.status(400).send({ status: false, msg: "Mobile Number is required" })

        let checkMobileNo = regexNumber.test(intern.mobile)
        if (checkMobileNo == false) return res.status(400).send({ status: false, msg: "Mobile Number is not valid" })

        const mobileAlreadyUsed = await internModel.findOne({ mobile: mobile })
        if (mobileAlreadyUsed) {
            return res.status(400).send({ status: false, msg: "Mobile Number already used" })
        }

        if (!isValid(collegeName)) return res.status(400).send({ status: false, msg: " College Name is required" })


        const college = await collegeModel.findOne({ name: collegeName })
        const collegeId = college._id
        if (!collegeId) {
            return res.status(400).send({ status: false, msg: "College Name doesn't exist" })
        }


        const allData = { name, email, mobile, collegeId }

        const newData = await internModel.create(allData)
        return res.status(201).send({ status: true, msg: newData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}



module.exports.createIntern = createIntern