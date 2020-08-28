import React from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";
import "animate.css";

const DeleteItem = ({
  item,
  loading,
  setLoading,
  state,
  display,
  setDisplay,
  increaseCount
}) => {
  const handleClick = async (e) => {
    const formdata = {
      name: item.name
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(
        "/api/admin/items",
        formdata,
        config
      );
      setDisplay({
        val: 1,
        msg: "Successfully Deleted",
        color:"darkGreen"
      });

      increaseCount();
      const id = setTimeout(() => {
        setDisplay({ val: 0, msg: "",type:"",color:"" });
        clearTimeout(id);
      }, 3000);
    } catch (e) {
     
      setDisplay({val:1,msg:e.response.data,type:"fail",color:"red"})
      const id = setTimeout(() => {
        setDisplay({ val: 0, msg: "",type:"",color:"" });
        clearTimeout(id);
      }, 3000);

    }
  };
  return (
    <>
      <div
        className="itemlist animate__animated animate__fadeIn"
        style={{
          borderBottom: "1px solid #007bff",
          margin: "0 auto",
          borderRadius: "0"
        }}
      >
        <div className="img_show2">
          <img
            style={{ width: "100%", height: "90%", borderRadius: "25%" }}
            src={item.url}
            alt="food"
          />
        </div>
        <div className="details">
          <h2 style={{ fontFamily: "Mulish", fontWeight: "bold" }}>
            {item.name}
          </h2>
          <button className="btn1" onClick={handleClick}>
            <i
              class="fas fa-trash"
              style={{ color: "red", fontSize: "2rem" }}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteItem;
