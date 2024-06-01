import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { IoIosRadioButtonOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { VscRepoForcePush } from "react-icons/vsc";
import { VscRepoPush } from "react-icons/vsc";
import { IoImageSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { Card, Steps } from "antd";


const QuizComponent = () => {
  //UseStates
  const [title, setTitle] = useState("");
  const[description,setDescription]=useState()
  const [noOfQuiz, setNoOfQuiz] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState();
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState();
  const [image, setImage] = useState();

  //Functions

  const handleInputChanges = (index, e) => {
    const newValue = [...options];
    newValue[index] = e.target.value;
    setOptions(newValue);

  };

  const handleImage = (e) => {
    setImage(e.target.files[0].name);
  };

  const handlePush = (index,str) => {
    if (ques && options[0] && options[1] && options[2] && options[3] && answer) {
      const newValue = [...questions];
      newValue[index] = {
        question: ques,
        image: image,
        answer: answer,
        options: options,
        
      };
      setQuestions(newValue);
      if(str!="no"){
        setNoOfQuiz(noOfQuiz + 1);
      } 
      else{
        const final=[{
          title:title,
          questions:newValue
        }]

        axios.post("http://localhost:8000/admin/postquiz",final)
        .then(res => {
            if(res.data === "success"){
                toast.success("added successfully")
            }
        })
      }
      setImage();
      setQues();
      setOptions([]);
      setAnswer();
    } else {
      toast.error("All Fields are required!");
    }
  };


  const handlePost = (index) => {
    if(title){
        handlePush(index,"no")
     
         
    }
    else{
        toast.error("Title is required")
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <Card
        className="col-8 mt-4 rounded-3"
        style={{
          borderTop: "5px solid orange",
          borderLeft: "5px solid lightblue",
          boxShadow:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
        }}
      >
        <div className="row m-1 d-flex flex-column mb-3">
          <input
            type="text"
            placeholder="Untitled Question *"
            style={{
              outline: "none",
              border: "none",
              borderBottom: "1px dotted black",
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="mt-2"
          />
          {title && (
            <div className="d-flex gap-2 mt-1">
              <FaBold className="border p-1" style={{ fontSize: "21px" }} />
              <FaItalic className="border p-1" style={{ fontSize: "21px" }} />
            </div>
          )}
          <input
            type="text"
            placeholder="Quiz Description"
            style={{
              outline: "none",
              border: "none",
              borderBottom: "1px dotted black",
            }}
            className="mt-2"
            onChange={(e)=>{
                setDescription(e.target.value)
            }}
          />
        </div>
      </Card>
      {Array.from({ length: noOfQuiz }).map((_, index) => {
        return (
          <Card
            className="col-8 p-2 rounded-3 questions mb-1 mt-3"
            key={index}
            style={{
              borderTop: "5px solid lightblue",
              borderLeft: "5px solid orange",
              boxShadow:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
            }}
            actions={[
             
              index == noOfQuiz - 1 && 
              
                  <div  className="d-flex justify-content-center align-items-center gap-2"
                    style={{ fontSize: "13px", fontWeight: "600" }}
                    onClick={()=>handlePost(index)}
                  >
                    <VscRepoForcePush style={{ cursor: "poiner" }} /> Post &
                    Push
                  </div>
                ,
             index === noOfQuiz-1 && <div className="d-flex justify-content-center align-items-center gap-2"
              onClick={() => handlePush(index)}
              style={{ fontSize: "13px", fontWeight: "600" }}
            >
              <VscRepoPush />
              Push
            </div>
            ,
            <MdDelete
            style={{ width: "20px", height: "20px" }}
            onClick={() =>
              setNoOfQuiz(noOfQuiz > 1 ? noOfQuiz - 1 : noOfQuiz)
            }
          />
          ]}
          >
            <div className="col-12 d-flex m-1 align-items-center">
              <div className="col-11">
                <input
                  type="text"
                  placeholder="Question"
                  className="col-11"
                  onChange={(e) => {
                    setQues(e.target.value);
                  }}
                  style={{
                    border: "none",
                    outline: "none",
                    borderBottom: "1px solid rgba(0,0,0,0.4)",
                  }}
                />
              </div>
              <div className="d-flex align-items-center gap-1">
                <label
                  htmlFor="qImage"
                  className="border p-1 rounded-circle btn btn-outline-success"
                >
                  <IoImageSharp style={{ fontSize: "23px" }} />
                </label>
                <input
                  type="file"
                  name=""
                  id="qImage"
                  className="d-none"
                  onChange={(e) => handleImage(e)}
                />
              </div>
            </div>
            <div className="options mt-2">
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <div
                    className="d-flex gap-2 align-items-center mb-2"
                    key={index}
                  >
                    <IoIosRadioButtonOff />
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      className="col-8"
                      style={{
                        border: "none",
                        outline: "none",
                        borderBottom: "1px solid rgba(0,0,0,0.4)",
                      }}
                      onChange={(e) => {
                        handleInputChanges(index, e);
                      }}
                    />
                  </div>
                );
              })}
              <input
                type="text"
                placeholder="Answer Ex: 1"
                style={{
                  border: "none",
                  borderBottom: "1px solid blue",
                  outline: "none",
                }}
                className="ms-4 mt-2"
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </Card>
        );
      })}
   
    
      <ToastContainer />
    </div>
  );
};

export default QuizComponent;
