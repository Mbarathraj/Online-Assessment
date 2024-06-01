import React, { useState } from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import './admin.css'
const Main = () => {
  const [content,setContent]=useState("quiz")
  return (
    <div className='main'>
        <Sidebar setContent={setContent}/>
        <MainContent content={content}/>
    </div>
  )
}

export default Main