import React, { useState } from "react";
import LoadingContext from "./loadingContext";
import Spinner from "../../images/Spinner.gif";
const LoadingState = (props) => {
  const [loading, setLoading] = useState(1);
  const Loader = () => {
    console.log("YES");
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "23444898429"
        }}
      >
        <img src={Spinner} alt="loader" />
      </div>
    );
  };
  return (
    <LoadingContext.Provider value={{ loading, setLoading, Loader }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
export default LoadingState;
