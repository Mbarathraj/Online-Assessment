import React, { useEffect, useState } from "react";
import { MdEditNote } from "react-icons/md";
import axios from "axios";
import { Badge, Button, Card, Carousel, Form, Input, Skeleton, message } from "antd";
import { VscRepoPush } from "react-icons/vsc";
import { Spin } from "antd";
const PostedCoding = () => {
  const [testcases, setTestcases] = useState([]);
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState();
  const [disable, setDisable] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:8000/admin/getcoding").then((res) => {
        if (res.data.length > 0) {
          setId(res.data[res.data.length - 1].id);
          setTitle(res.data[res.data.length - 1].testcase.title);
          setInputs(res.data[res.data.length - 1].testcase.input);
          setOutputs(res.data[res.data.length - 1].testcase.output);
          setDisable(new Array(6).fill(true));
        }
      });
    }, 1000);
  }, []);

  const handleEdit = (index) => {
    let newDisable = [...disable];
    newDisable[index] = false;
    setDisable(newDisable);
  };
  const handleTestcaseChanges = (index) => {
    let newDisable = [...disable];
    newDisable[index] = true;
    setDisable(newDisable);
    axios
      .post("http://localhost:8000/admin/updatecoding", {
        id: id,
        input: inputs,
        output: outputs,
      })
      .then((res) => console.log(res.data));
    message
      .loading({
        content: "loading",
        duration: 1,
      })
      .then(
        setTimeout(() => {
          message.success("Added");
        }, [1100])
      );
  };
  const handleInputChanges = (e, index) => {
    const newValue = [...inputs];
    newValue[index] = e.target.value;
    setInputs(newValue);
    console.log(newValue);
  };
  const handleOutputChanges = (e, index) => {
    const newValue = [...outputs];
    newValue[index] = e.target.value;
    setOutputs(newValue);
    console.log(newValue);
  };
  const contentStyle = {
    background: "#364d79",
  };
  return (
    <div className="container ">
      <div className="mb-5 p-2"></div>
      {inputs.length > 0 ? (
      <Carousel
        className="m-5 mt-5 border"
        arrows
        infinite={true}
        style={{ backgroundColor: "#222f3e", color: "black" }}
      >
        {inputs.map((val, index) => (
          <div
            className="p-1 d-flex flex-column rounded-2 align-items-center gap-2 ps-5 pe-5 pt-5"
            key={index}
          >
            <Card className="d-flex col-12 flex-column">
              <div className="col-12">
                <h6>Testcase {index + 1}</h6>
                <label>
                  <b>Input</b>
                </label>
                <textarea
                  rows={7}
                  disabled={disable[index]}
                  defaultValue={val}
                  className="col-12"
                  style={{
                    resize: 'none',
                    outline: 'none',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '10px 0px 10px 20px',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                  }}
                  onChange={(e) => handleInputChanges(e, index)}
                ></textarea>
              </div>
              <div className="col-12">
                <label>
                  <b>Output</b>
                </label>
                <textarea
                  rows={7}
                  disabled={disable[index]}
                  defaultValue={outputs[index]}
                  className="col-12"
                  style={{
                    resize: 'none',
                    outline: 'none',
                    borderRadius: '15px',
                    padding: '10px 0px 10px 20px',
                    border: 'none',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                  }}
                  onChange={(e) => handleOutputChanges(e, index)}
                ></textarea>
              </div>
            </Card>
            <div className="footer align-self-end me-3 mb-2 mt-1 d-flex justify-content-between gap-2">
              {!disable[index] ? (
                <Button
                  type="text"
                  className="btn d-flex justify-content-center align-items-center"
                  style={{ fontSize: '20px', color: "white" }}
                  onClick={() => handleTestcaseChanges(index)}
                >
                  <VscRepoPush />
                </Button>
              ) : (
                <Button
                  className="btn d-flex justify-content-center align-items-center"
                  type="text"
                  style={{ fontSize: '25px', color: "white" }}
                  onClick={() => handleEdit(index)}
                >
                  <MdEditNote />
                </Button>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    ) : (
      <Skeleton active />
    )
  }
    </div>
  );

};

export default PostedCoding;
