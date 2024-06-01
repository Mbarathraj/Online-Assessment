const codingModal=require("../models/CodnigModal")
const generateUniqueId = require('generate-unique-id');
const codingPost=(req,res)=>{
    try{
        const id1 = generateUniqueId({
            length:6,
            useLetters:true,
            useNumbers:true
        });
        codingModal.create({
            id:id1,
            testcase:req.body})
        res.send("Added")

    }
    catch(err){
        res.status(400).send("error")
    }
}
const codingGet = (req,res)=>{
   try{
    codingModal.find({}).then(data => res.send(data))
   }
   catch(err){

   }
    
}
const updatecoding=(req,res)=>{

 try{
    const updatedData= codingModal.findOneAndUpdate({"id":req.body.id},
        {$set:{ "testcase.input": req.body.input, "testcase.output": req.body.output }},
         {new: true}
     ).exec();
    res.send("added")
 }
 catch(err){
    res.status(404).send("error")
 }
}
module.exports ={codingPost,codingGet,updatecoding}