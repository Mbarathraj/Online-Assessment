import React, { useEffect, useState } from "react";
import Menu from "./UserMenu";
import "./user.css";
import { Skeleton } from "antd";
import { CodeiumEditor, Language } from "@codeium/react-code-editor";
import { Tabs, Button, ConfigProvider } from 'antd';
import TestCaseInputOutput from "./TestCaseInputOutput";
import { TinyColor } from '@ctrl/tinycolor';

const UserCodeKata = () => {
  const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
 
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  const data=[
    {
      "testcase": {
        "title": "a",
        "description": "b",
        "input": [
          "a",
          "a",
          "a",
          "a",
          "a",
          "b"
        ],
        "output": [
          "a",
          "a",
          "a",
          "a",
          "a",
          "b"
        ]
      },
      "_id": "664b27a6d4bb74d3749d5ee6",
      "id": "4zl589",
      "__v": 0
    },
    {
      "testcase": {
        "title": "df",
        "description": "df",
        "input": [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f"
        ],
        "output": [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f"
        ]
      },
      "_id": "664b287fd4bb74d3749d5ee9",
      "id": "g76wox",
      "__v": 0
    },
    {
      "testcase": {
        "title": "Sum of two number",
        "description": "1+1 =2",
        "input": [
          "1 6",
          "1 3",
          "1 4",
          "2 3",
          "3 4",
          "4 4"
        ],
        "output": [
          "7",
          "4",
          "5",
          "5",
          "7",
          "8"
        ]
      },
      "_id": "664b6820d4bb74d3749d7646",
      "id": "kq7yfn",
      "__v": 0
    }
  ]
  let  inputs=data[1].testcase.input
  let ouputs=data[1].testcase.output
  const [viewInput,setViewInput]=useState(inputs[0])
  const [viewOutput,setViewOutput]=useState(ouputs[0])
  console.log(viewInput)
  const onChange = (key) => {
     setViewInput(inputs[key])
     setViewOutput(ouputs[key])
  };
 
  
  const items = [
    {
      key: '0',
      label: 'Testcase 1',
      children:<TestCaseInputOutput viewInput={viewInput} viewOutput={viewOutput}/>,
    },
    {
      key: '1',
      label: 'Testcase 2',
      children: <TestCaseInputOutput viewInput={viewInput} viewOutput={viewOutput}/>,
    },
    {
      key: '2',
      label: 'Testcase 3',
      children: <TestCaseInputOutput viewInput={viewInput} viewOutput={viewOutput}/>,
    },{
      key: '3',
      label: 'Testcase 4',
      children: <TestCaseInputOutput viewInput={viewInput} viewOutput={viewOutput}/>,
    }
  ];
  return (
    <>
      <div className="content codekata d-flex row ">
        <div className="col-9">
          <CodeiumEditor
            language="java"
            theme="vs-dark"
            height={"75vh"}
            containerClassName="Main.java"
            className="ms-1"
            containerStyle={{ zIndex: 0}}
          />
        </div>
        <div className="question-des col-3">
          <Skeleton active className="mt-2" loading={true} round={true} />
          <div className="title w-100">Addition of Two Numbers</div>
          Description:
          <div className="box border">
            <p className="p-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p>
          </div>
        </div>
      </div>
      <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="ms-2 col-9 mt-2"
      tabBarExtraContent={    <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
              colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
              colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Button type="primary" size="middle"
        className="me-5">
          Compile
        </Button>
      </ConfigProvider>}
      />;
      </div>
    </>
  );
};

export default UserCodeKata;
