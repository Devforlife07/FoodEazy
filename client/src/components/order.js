import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import AuthContext from "../context/auth/authContext";
import LoadingContext from "../context/loading/loadingContext";

const Order = () => {
  const userInfo = useContext(AuthContext);
  const { Loader } = useContext(LoadingContext);
  const { user } = userInfo;
  const { name, email } = user;
  const [active, setActive] = useState([]);
  const [component, setComponent] = useState({ val: 0, details: {} });
  const [loading, setLoading] = useState(true);
  const [past, setPast] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Axios.get("/api/get_orders");
        console.log(res.data);
        let a1 = [];
        let a2 = [];
        res.data.forEach((order) => {
          return order.status === "false" ? a1.push(order) : a2.push(order);
        });
        setActive(a1);
        setPast(a2);
        setLoading(false);
      } catch (e) {
        console.log(e.response);
        setLoading(0);
        return <h1>Internal Server Error</h1>;
      }
    };

    getData();
  }, []);
  useEffect(() => {
    console.log(component);
    // console.log(name);
  }, [component]);
  const Component = () => {
    return (
      <div className="mainComponent" style={{ overflow: "visible" }}>
        <div>
          <div className=" other animate__animated animate__lightSpeedInLeft">
            <span
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "5px",
                marginTop: "-10px"
              }}
            >
              <i
                onClick={(e) => setComponent({ val: 0, details: {} })}
                class="fa fa-times"
                aria-hidden="true"
                style={{ fontSize: "2rem" }}
              ></i>
            </span>
            <div className="i1">
              <div class="info">
                <div>
                  <h5>Order Id: </h5>
                  <span className="orderId">
                    {"  "}
                    {component.details.order_id}{" "}
                  </span>
                </div>
                <h5>Amount: &#x20B9; {component.details.order.total_price}</h5>
              </div>
              <hr />
              <h5>Ordered By: {name}</h5>
              <h5>Email: {email}</h5>
              <h6>Payment Mode: {component.details.payment}</h6>
            </div>
            <hr />
            <div className="i2">
              <div className="items">
                <h5>Items:</h5>
                <div>
                  {component.details.order.items.map((data) => (
                    <p>
                      {data.q} X {data.name}
                    </p>
                  ))}
                </div>
              </div>
              <hr />
              <div className="orderdetails">
                <h6>
                  Mode Of Delivery :{" "}
                  {component.details.mode === "Delivery"
                    ? "Home Delivery"
                    : component.details.mode}
                </h6>
                <h6>
                  Delivered On {new Date(component.details.time).toDateString()}
                </h6>
                {component.details.address && (
                  <>
                    <h5>Delivered To </h5>
                    <h6>Address:{component.details.address.Address}</h6>{" "}
                    <h6>City: {component.details.address.Address.City}</h6>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  //  const Loader = () => (
  //  <div style={{ width: "100%" }}>
  //    <img src={require("../images/Spinner.gif")} alt="loader" />
  // </div>
  //);
  const CurrentOrders = () => {
    return (
      <>
        <div className="pastOrderContainer animate__animated animate__fadeIn">
          <h1>
            Current Orders{" "}
            <img
              src="https://image.flaticon.com/icons/svg/2289/2289804.svg"
              alt="icon"
              style={{ width: "10%", height: "10%" }}
            />
          </h1>
      {!active.length? (<No_order />) : ( active.map((item) => (
            <div onClick={(e) => setComponent({ val: 1, details: item })}>
              <div className="detailsPastOrders">
                <h1>OrderId: {item.order_id}</h1>
                <h1>Amount: &#x20B9;{item.order.total_price}</h1>
              </div>
              <div className="pastOrdersInfo">
                Total Items: {item.order.total_quantity}
              </div>
              <h5>Delievered On {new Date(item.time).toDateString()}</h5>
            </div>
)))}
  
         
        </div>
      </>
    );
  };

  const No_order = ()=>{
    return(
      <img src='https://static.dribbble.com/users/429792/screenshots/3649946/no_order.png' alt='no_order'style={{maxWidth: '80%'}}/>
    )
  }
  const PastOrders = () => {
    return (
      <>
        <div className="pastOrderContainer animate__animated animate__fadeIn">
          <h1>
            Past Orders{" "}
            <img
              src="https://image.flaticon.com/icons/svg/2649/2649215.svg"
              alt="icon"
              style={{ width: "10%", height: "10%" }}
            />
          </h1>
          {!active.length? (<No_order />) : (past.map((item) => (
            <div onClick={(e) => setComponent({ val: 1, details: item })}>
              <div className="detailsPastOrders">
                <h1>OrderId: {item.order_id}</h1>
                <h1>Amount: {item.order.total_price}</h1>
              </div>
              <div className="pastOrdersInfo">
                Total Items: {item.order.total_quantity}
              </div>
              <h5>Delievered On {new Date(item.time).toDateString()}</h5>
            </div>
          )))}
        </div>
      </>
    );
  };
  // useEffect(() => {
  //   console.log(active.length);
  //   console.log(past.length);
  // }, [active, past]);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          {component.val === 1 ? <Component /> : ""}
          <div>
            <CurrentOrders />
            <PastOrders />
          </div>
        </>
      )}
    </>
  );
};

export default Order;
