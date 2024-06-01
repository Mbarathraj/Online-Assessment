import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { RiMenuFold2Line } from "react-icons/ri";
import { RiMenuFoldLine } from "react-icons/ri";
import { IoCodeSlashSharp } from "react-icons/io5";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa6";
import { IoCodeWorking } from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";
import { VscRepoForcePush } from "react-icons/vsc";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Button, message, Popconfirm } from "antd";

const Sidebar = ({setContent}) => {
  const [RCodeKata, setRCodeKatta] = useState(false);
  const [sidebarClose, setSidebarClose] = useState(false);
  const [RQuiz, setRQuiz] = useState(false);

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <div className={"sidebar " + (sidebarClose && "close")}>
      <div className={"inner-sidebar p-2 "}>
        <header className="d-flex justify-content-between">
          <div className="logo ">
            {!sidebarClose && <img src={logo} alt="" className="col-6" />}
          </div>
          <div className="me-2">
            {sidebarClose ? (
              <RiMenuFold2Line onClick={(e) => setSidebarClose(false)} />
            ) : (
              <RiMenuFoldLine onClick={(e) => setSidebarClose(true)} />
            )}
          </div>
        </header>
        <div className="side-content h-100 pt-5 ">
          <div className="d-flex align-items-center p-2 gap-2 justify-content-between btn border-0 rounded-3"
          onClick={()=>{
            setContent("quiz")
          }}
          >
            <div
              className="d-flex align-items-center gap-2"
              onClick={() => {
                setRQuiz(false);
              
              }}
            >
              <BiMessageSquareAdd />
              {!sidebarClose && " Post Quiz"}
            </div>
            <FaChevronDown
              style={{ fontSize: "12px" }}
              onClick={() => {
                setRQuiz(!RQuiz);
              }}
            />
          </div>
          {RQuiz && (
            <>
              <div className="d-flex align-items-center p-2 gap-2 ps-4 btn border-0">
                <GrScorecard />
                {!sidebarClose && " Quiz Result"}
              </div>
              {/* <div className="d-flex align-items-center p-2 gap-2 ps-4 btn border-0">
                <VscRepoForcePush />
                {!sidebarClose && "Posted Quiz"}
              </div> */}
            </>
          )}

          <div className="d-flex align-items-center p-2 gap-2 justify-content-between btn border-0 rounded-3"
          onClick={()=>setContent("codekata")}
          >
            <div
              className="d-flex align-items-center gap-2"
              onClick={() => {
                setRCodeKatta(false);
                
              }}
            >
              <IoCodeSlashSharp />
              {!sidebarClose && "  CodeKata"}
            </div>
            <FaChevronDown
              style={{ fontSize: "12px" }}
              onClick={() => {
                setRCodeKatta(!RCodeKata);
              }}
            />
          </div>
          {RCodeKata && (
            <>
              <div className="d-flex align-items-center p-2 gap-2 ps-4 btn border-0">
                <IoCodeWorking />
                {!sidebarClose && "CodeKata Result"}
              </div>
              <div className="d-flex align-items-center p-2 gap-2 ps-4 btn border-0"
              
              onClick={()=>{
                setContent("postedcodekatta")
              }}>
                <VscRepoForcePush />
                {!sidebarClose && "Posted CodeKata"}
              </div>
            </>
          )}

    
            <Popconfirm
              title="Logout"
              description="Are you sure to logout?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <div
                className={
                  "d-flex align-items-center p-2 gap-2  btn border-0 rounded-3 position-absolute bottom-0 mb-2 " +
                  (sidebarClose ? "col-8" : "col-11")
                }
              >
                <RiLogoutCircleLine />

                {!sidebarClose && "Logout"}
              </div>
            </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
