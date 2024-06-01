const LoginModal=require("../models/LoginModal")
const login=(req,res)=>{
 try{
    LoginModal.findOne({"regno":parseInt(req.body.regno)}).then(result=>{
        if(result){
          if(result.password === req.body.password){
            res.send({
              data:result,
              message:"success"
            })
          }
          else{
            res.send("pass")
          }
            
        }
        else{
            res.send("not")
        }
    })
 } 
 catch(err){
    console.log(err)
    res.send("not found")
 }
}
const fetchStudent=(req,res)=>{
   LoginModal.findOne({"_id":req.body.regno})
    .then(result => res.send(result))
}

const updateStudent=(req,res)=>{
  let updatedData={}
  if(req.body.newPass.length>0){
     updatedData.name=req.body.name
     updatedData.password=req.body.newPass
  }
  else{
    updatedData.name=req.body.name
  }
    LoginModal.findOneAndUpdate({"_id":req.body.id},
    {
      $set: updatedData
    }
   ).exec()
   res.send("success")
}
module.exports={login,fetchStudent,updateStudent}