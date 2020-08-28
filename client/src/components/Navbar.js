import React, { useEffect, useContext } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "../styles.css";
import {
  NavLink,
  BrowserRouter as Router,
  useHistory,
  Link
} from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import AuthContext from "../context/auth/authContext";

export default function Navbar1(props) {
  const { logout, isAuthenticated, userLoaded, verified } = useContext(AuthContext);
  useEffect(() => {
    // userLoaded();
    // eslint-disable-next-line
  }, []);
  // console.log(isAuthenticated);

  const handleLogout = (e) => {
    logout();
  };
  return (
    <Navbar
      style={{
        position: "sticky",
        top: "0",
        zIndex: "100000",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "Mulish"
      }}
      bg="primary"
      variant="dark"
    >
      <Navbar.Brand className="navbar titl">
        <Router>
          <a href="/" style={{ color: "white", fontFamily: "Mulish" }}>
            Food Eazy <i className="fas fa-utensils" />
          </a>{" "}
        </Router>
      </Navbar.Brand>
      <Nav>
        <div className="navLogout">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <span className="bg_grey">Home</span>
          </Link>
        </div>
        {isAuthenticated && verified && (
          <div className="navLogout">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/order"
              className="bg_grey"
            >
              <span className="bg_grey">Orders</span>
            </Link>
          </div>
        )}
        {isAuthenticated && verified && (
          <div className="navLogout">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/addproduct"
              className="bg_grey"
            >
              <span className="bg_grey">Add Items</span>
            </Link>
          </div>
        )}
        {isAuthenticated && verified && (
          <div className="navLogout">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/deleteitems"
              className="bg_grey"
            >
              <span className="bg_grey">Delete Items</span>
            </Link>
          </div>
        )}

          <div className="navLogout">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/contact"
              className="bg_grey"
            >
              <span className="bg_grey">Contact Us</span>
            </Link>
          </div>
        {isAuthenticated === true && (
          <div className="navLogout">
            {" "}
            <button
              type="button"
              onClick={handleLogout}
              style={{ border: "none", outline: "none" }}
            >
              Logout <ExitToAppIcon />
            </button>
          </div>
        )}

        <span className="hamburger">
          <i
            onClick={props.changeDisplay}
            className="fa fa-bars"
            aria-hidden="true"
          />
        </span>
      </Nav>
    </Navbar>
  );
}
