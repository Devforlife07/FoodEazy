import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth/authContext";
import { Link, Redirect } from "react-router-dom";
import "animate.css";
const Sidebar = (props) => {
  const { logout, isAuthenticated, user, verified } = useContext(AuthContext);
  const [display,setDisplay]= useState(1);
 
  useEffect(()=>{
    function noScroll() {
      window.scrollTo(0, 0);
    }
    
    // add listener to disable scroll
    if(display==1){
      console.log("yes")
      
    window.addEventListener('scroll', noScroll);}
    
    // Remove listener to re-enable scroll
  return  window.removeEventListener('scroll', noScroll);
  },[display])


  const handleLogout = (e) => {
    logout();
    props.changeDisplay();
  };
  return (
    <div
      className={
        props.display === 0
          ? "mainSide"
          : "mainSide minus animate__animated animate__fadeInRight"
      }
    >
      <div className="left">
        {isAuthenticated ? (
          <div className="name" style={{ fontFamily: "Mulish" }}>
            Hey, {user.name}
            <br />
          </div>
        ) : (
          ""
        )}
        <ul style={{ fontFamily: "Mulish" }}>
          <li onClick={props.changeDisplay}>
            {" "}
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Home
            </Link>
          </li>
          {!isAuthenticated ? (
            <li
              onClick={(e) => {
                setDisplay(0)
                props.changeDisplay();
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/auth"
              >
                SignUp/Login
              </Link>
            </li>
          ) : (
            <li style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </li>
          )}
          {/* {!isAuthenticated ? <li>SignUp</li> : ""} */}

          {isAuthenticated && verified && (
            <li onClick={props.changeDisplay}>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/addProduct"
              >
                Add Items
              </Link>
            </li>
          )}
          {isAuthenticated && verified ? (
            <li onClick={props.changeDisplay}>
              {" "}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/deleteitems"
              >
                Delete Items
              </Link>
            </li>
          ) : (
            ""
          )}
          {isAuthenticated && verified && (
            <li onClick={props.changeDisplay}>
              {" "}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/order"
              >
                Orders
              </Link>
            </li>
          )}
          <li onClick={props.changeDisplay}>
            {" "}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/contact"
            >
              Contact Us
            </Link>
          </li>
          {isAuthenticated && verified && (
            <li onClick={props.changeDisplay}>
              {" "}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/cart"
              >
                Cart
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="right" onClick={props.changeDisplay}>
        <i
          class="fa fa-times"
          aria-hidden="true"
          style={{ fontSize: "1.5rem" }}
        />
      </div>
    </div>
  );
};
export default Sidebar;
