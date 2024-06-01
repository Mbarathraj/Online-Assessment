const mongoose=require("mongoose")

const loginSechma=mongoose.Schema({
    regno:Number,
    password:String,
    name:String,
})

const LoginModal=mongoose.model('studentLogin',loginSechma)

module.exports=LoginModal