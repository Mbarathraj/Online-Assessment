import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import {
  Button,
  Drawer,
  Space,
  Popconfirm,
  Tooltip,
  message,
  Input,
} from "antd";
import { MdSaveAs } from "react-icons/md";
import axios from "axios";
const UserMenu = ({ setNav, name, setName, id }) => {
  const rad = (angle) => (angle * Math.PI) / 180;
  const sin = (angle) => Math.sin(rad(angle));
  const cos = (angle) => Math.cos(rad(angle));

  //States
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [stuName, SetStuName] = useState();
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  document.querySelectorAll(".menu-item").forEach((item) => {
    const angle = parseFloat(
      getComputedStyle(item).getPropertyValue("--angle")
    );
    item.style.top = `calc(50% - 10px + (${50 * sin(angle)}px))`;
    item.style.left = `calc(50% - 10px + (${50 * cos(angle)}px))`;
  });

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleSave = () => {
    const editedData = {};
    let flag=false
    if (name){ editedData.name = name
      flag=true
      editedData.id = id;
    };
    if (oldPass) {
      if (newPass) {
        if (oldPass === newPass) {
          editedData.oldPass = oldPass;
          editedData.newPass = newPass;
  
        } else {
          message.error("Password Must Be Same");
          flag=false
        }
      } else {
        flag=false
        message.error("New Password Is required");
      }
    }
    if(flag){
      axios.post("http://localhost:8000/user/update",editedData)
      .then(res => {
        if(res.data==="success") message.success("Updated")
      })
     setOpen(false);
     }
  };

  return (
    <div className="menu-icon d-flex align-items-center justify-content-between col-12  p-1 border-bottom">
      <div className="p-1 position-relative d-flex justify-content-center align-items-center menubar ms-3">
        <CiMenuKebab
          className="d-flex justify-content-center align-items-center p-1 btn w-100 h-100 btn-outline-primary rounded-circle border-1"
          style={{ fontSize: "22px" }}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <>
            <div
              className="menu-1 menu border p-1 m-1 rounded-circle d-flex justify-content-center align-items-center btn btn-outline-dark"
              onClick={() => {
                setNav("home");
                setMenuOpen(!menuOpen);
              }}
            >
              <Tooltip title="Home" placement="right">
                <FaHome />
              </Tooltip>
            </div>
            <div
              className="menu-2 menu border p-1 m-1 rounded-circle d-flex justify-content-center align-items-center btn btn-outline-dark"
              onClick={() => {
                setNav("codekata");
                setMenuOpen(!menuOpen);
              }}
            >
              <Tooltip title="CodeKata" placement="right">
                <HiOutlineCode />
              </Tooltip>
            </div>
            <div className="menu-4 menu border p-1 m-1 rounded-circle d-flex justify-content-center align-items-center btn btn-outline-dark">
              <Tooltip title="Logout" placement="bottomRight">
                <Popconfirm
                  title="Logout"
                  description="Are you sure to Logout?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <RiLogoutCircleLine />
                </Popconfirm>
              </Tooltip>
            </div>
            <div
              className="menu-3 menu border p-1  rounded-circle d-flex justify-content-center align-items-center btn btn-outline-dark"
              onClick={() => {
                setNav("quiz");
                setMenuOpen(!menuOpen);
              }}
            >
              <Tooltip title="Quiz" placement="bottomRight">
                <BsFillPatchQuestionFill />
              </Tooltip>
            </div>
          </>
        )}
      </div>
      <div
        className="me-3 d-flex align-items-center border rounded-circle p-1 ps-2 btn btn-outline-primary"
        onClick={showLoading}
      >
        <FaUserEdit style={{ fontSize: "19px" }} />
      </div>
      <Drawer
        closable
        destroyOnClose
        title={"Edit Profile"}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        extra={
          <Space>
            <Button
              type="dashed"
              onClick={() => {
                handleSave();
              }}
            >
              <MdSaveAs />
            </Button>
          </Space>
        }
      >
        <label htmlFor="name">User Name</label>
        <Input
          type="text"
          className="p-1 ps-2 mb-3"
          defaultValue={name}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            borderBottom: "1px solid rgba(0,0,0,0.4)",
          }}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="oldpass">Old Password</label>
        <Input.Password
          type="password"
          className="p-1 ps-2 mb-3"
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            borderBottom: "1px solid rgba(0,0,0,0.4)",
          }}
          id="oldpass"
          onChange={(e) => setOldPass(e.target.value)}
        />
        <label htmlFor="newpass">New Password</label>
        <Input.Password
          type="password"
          className="p-1 ps-2 mb-3"
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            borderBottom: "1px solid rgba(0,0,0,0.4)",
          }}
          id="newpass"
          onChange={(e) => setNewPass(e.target.value)}
        />
      </Drawer>
    </div>
  );
};

export default UserMenu;
