import React, { useState, useEffect } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import "animate.css";
import axios from "axios";
const ResetPassword = (props) => {
  const code = props.match.params.code;
  const [status, setStatus] = useState({ val: 0, msg: "", type: "" });
  const Alert = (msg, type) => {
    return (
      <Toast
        className={
          type === "red"
            ? "animate_animated animate_shakeX"
            : "animate_animated animate_fadeInRight animate_slow"
        }
        style={{ position: "fixed", right: "0", zIndex: "9899899" }}
      >
        <Toast.Header
          style={{
            background: status.type,
            color: "white",
            fontWeight: "bold"
          }}
        >
          <strong className="mr-auto">
            {type === "success" || "darkGreen" ? "Success" : "Fail"}
          </strong>
          {/* <small>2 seconds ago</small> */}
        </Toast.Header>
        <Toast.Body>{status.msg}</Toast.Body>
      </Toast>
    );
  };
  const [state, setState] = useState({
    password: "",
    confirmPassword: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      state.password === state.confirmPassword &&
      state.password &&
      state.confirmPassword
    ) {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const formData = {
        code,
        password: state.password
      };
      try {
        const res = await axios.post(
          "/api/reset",
          formData,
          config
        );
        if (res.status == 200) {
          setStatus({
            val: 1,
            msg: "Password Successfully Changed",
            type: "darkGreen"
          });
          let id = setTimeout(() => {
            setStatus({ val: 0, msg: "", type: "" });
            props.history.push("/");
            clearTimeout(id);
          }, 3000);
        }
      } catch (e) {
        setStatus({ val: 1, msg: "Server Error", type: "red" });
        let id = setTimeout(() => {
          setStatus({ val: 0, msg: "", type: "" });
          clearTimeout(id);
        }, 3000);
      }
    } else {
      setStatus({ val: 1, msg: "Fields Should Match", type: "red" });
      let id = setTimeout(() => {
        setStatus({ val: 0, msg: "", type: "" });
        clearTimeout(id);
      }, 3000);
    }
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const get = async () => {
      try {
        let code = props.match.params.code;

        let res = await axios.get(
          "/api/reset?code=" + code,
          code,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        // console.log(res.data);
      } catch (e) {
        console.log(e.response);
        props.history.push("/");
      }
    };
    get();
  }, []);
  return (
    <>
      {status.val ? <Alert type={status.type} /> : ""}
      <h3 style={{ marginTop: "6vh", fontFamily: "Mulish" }}>Reset Password</h3>
      <div className="forget">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{
                fontFamily: "Poppins",
                align: "left",
                fontWeight: "550"
              }}
            >
              Password
            </Form.Label>
            <Form.Control
              type="password"
              value={state.password}
              name="password"
              style={{ width: "20rem" }}
              placeholder="Password"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Password And Confirm Password Should Match.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label
              style={{
                fontFamily: "Poppins",
                align: "left",
                fontWeight: "550"
              }}
            >
              Confirm Password
            </Form.Label>
            <Form.Control
              name="confirmPassword"
              value={state.confirmPassword}
              type="password"
              onChange={handleChange}
              style={{ width: "20rem" }}
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{
              borderRadius: "1vh",
              width: "20rem",
              fontFamily: "Poppins",
              textTransform: "capitalize"
            }}
          >
            Reset Password
          </Button>
        </Form>
      </div>
    </>
  );
};
export default ResetPassword;
