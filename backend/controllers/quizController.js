const QuizModal=require("../models/QuizModal")
const generateUniqueId = require('generate-unique-id');
const getQuiz =(req,res)=>{
    const id=req.body.id
    console.log(req.body)
    QuizModal.find({"id":id}).then(data => res.send(data))
}

const postQuiz=(req,res)=>{
    const id1 = generateUniqueId({
        length:6,
        useLetters:true,
        useNumbers:true
    });
  QuizModal.create({
    id:id1,
    title:req.body[0].title,
    questions:req.body[0].questions
}).then(res => console.log(res)).then(res.send("success"))
    
}

module.exports= {getQuiz,postQuiz}
