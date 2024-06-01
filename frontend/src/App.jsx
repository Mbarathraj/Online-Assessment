import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './userComponents/Login'
import UserMain from './userComponents/UserMain'
import CodeKata from './adminComponents/CodeKata'
import QuizComponent from './adminComponents/QuizComponent'
import PostedCoding from './adminComponents/PostedCoding'
import MainContent from './adminComponents/MainContent'

function App() {
  const [count, setCount] = useState(0)
  const [loginDetail,setLoginDetail]=useState()
  return (
   <BrowserRouter>
   <Routes>
      <Route path="/login" element={<Login setLoginDetail={setLoginDetail}/>}/>
      <Route path='/userhome' element={<UserMain loginDetail={loginDetail}/>}/>
   </Routes>
   </BrowserRouter>
  
  )
}

export default App
