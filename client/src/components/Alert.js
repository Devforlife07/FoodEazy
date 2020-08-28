import React, { useContext } from "react";
import authContext from "../context/auth/authContext";
import ErrorList from "./ErrorList";
import { Toast } from "react-bootstrap";
import "animate.css";

const Alerts = () => {
  const { errors, isAuthenticated } = useContext(authContext);
  // if (errors.length > 0) return errors.map(err => <ErrorList err={err} />);
  if (errors.length > 0)
    return (
      <ErrorList className="animate__animated animate__shakeX" err={errors} />
    );

  return null;
};

export default Alerts;
