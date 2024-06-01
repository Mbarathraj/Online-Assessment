const express=require("express")

const Router=express.Router()

const {postQuiz}=require("../controllers/quizController")

const {codingPost,codingGet,updatecoding}=require("../controllers/codingController")
Router.route("/postquiz")
    .post(postQuiz)
Router.route('/postcoding')
    .post(codingPost)

Router.route("/getcoding")
    .get(codingGet)

Router.route('/updatecoding')
    .post(updatecoding)
module.exports=Router