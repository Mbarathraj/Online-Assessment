import React, { useState } from "react";
import MainContentHeader from "./MainContentHeader";
import QuizComponent from "./QuizComponent";
import CodeKata from "./CodeKata";
import PostedCoding from "./PostedCoding";

const MainContent = ({content}) => {
    const [showProfile,setShowProfile]=useState(false)
  return <div className="main-content d-flex flex-column align-items-center">
    <MainContentHeader setShowProfile={setShowProfile} showProfile={showProfile}/>
   {
    content==="quiz" && <QuizComponent/>
   }
   {
    content==="codekata" && <CodeKata/>
   }
   {
    content==="postedcodekatta" && <PostedCoding/>
   }
</div>;
};

export default MainContent;
