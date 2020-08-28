import React, { useState } from "react";
import { Form, Toast, Text, Control, Label, Button } from "react-bootstrap";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import "../styles.css";
import "animate.css";

const Forget = (props) => {
  const [mail, setMail] = useState("");
  const [status, setStatus] = useState({ val: 0, msg: "", type: "" });
  const Alert = (msg, type) => {
    return (
      <Toast style={{ position: "fixed", right: "0", zIndex: "9899899" }}>
        <Toast.Header
          style={{
            background: status.type,
            color: "white",
            fontWeight: "bold"
          }}
        >
          <strong className="mr-auto">
            {status.type === "darkGreen" ? "Success" : "Fail"}
          </strong>
          {/* <small>2 seconds ago</small> */}
        </Toast.Header>
        <Toast.Body>{status.msg}</Toast.Body>
      </Toast>
    );
  };
  const handleChange = (e) => {
    setMail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const formData = {
      email: mail
    };
    try {
      const res = await axios.post(
        "/api/forget",
        formData,
        config
      );
      setStatus({ val: 1, msg: res.data, type: "darkGreen" });
      let id = setTimeout(() => {
        setStatus({ val: 0, msg: "", type: "" });
        clearTimeout(id);
      }, 3000);
    } catch (e) {
      setStatus({ val: 1, msg: e.response.data, type: "red" });
      let id = setTimeout(() => {
        setStatus({ val: 0, msg: "", type: "" });
        clearTimeout(id);
      }, 3000);
    }
  };

  return (
    <>
      {status.val ? <Alert type={status.type} /> : ""}
      <h4 style={{ marginTop: "6vh", fontFamily: "Mulish" }}>
        Forgot your Password? <img src='https://image.flaticon.com/icons/svg/1000/1000999.svg' alt='forgot' style={{height:'2.5rem'}} />
      </h4>
      <div className="forget">
        <p>
          <LockIcon style={{ fontSize: "1.2rem", color: "grey" }} />
          <span style={{ fontFamily: "Poppins", fontSize: "0.95rem" }}>
            {" "}
            Enter your email address and we'll send you a link to reset your
            password.
          </span>
        </p>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{
                fontFamily: "Poppins",
                align: "left",
                fontWeight: "550"
              }}
            >
              Email Address <MailOutlineIcon />
            </Form.Label>
            <Form.Control
              type="email"
              style={{ width: "17rem", align:'center', padding: '0' }}
              placeholder="e.g. email@domain.com"
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            className="btn btn-primary"
            variant="primary"
            type="submit"
            style={{
              borderRadius: "1vh",
              textTransform: "capitalize",
              fontFamily:'Mulish',
              align:'center'
            }}
          >
            Reset Password
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Forget;
