const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>Validation>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const regexMail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const regexNumber = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
const regexName = /^[a-zA-Z]+/;


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>postapi>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const createIntern = async function (req, res) {
    try {
        const requestBody = req.body;
        const { name, email, mobile, collegeName } = requestBody;

        if (Object.keys(requestBody).length == 0) {
            return res.status(400).send({ status: false, msg: "Please enter data" })
        }

        if (!isValid(name)) return res.status(400).send({ status: false, msg: "Name is required" })
        const validName = regexName.test(name)
        if (!validName) return res.status(400).send({ status: false, msg: "name must be in alphabet" })

        if (!isValid(email)) return res.status(400).send({ status: false, msg: "Email is required" })

        let checkMail = regexMail.test(email)
        if (!checkMail) return res.status(400).send({ status: false, msg: "email is not valid" })

        const emailAlraedyUsed = await internModel.findOne({ email })
        if (emailAlraedyUsed) {
            return res.status(400).send({ status: false, msg: "Email already used" })
        }

        if (!isValid(mobile)) return res.status(400).send({ status: false, msg: "Mobile Number is required" })

        let checkMobileNo = regexNumber.test(mobile)
        if (!checkMobileNo) return res.status(400).send({ status: false, msg: "Mobile Number must 10 digit only." })

        const mobileAlreadyUsed = await internModel.findOne({ mobile: mobile })
        if (mobileAlreadyUsed) {
            return res.status(400).send({ status: false, msg: "Mobile Number already used" })
        }

        if (!isValid(collegeName)) return res.status(400).send({ status: false, msg: " College Name is required" })

        const college = await collegeModel.findOne({ name: collegeName })
        if (!college) return res.status(400).send({ status: false, msg: "enter a valid college name" })

        const collegeId = college._id
        if (!collegeId) {
            return res.status(400).send({ status: false, msg: "College Name doesn't exist" })
        }

        const allData = { name, email, mobile, collegeId }

        const newData = await internModel.create(allData)
        let newData1 = { isDeleted: newData.isDeleted, name: newData.name, email: newData.email, mobile: newData.mobile, collegeId }
        return res.status(201).send({ status: true, data: newData1 })


    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}



module.exports = { createIntern }