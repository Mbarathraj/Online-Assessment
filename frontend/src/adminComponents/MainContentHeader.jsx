import React from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { BiSolidEdit } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import { IoSave } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { Drawer, Space } from "antd";
const MainContentHeader = ({ setShowProfile, showProfile }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const timerRef = React.useRef();
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  const showDrawer = () => {
    setOpen(true);
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onClose = () => {
    setOpen(false);
  };
  React.useEffect(() => clearTimer, []);

  return (
    <div
      className="main-header m-1 align-self-end
     d-flex justify-content-between align-items-center"
    >
      <div></div>
      <div
        className="d-flex justify-content-center flex-column align-items-center btn border-0"
        onClick={showDrawer}
      >
        <LiaUserEditSolid style={{ fontSize: "25px" }} />
        <div style={{ fontSize: "13px" }}>Profile</div>
      </div>
      <Drawer
        destroyOnClose
        title={
          <>
            <BiSolidEdit /> Edit Details
          </>
        }
        placement="right"
        closable={false}
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        extra={
          <Space>
            <Button
              className="btn btn-success"
              style={{ fontSize: "12px" }}
              onClick={onClose}
            >
              OK
            </Button>
          </Space>
        }
      >
        Name
        <input
          type="text"
          className="mb-3 mt-1"
          style={{
            border: "0",
            borderBottom: "1px solid rgba(0,0,0,0.5)",
            width: "100%",
            outline: "none",
          }}
        />
        Designation
        <input
          type="text"
          className="mt-1 mb-3"
          style={{
            border: "0",
            borderBottom: "1px solid rgba(0,0,0,0.5)",
            width: "100%",
            outline: "none",
          }}
        />
        Old Password
        <input
          type="text"
          className="mt-1 mb-3"
          style={{
            border: "0",
            borderBottom: "1px solid rgba(0,0,0,0.5)",
            width: "100%",
            outline: "none",
          }}
        />
        New Password
        <input
          type="text"
          className="mt-1 mb-3"
          style={{
            border: "0",
            borderBottom: "1px solid rgba(0,0,0,0.5)",
            width: "100%",
            outline: "none",
          }}
        />
      </Drawer>
    </div>
  );
};

export default MainContentHeader;
