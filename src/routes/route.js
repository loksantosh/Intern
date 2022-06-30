const express = require("express")
const router = express.Router()

const internController = require("../controllers/internController")
const collegeController = require("../controllers/collegeController")

// >>>>>>>>>>>>>>>>>>>>>>>>>>routes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.post('/functionup/colleges', collegeController.createCollege);
router.post('/functionup/interns', internController.createIntern);
router.get('/functionup/collegeDetails', collegeController.collegeDetails);


// global route>>>>>>>>>>
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})

module.exports = router
