import React, { useEffect } from "react";
import { Pagination, message } from "antd";
import { useState } from "react";
import { Col, Row, Button, Badge, Result } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoSave } from "react-icons/io5";
import axios from "axios";
const UserQuiz = () => {
  const [current, setCurrent] = useState(1);
  const [anwers, setAnswers] = useState([]);
  const [ans, setAns] = useState();
  const [savedIndex, setSavedIndex] = useState([]);
  const [marked, setMarked] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [resultShow, setResultShow] = useState(false);

  const onChange = (page) => {
    setCurrent(page);
  };
  const prevHandler = () => {
    if (current >= 2) {
      setCurrent(current - 1);
      setAns();
    }
  };
  const nextHandler = () => {
    if (current < 20) {
      setAns();
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/user/quiz", { id: "lzruk7" })
      .then((res) => {
        const data = res.data[0];
        if (res.data && res.data.length > 0) {
          if (data.questions) {
            const questionsArray = data.questions.map((q) => q.question);
            const optionsArray = data.questions.map((q) => q.options);
            const answerArray = data.questions.map((q) => q.answer);
            setQuestions(questionsArray);
            setOptions(optionsArray);
          } else {
            console.error("Questions data is missing.");
          }
        } else {
          console.error("Response data is missing or empty.");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  const total = questions.length;
  // window.addEventListener("click",()=>{
  //   const element = document.documentElement;

  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //     } else if (element.mozRequestFullScreen) { // Firefox
  //       element.mozRequestFullScreen();
  //     } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
  //       element.webkitRequestFullscreen();
  //     } else if (element.msRequestFullscreen) { // IE/Edge
  //       element.msRequestFullscreen();
  //     }

  //  })

  const handleSave = (index) => {
    const newSavedIndex = [...savedIndex];
    if (newSavedIndex[index - 1] >= 0 && !ans) {
      current < questions.length && setCurrent(current + 1);
    } 
    else if (ans >= 0) {
      newSavedIndex[current - 1] = current - 1;
      setSavedIndex(newSavedIndex);
      const preAnwers = [...anwers];
      preAnwers[index] = ans;
      const newMark = [...marked];
      newMark[current - 1] = "";
      setMarked(newMark);
      setAnswers(preAnwers);
      setAns();

      if (newSavedIndex.filter((val) => val >= 0).length == questions.length) {
        message.success("All questions are saved");
      }

      if (current < questions.length) {
        const newMark = [...marked];
        newMark[current - 1] = "";
        setMarked(newMark);
        setCurrent(current + 1);
      }
    } else if (
      savedIndex.filter((val) => val >= 0).length == questions.length
    ) {
      message.success("All questions are saved");
    } else {
      message.warning("Select Any Option");
    }
  };
  const handleMark = () => {
    const newMark = [...marked];
    newMark[current - 1] = current - 1;
    setMarked(newMark);
  };
  return (
    <div className="content">
      <div className="col-12 d-flex justify-content-around mt-1 border-bottom align-items-center">
        <Pagination
          current={current}
          total={questions.length * 10}
          pageSize={10}
          showQuickJumper={true}
          showSizeChanger={false}
          className="mt-1 mb-1  p-1"
          onChange={onChange}
        />
        <div
          className="ms-5 d-flex align-items-center gap-4"
          style={{ justifyItems: "end" }}
        >
          <div className="time btn border">01:35</div>

          <Button
            className="col-6  rounded-pill d-flex align-items-center gap-1 justify-content-center"
            type="dashed"
            style={{ color: "white", backgroundColor: "#52c41a" }}
            onClick={() => {
              message.open({
                type: "loading",
                duration: 2,
                content: "loading",
              });
              setTimeout(() => {
                console.log(anwers)
                setResultShow(true);
              }, 2000);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
      <Row className="mt-2 ">
        <Col
          span={18}
          className="left-side d-flex flex-column justify-content-between border-end"
        >
          <div className="question m-2 ms-4">
            {current}. {questions[current - 1]}
          </div>
          <div className="prev-next align-self-end mb-2 me-2 d-flex gap-2">
            <Button
              type="dashed"
              disabled={current == 1}
              onClick={() => prevHandler()}
            >
              <MdOutlineKeyboardArrowLeft />
            </Button>
            <Button
              type="dashed"
              disabled={current == questions.length}
              onClick={() => nextHandler()}
            >
              <MdKeyboardArrowRight />
            </Button>
          </div>
        </Col>
        <Col span={6} className=" right-side  d-flex flex-column">
          <div className="options mt-3">
            {options.map((val, index) => {
              if (current - 1 < questions.length && index === current - 1) {
                return val.map((val, index) => {
                  return (
                    <div
                      className={
                        (ans === index && " bg-info") +
                        " m-1 border p-2 mb-3 rounded-2 ps-3 option"
                      }
                      key={index}
                      style={{
                        backgroundColor: anwers[current] === index && "#52c41a",
                        color: anwers[current] === index && "white",
                      }}
                      onClick={(e) => {
                        setAns(index);
                      }}
                    >
                      {index + 1} {val}
                    </div>
                  );
                });
              }
            })}
          </div>
          <div className="d-flex gap-2 ms-2 me-2 justify-content-between">
            <Button
              className="col-3 me-2 rounded-pill bg-info d-flex align-items-center gap-1 justify-content-center"
              type="dashed"
              style={{ color: "white" }}
              onClick={() => handleMark(current)}
            >
              <IoCheckmarkSharp /> Mark
            </Button>

            <Button
              className="col-3  rounded-pill  d-flex align-items-center gap-1 justify-content-center"
              type="dashed"
              style={{ color: "white", backgroundColor: "#52c41a" }}
              onClick={() => handleSave(current)}
            >
              <IoSave />
              Save
            </Button>
          </div>
          <div className="mt-3 ms-2 d-flex justify-content-between me-2">
            <Badge
              className="site-badge-count-109"
              count={
                1
                  ? `Unanswered: ${
                      total - savedIndex.filter((val) => val >= 0).length
                    }`
                  : "0"
              }
              style={{
                backgroundColor: "#faad14",
                height: "30px",
                display: "flex",
                alignItems: "center",
              }}
            />

            <Badge
              className="site-badge-count-109"
              count={
                1
                  ? `Answered: ${savedIndex.filter((val) => val >= 0).length}`
                  : "0"
              }
              style={{
                backgroundColor: "#52c41a",
                height: "30px",
                display: "flex",
                alignItems: "center",
              }}
            />
          </div>
          <Row
            className="list-of-questions d-flex flex-wrap gap-3 p-1 mt-2 justify-content-center ms-2 me-2"
            style={{ maxHeight: "31vh", overflow: "auto" }}
          >
            {Array.from({ length: questions.length }).map((_, index) => {
              return (
                <Col
                  className={
                    (marked[index] === index && " bg-info text-white ") +
                    (current === index + 1 && " bg-secondary text-white ") +
                    " border p-1  d-flex justify-content-center align-items-center rounded-circle btn "
                  }
                  key={index}
                  style={{
                    height: "40px",
                    width: "40px",
                    backgroundColor:
                      savedIndex[index] === index ? "#52c41a" : undefined,
                    color: savedIndex[index] === index ? "white" : undefined,
                  }}
                  onClick={() => {
                    setCurrent(index + 1);
                    setAns();
                  }}
                >
                  {index + 1}
                </Col>
              );
            })}
          </Row>
          <Row className="d-flex align-items-center gap-2 flex-wrap justify-content-center mt-3 mb-2">
            <div
              className="circle p-2 border rounded-circle bg-info"
              style={{ width: "30px", height: "30px" }}
            ></div>
            Mark
            <div
              className="circle p-2 border rounded-circle"
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#52c41a",
              }}
            ></div>
            Submitted
          </Row>
        </Col>
      </Row>
      {resultShow && (
        <Result
          status="success"
          className="rounded-2"
          style={{
            position: "absolute",
            top: "8%",
            zIndex: "100",
            left: "67%",
            backgroundColor: "white",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
          title="Test Has Been Submitted Successfully"
          subTitle="
        The Result has been send to your Admin.
        You can go to your home page"
          extra={[
            <Button type="primary" key="console">
              Go Home
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default UserQuiz;
