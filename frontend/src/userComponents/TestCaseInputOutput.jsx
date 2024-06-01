import React from "react";

const TestCaseInputOutput = ({ viewInput, viewOutput }) => {
  return (
    <div className="input-output mt-2 m-3">
      <div className="row p-1 ">
        Input:
        <div className="border p-1 bg-dark-subtle ps-2 rounded-2" style={{minHeight:"35px",maxHeight:"300px",overflow:"hidden",overflowY:"auto"}}>
           {viewInput}
        </div>
      </div>
      <div className="row p-1  mt-2">
        Output:
        <div className="border p-1 bg-dark-subtle ps-2 rounded-2" style={{minHeight:"35px",maxHeight:"300px",overflow:"hidden",overflowY:"auto"}}>
         
        </div>
      </div>
      <div className="row p-1  mt-2">
        Expected Output:
        <div className="border p-1 bg-dark-subtle ps-2 rounded-2" style={{minHeight:"35px",maxHeight:"300px",overflow:"hidden",overflowY:"auto"}}>
        {viewOutput}
        </div>
      </div>
    </div>
  );
};

export default TestCaseInputOutput;
