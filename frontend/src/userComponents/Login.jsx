import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  InfoOutlined,
  LockOutlined,
  MoonOutlined,
  NumberOutlined,
  SettingOutlined,
  SunOutlined,

} from "@ant-design/icons";
import {
  Button,
  Col,
  FloatButton,
  Form,
  Input,
  message,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserMain from "./UserMain";
const Login = () => {
  

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [regno,setRegno]=useState()
  const[password,setPassword]=useState()
  const navigator=useNavigate()
  const handleLogin =()=>{
    if(regno && password){
      axios.post("http://localhost:8000/user/login",{ regno,password}).then(res => {
        res.data === "not" && message.error("Invalid Credentials")
        console.log(res.data)
       if(res.data.message === "success"){
        message.open({
          type:"loading",
          duration:2,
          content:"loading"
        })
        setTimeout(()=>{
          navigator("/userhome")
          localStorage.setItem("regno",res.data.data._id)
        },2000)
       }

        res.data === "pass" && message.error("Invalid Password")
      })
    }
  }
  return (
    <div
      className="container-fluid border p-1 d-flex gap-1 justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: dark ? "black":"white",width:"100vw" }}
    >
      <Col
        span={7}
        className=" ps-3 pt-4 pb-4 pe-3 rounded-3"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            backgroundColor: dark ? "black":"white", 
            color:dark ? "white":"black", 
        }}
      >
        <h5>Login</h5>
        <Form
          name="normal_login"
          className="login-form d-flex flex-column gap-2"
          initialValues={{
            remember: true,
          }}
        
        >
          <Form.Item
            name="username"
            className="mt-3"
            rules={[
              {
                required: true,
                message: "Enter Register No.!",
              },
            ]}
          >
            <Input
            type="number"
              prefix={<NumberOutlined />}
              placeholder="Register No."
              className="p-2"
              onChange={(e)=> setRegno(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            
            rules={[
              {
                required: true,
                message: "Enter Password!",
              },
            ]}
          >
            <Input.Password
              className="p-2"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e)=> setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button col-12 p-2 d-flex align-items-center justify-content-center"
              onClick={handleLogin}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <FloatButton.Group
        open={open}
        trigger="click"
        style={{
          right: 20,
        }}
        onClick={() => setOpen(!open)}
        icon={<SettingOutlined />}
      >
        <FloatButton icon={<InfoOutlined />} />
        {!dark ?
          <FloatButton icon={<MoonOutlined />}  onClick={() => setDark(true)}/>
        :
        <FloatButton icon={ <SunOutlined  />} onClick={() => setDark(false)}/>
       }
      </FloatButton.Group>
    </div>
    
  );
};

export default Login;
