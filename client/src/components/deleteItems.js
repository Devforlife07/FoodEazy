import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DeleteItem from "./DeleteItem";
import { Toast } from "react-bootstrap";
import LoadingContext from "../context/loading/loadingContext";
import 'animate.css'

const DeleteItems = () => {
  const [loading, setLoading] = useState(1);
  const { Loader } = useContext(LoadingContext);
  useEffect(()=>{
    console.log(display)
  })
  
  const [display, setDisplay] = useState({
    val: 0,
    msg: "",
    type:"",
    color:""
  });
  const [items, setItems] = useState(null);
  const getItems = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/formdata"
      }
    };
    setLoading(1);
    const res = await axios.get("/api/admin/items", config);
     let y = res.data;
      y.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log(y);
    setItems(y);
    setLoading(0);
  };
  const increaseCount = () => {
    setCount(buttoncount + 1);
  };
  const [buttoncount, setCount] = useState(0);
  useEffect(() => {
    setLoading(1);
    getItems();
    setLoading(0);
  }, [buttoncount]);
  const NoItem = () => {
    return (
      <img
        style={{
          width: "50vw",
          display: "block",
          margin: "auto",
          height: "80%",
          padding: "1 rem 0.8rem"
        }}
        className="noItem"
        src={require("../images/noItem.png")}
        alt="noItem"
      />
    );
  };

  return (
    <>
      {display.val === 1 ? <Toast
        className="animate__animated animate__fadeInRight"
        style={{ position: "fixed", right: "0", zIndex: "9899899" }}
      >
        <Toast.Header
          style={{
            background: display.color,
            color: "white",
            fontWeight: "bold"
          }}
        >
          <strong className="mr-auto">{display.type==="fail"?"Fail":"Success"}</strong>
          {/* <small>2 seconds ago</small> */}
        </Toast.Header>
        <Toast.Body>{display.msg}</Toast.Body>
      </Toast> : ""}
      {!items || items.length === 0 || loading == 1 ? (
        <Loader />
      ) : !items || items.length === 0 ? (
        <NoItem />
      ) :<><div className="deleteTitle"><h1>Delete Items</h1>

      <div><img src='https://image.flaticon.com/icons/svg/3221/3221897.svg' style={{height: '15vh'}}/></div>

      </div>
       
        {items.map((item, idx) => (
          <DeleteItem
            loading={loading}
            setLoading={setLoading}
            increaseCount={increaseCount}
            dispaly={display}
            setDisplay={setDisplay}
            key={idx}
            item={item}
            state={items}
          />
        ))}
      </>}
    </>
  );
};

export default DeleteItems;
