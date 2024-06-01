const mongoose=require("mongoose")

const codingSchema=mongoose.Schema({
    id:String,
    testcase:{
    title:String,
    description:String,
    input:[String],
    output:[String]
}
})

const codingModal=mongoose.model("coding",codingSchema)

module.exports = codingModal