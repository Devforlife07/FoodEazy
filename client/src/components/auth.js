import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import CartContext from "../context/cart/cartContext";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Alert from "./Alert";
import removeAuthToken from "../context/auth/removeAuthToken"
import LoadingContext from "../context/loading/loadingContext";
import "../auth.css";
// import { USER_LOADED } from "../context/types";
// import productContext from "../context/products/productsContext";
const Auth = (props) => {
  const { register, login, userLoaded, isAuthenticated } = useContext(
    AuthContext
  );
  const loadingContext = useContext(AuthContext).loading;
  useEffect(() => {
    console.log(loadingContext);
    if (loadingContext) {
      return setLoading(1);
    }
    else{
       removeAuthToken();
      //  localStorage.removeItem("token");
    return setLoading(0);}
  }, [loadingContext]);
  useEffect(() => {
    console.log(loadingContext);
  }, [loadingContext]);
  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem("token")) {
      setLoading(userLoaded());
      setLoading(0);
    }
   
    if (!isAuthenticated) return setLoading(0);

    if (isAuthenticated === true) {
      setLoading(1);
      console.log(props);
      props.history.push("/");
      // loadItems();
      loadCart();
      setLoading(0);
      return setLoading(0);
    }
  }, [isAuthenticated, props.history]);
  const [loading, setLoading] = useState(1);
  const { Loader } = useContext(LoadingContext);
  const [flag, setFlag] = useState(0);
  const [data, setData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    number: null,
  });
  const [data1, setData1] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    setLoading(1);
    document.addEventListener("load", () => {
      setLoading(0);
    });
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(1);
    setLoading(login(data1));
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) return setLoading(0);
  });

  const { loadCart } = useContext(CartContext);
  const handleSignUpData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSignInData = (e) => {
    setData1({ ...data1, [e.target.name]: e.target.value });
  };
  const [inputType, setInputType] = useState("password");
  const clickHandle = (e) => {
    setFlag((prev) => prev ^ 1);
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (
      !data.name ||
      !data.password ||
      !data.confirmPassword ||
      !data.email ||
      !data.number
    ) {
    }
    // console.log(data);
    register(data);
  };

  const eyeClick = (e) => {
    if (inputType === "password") setInputType("text");
    else setInputType("password");
  };

  return (
    <>
      <Alert />
      {loading === 1 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "23444898429",
          }}
        >
          <img src={require("../images/Spinner.gif")} alt="loader" />
        </div>
      ) : (
        <div className={flag === 0 ? "container1" : "container1 sign-up-mode"}>
          <div className="forms-container" style={{ width: "100%" }}>
            <div className="signin-signup">
              <form className="sign-in-form" onSubmit={handleSignIn}>
                <h2 className="title" style={{ fontFamily: "poppins" }}>
                  Sign in
                </h2>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleSignInData}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  {/* <div
                  style={{
                    border: "0 solid #FFF",
                    borderLeftColor: "#acacac"
                  }}
                > */}
                  <input
                    name="password"
                    type={inputType}
                    placeholder="Password"
                    onChange={handleSignInData}
                  />

                  {/* </div> */}
                </div>
                <input type="submit" value="Login" className="btn solid" />
                <Link to="/forget" style={{ fontFamily: "Poppins" }}>
                  Forgot Password?
                </Link>
              </form>
              <form onSubmit={handleSignUpSubmit} class="sign-up-form">
                <h2 className="title" style={{ fontFamily: "poppins" }}>
                  Sign up
                </h2>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input
                    onChange={handleSignUpData}
                    value={data.name}
                    name="name"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-envelope" />
                  <input
                    onChange={handleSignUpData}
                    value={data.email}
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-phone" />
                  <input
                    onChange={handleSignUpData}
                    value={data.number}
                    type="text"
                    name="number"
                    placeholder="Contact Number"
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  <input
                    onChange={handleSignUpData}
                    value={data.password}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  <input
                    onChange={handleSignUpData}
                    value={data.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
                <input type="submit" class="btn" value="Sign up" />
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3 style={{ fontFamily: "poppins" }}>New here ?</h3>
                <p style={{ fontFamily: "poppins" }}>
                  Then Sign Up and Start Ordering!
                </p>
                <button
                  className="btn transparent"
                  id="sign-up-btn"
                  onClick={clickHandle}
                  style={{ fontFamily: "poppins" }}
                >
                  Sign up
                </button>
              </div>
              <img
                src={require("../images/log.svg")}
                className="image"
                alt=""
              />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3 style={{ "font-family": "poppins" }}>One of us ?</h3>
                <p style={{ "font-family": "poppins" }}>
                  Then Sign In and get Started!
                </p>
                <button
                  className="btn transparent"
                  onClick={clickHandle}
                  id="sign-in-btn"
                  style={{ "font-family": "poppins" }}
                >
                  Sign in
                </button>
              </div>
              <img
                src={require("../images/register.svg")}
                className="image"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
