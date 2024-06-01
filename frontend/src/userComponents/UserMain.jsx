import React, { useEffect } from "react";
import UserMenu from "./UserMenu";
import UserCodeKata from "./UserCodeKata";
import { useState } from "react";
import UserQuiz from "./UserQuiz";
import UserHome from "./UserHome";
import axios from "axios";
const UserMain = () => {
  const [nav, setNav] = useState("home");
  const [name,setName]=useState()
  const [id,setId]=useState()
 useEffect(()=>{
   axios.post("http://localhost:8000/user/fetchstudent",{"regno":localStorage.getItem("regno")}).then(res => {
      setName(res.data.name)
      setId(res.data._id)
   })
 },[])
  return (
    <div className="user-main">
      {<UserMenu setNav={setNav} setName={setName} name={name} id={id}/>}
     { nav ==="home" && <UserHome />}
     {
       nav ==="codekata" && <UserCodeKata/>  
     }
     {
      nav ==="quiz" && <UserQuiz/>
     }
    </div>
  );
};

export default UserMain;
