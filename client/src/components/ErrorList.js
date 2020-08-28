import React, { useState } from "react";
import { Toast, Header, Body, Row, Col, Button } from "react-bootstrap";
import "animate.css";

const ErrorList = ({ err }) => {
  // const [show, setShow] = useState(true);
  return (
    <div style={{ position: "fixed", right: "0", zIndex: "20180210" }}>
      {err.map((item, idx) => (
        <Toast className="animate__animated animate__shakeX">
          <Toast.Header
            style={{ background: "red", color: "white", fontWeight: "bold" }}
          >
            <strong className="mr-auto">Auth Error</strong>
            {/* <small>2 seconds ago</small> */}
          </Toast.Header>
          <Toast.Body>{item}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
};

export default ErrorList;
// {
//   /* <>
// <Alert variant={"danger"}>
//   <i className="fa fa-exclamation-circle" aria-hidden="true" /> {err}
// </Alert>
// </> */
// }
