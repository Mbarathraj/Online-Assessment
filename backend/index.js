const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const cors=require("cors")
const app=express()

mongoose.connect(process.env.DB_URL, console.log("connected"))

const userRouter=require("./routes/user")
const adminRouter=require("./routes/admin")

app.use(cors())
app.use(express.json())
app.use("/user",userRouter)

app.use("/admin",adminRouter)

app.listen(process.env.PORT,(err)=>{
    if(err) throw err
    console.log("Port is running on ",process.env.PORT);
})

process.on("uncaughtException",(err)=>{
    console.log(err.message)
})
