import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { VscRepoPush } from "react-icons/vsc";
import { VscRepoForcePush } from "react-icons/vsc";
import "react-toastify/dist/ReactToastify.css";
import { Avatar, Badge, Card, Steps, message } from "antd";
import axios from "axios";

import Meta from "antd/es/card/Meta";
const CodeKata = () => {
  const [noOfTestCase, setNoOfTestCase] = useState(1);
  const [hiddenTC, setHiddenTC] = useState(false);
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([]);
  const [testcases, setTestcases] = useState();
  const [currentInputIndex, setcurrentInputIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [count, setCount] = useState(0);
  const key = "updatable";
  const openMessage = () => {
    if (input.length == 6 && output.length == 6) {
      const newTestcases = {
        title: title,
        description: description,
        input: input,
        output: output,
      };
      setTestcases(newTestcases);
      loadingMessage();
      setTimeout(() => {
        axios
          .post("http://localhost:8000/admin/postcoding", newTestcases)
          .then((res) => {
            if (res.data === "Added") {
              successMessage("Added Successfully!");
            } else {
              errorMessage("Something Error");
            }
          });
      }, 2000);
    } else {
      warningMessage("All inputs and outputs are required");
    }
  };
  const loadingMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
  };
  const successMessage = (res) => {
    messageApi.open({
      key,
      type: "success",
      content: res,
      duration: 2,
    });
  };
  const errorMessage = (res) => {
    messageApi.open({
      key,
      type: "error",
      content: `${res}`,
      duration: 2,
    });
  };
  const warningMessage = (res) => {
    messageApi.open({
      key,
      type: "error",
      content: `${res}`,
      duration: 2,
    });
  };
  useEffect(() => {
    if (noOfTestCase == 5) setHiddenTC(true);
  }, [noOfTestCase]);

  const handleInputChange = (e, index) => {
    const newValue = [...input];
    newValue[index] = e.target.value;
    setcurrentInputIndex(index);
    setInput(newValue);
  };

  const handleOutputChange = (e, index) => {
    const newValue = [...output];
    setcurrentInputIndex(index);
    newValue[index] = e.target.value;
    setOutput(newValue);
  };

  const handlePush = (index, last) => {
    title && description && input.length == 1 && setCount(count + 1);

    input.length == 4 && title && description && setCount(count + 1);

    input.length == 6 && title && description && setCount(count + 1);
    if (title && description) {
      if (index >= currentInputIndex) {
        if (input[index] && output[index]) {
          setNoOfTestCase(noOfTestCase <= 4 ? noOfTestCase + 1 : noOfTestCase);
          last ? "" : successMessage("Added!");
          console.log(input, output);
        } else {
          warningMessage("All Fields Are Required!");
        }
        if (last) {
          if (input[index] && output[index]) {
            openMessage();
          } else {
            warningMessage("All Fields Are Required!");
          }
        }
      } else {
        warningMessage("You doesn't Change anything!");
      }
    } else {
      warningMessage("Add Title and Description");
    }
  };

  return (
    <div className="d-flex gap-4 col-12 ms-2 mt-5">
      <Card className="d-flex justify-content-center col-9 flex-column ms-3 border p-3 align-content-center mt-4"
      style={{backgroundColor:"#d1d8e0"}}
      >
        <Card
          className="col-10 mt-2"
          title={ <Badge style={{ backgroundColor: 'green', borderRadius: '2px', color: 'white' }}
          count={" Add Title & Description"}
          >
         
        </Badge>}
        >
          <input
            type="text"
            className="w-100"
            placeholder="Title*"
            style={{
              border: "none",
              outline: "none",
              borderBottom: "1px dotted black",
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            className="mt-2 w-100"
            placeholder="Description*"
            rows={5}
            style={{
              resize: "none",
              border: "none",
              outline: "none",
              borderBottom: "1px dotted black",
            }}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </Card>
        <div className="text-cases mt-3 d-flex flex-column align-items-center">
          {Array.from({ length: noOfTestCase < 5 ? noOfTestCase : 4 }).map(
            (_, index) => {
              return (
                <Badge.Ribbon text={"TestCase: "+(index+1)}>
                  <Card
                  className="testcase p-1 mt-3"
                  style={{width:"900px"}}
                  key={index}
                  size="default"
                  actions={[
                    <div
                      className="d-flex align-items-center justify-content-center gap-2"
                      onClick={() => {
                        handlePush(index);
                      }}
                    >
                      <VscRepoPush />
                      Push
                    </div>,
                  ]}
                >
                  <Card.Grid
                    className="d-flex align-items-center gap-3 ms-1 me-1 mt-1 mb-1 mt-3"
                    style={{ width: "100%" }}
                  >
                    <textarea
                      type="text"
                      className="mt-2 w-100 border-bottom"
                      placeholder="Input"
                      rows={5}
                      style={{
                        resize: "none",
                        border: "none",
                        outline: "none",
                      }}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                    ></textarea>
                    <textarea
                      type="text"
                      className="mt-2 w-100 border-bottom"
                      placeholder="Output"
                      rows={5}
                      style={{
                        resize: "none",
                        border: "none",
                        outline: "none",
                      }}
                      onChange={(e) => {
                        handleOutputChange(e, index);
                      }}
                    ></textarea>
                  </Card.Grid>
                </Card>
                </Badge.Ribbon>
              );
            }
          )}

          {hiddenTC && (
            <>
              {Array.from({ length: 2 }).map((_, index) => {
                return (
                  <Card
                    className="testcase col-9 p-2 border mt-3 "
                    key={index + 4}
                    title={"Hidden TestCase: " + (index + 1)}
                    actions={[
                      index == 0 ? (
                        <div className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => {
                          handlePush(index + 4);
                        }}
                        >
                          <VscRepoPush /> Push
                        </div>
                      ) : (
                        <div className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => handlePush(index + 4, "yes")}
                        >
                          <VscRepoForcePush /> Post 
                        </div>
                      ),
                    ]}
                  >
                    <Card.Grid className="d-flex align-items-center gap-3 ms-1 me-1"
                    style={{width:"100%"}}
                    >
                      <textarea
                        type="text"
                        className="mt-2 w-100"
                        placeholder="Input"
                        rows={3}
                        style={{
                          resize: "none",
                          border: "none",
                          outline: "none",
                          borderBottom: "1px dotted black",
                        }}
                        onChange={(e) => {
                          handleInputChange(e, index + 4);
                        }}
                      ></textarea>
                      <textarea
                        type="text"
                        className="mt-2 w-100"
                        placeholder="Output"
                        rows={3}
                        style={{
                          resize: "none",
                          border: "none",
                          outline: "none",
                          borderBottom: "1px dotted black",
                        }}
                        onChange={(e) => {
                          handleOutputChange(e, index + 4);
                        }}
                      ></textarea>
                  
                    </Card.Grid>
                  </Card>
                );
              })}
            </>
          )}
        </div>
        {contextHolder}
      </Card>
      <Steps
        className=" me-3 ps-3 pt-4"
        direction="vertical"
        current={count}
        style={{position:"fixed", right:"0",width:"250px",height:"300px"}}
        items={[
          {
            title: (count === 0 && "In Progress") || (count > 0 && "Finished"),
            description: "Title & Description",
          },
          {
            title:
              (count === 1 && "In Progress") ||
              (count > 1 && "Finished") ||
              (count == 0 && "Waiting"),

            description: "TestCase",
          },
          {
            title:
              (count === 2 && "In Progress") ||
              (count > 2 && "Finished") ||
              (count < 2 && "Waiting"),
            description: "Hidden TestCase",
          },
        ]}
      />
    </div>
  );
};

export default CodeKata;
