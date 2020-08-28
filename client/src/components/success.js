import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import AuthContext from "../context/auth/authContext";
import { Spinner } from "react-bootstrap";
import LoadingContext from "../context/loading/loadingContext";
// import Spinnner from "../images/Spinnner.gif";
const Success = (props) => {
  const [loading, setLoading] = useState(0);
  const { user } = useContext(AuthContext);
  const { Loader } = useContext(LoadingContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    const orderid = props.location.search.split("?")[1].split("=")[1];
    const fetch = async () => {
      try {
        setLoading(1);
        const res = await Axios.get(
          "/api/orders?orderid=" + orderid
        );
        console.log(res.data);
        setData({...res.data});
       
        // console.log(res.data.order.items);
        setLoading(0);
      } catch (e) {
        props.history.push("/dvsjhvdsjhj")
        setLoading(0);
      }
    };
    fetch();
     setLoading(0);
  }, [props.location.search]);
  useEffect(()=>{
    console.log(data);
  },[data])
  return (
    <>
      {!data   ? (
        <>
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
        <img src={require("../images/Spinner.gif")} alt="loader" />
      </div>
        </>
      ) : (
        <>
          {" "}
          <div className="successContainer">
            <img
              src={require("../images/check.png")}
              alt="success"
              style={{ height: "15vh", paddingBottom: "3vh" }}
            />
            <h2 style={{ fontFamily: "Red Rose" }}>THANK YOU!</h2>

            <span style={{ fontFamily: "Poppins" }}>
              Your order was successfully placed. We have sent the order
              confirmation to {data.user.email}
              {" ."}
            </span>
          </div>
          <div style={{ fontFamily: "Poppins" }}>
            <h4 style={{ fontFamily: "Mulish", textAlign: "center" }}>
              ORDER DETAILS -{" "}
            </h4>
            <span style={{ fontFamily: "Mulish" }}>Order ID</span>-{" "}
            {data.order_id}
            <div className="details">
              <div>
                <h5 style={{ fontFamily: "Mulish" }}>Email</h5>
                {data.user.email}
              </div>
              <div>
                <h5 style={{ fontFamily: "Mulish" }}>Order Type</h5>
                {data.mode}
              </div>
              <div>
                <h5 style={{ fontFamily: "Mulish" }}>Payment Method</h5>
                {data.payment}
              </div>
              <div>
                <h5 style={{ fontFamily: "Mulish" }}>Order Date</h5>
                {new Date(data.time).toDateString()}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Mulish" }}>Order Summary</h4>
              {data.order.items.map((item) => (
                <p>
                  {item.q} X {item.name}
                </p>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                margin: "1rem 0"
              }}
            >
              <div>
                <h2 style={{ fontFamily: "Mulish" }}>Total Amount</h2>
                <h2>
                  {" "}
                  &#x20b9; {data.order.total_price + data.deliveryCharges}
                </h2>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Success;
