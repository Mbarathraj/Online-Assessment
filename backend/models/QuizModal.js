const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  id: String,
  title:String,
  questions: [
    {
      question: String,
      image:String,
      answer: String,
      options: Array,
    },
    {
      title:String,
    }
  ],
  
});

const QuizModal=mongoose.model("quiz",quizSchema)

module.exports = QuizModal