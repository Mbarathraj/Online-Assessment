const express=require("express")
const router=express.Router()

const {getQuiz}=require("../controllers/quizController")
const {login,fetchStudent,updateStudent} =require("../controllers/loginController")
router.route("/quiz")
    .post(getQuiz)

router.route('/login')
.post(login)

router.route('/fetchstudent')
.post(fetchStudent)

router.route("/update")
.post(updateStudent)
module.exports = router