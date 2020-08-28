import React, { useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const NotVerified = () => {
    return (
      <div style={{ width: "100%", background: "red", color: "white" }}>
        <center>
          {" "}
          <h1>
            Your Email Id Isn't Verified.Verification Link Will Expire Within an
            hour
          </h1>
        </center>
      </div>
    );
  };
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, verified } = authContext;
  console.log(verified)
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Redirect to="/auth" /> : verified? <Component {...props}/> : <Redirect to="/verify" /> 
      }
    />
  );
};

export default PrivateRoutes;
// ) : !verified ? (
//   <NotVerified />
