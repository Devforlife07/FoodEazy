import React, { useState , useContext} from "react";
import axios from "axios";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Form, Toast, Button, InputGroup } from "react-bootstrap";
import "animate.css";
import { TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/";
import LoadingContext from "../context/loading/loadingContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

const AddProduct = () => {
  const [status, setStatus] = useState({ val: 0, msg: "", type: "" });
  const { Loader} = useContext(LoadingContext);
  const [loading,setLoading] = useState(0);
  let class1 = "";
  const [data, setData] = useState({
    name: "",
    price: 0,
    type: "veg"
    // productImage: null
  });
  const Alert = (msg, type) => {
    if (status.type === "Success")
    {
      class1 = "animate__animated animate__fadeRight";
     
    }
    else if (status.type === "Fail")
      class1 = "animate__animated animate__shakeX";
    return (

      <Toast
        style={{ position: "fixed", right: "0", zIndex: "9899899" }}
        className={
          status.type === "red"
            ? "animate__animated animate__shakeX class1"
            : "animate__animated animate__fadeRight"
        }
      >
        <Toast.Header
          style={{
            background: status.type,
            color: "white",
            fontWeight: "bold"
          }}
        >
          <strong className="mr-auto">
            {status.type === "darkGreen" ? "Success" : "Fail"}
          </strong>
          {/* <small>2 seconds ago</small> */}
        </Toast.Header>
        <Toast.Body>{status.msg}</Toast.Body>
      </Toast>
    );
  };
 
  const [file, setFile] = useState();
  const handleSignUpData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("productImage", file);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("type", data.type);
    const config = {
      headers: {
        "Content-Type": "multipart/formdata"
      }
    };
    try {
      if (!file || !data.name || !data.price || !data.type) {
        setStatus({ val: 1, msg: "Enter All Fields", type: "red" });
        let id = setTimeout(() => {
          setStatus({ val: 0, msg: "", type: "" });
          clearTimeout(id);
        }, 3000);
        return;
      }
      console.log(data);
      setLoading(1);
      const res = await axios.post(
        "/api/admin/upload",
        formData,
        config
      );
      setStatus({ val: 1, msg: "SuccessFully Added", type: "darkGreen" });
      let id = setTimeout(() => {
        setStatus({ val: 0, msg: "", type: "" });
        clearTimeout(id);
      }, 3000);
      setLoading(0);
    } catch (e) {
      setStatus({ val: 1, msg: e.response.data, type: "red" });
      let id = setTimeout(() => {
        setStatus({ val: 0, msg: "", type: "" });
        clearTimeout(id);
      }, 3000);
      setLoading(0);
    }
  };
  return (
    <>
      {status.val ? <Alert /> : ""}
      {loading==1?<div><Loader/></div>:<>
      <h3 style={{ marginTop: "6vh", fontFamily: "Mulish" }}>Add a Dish{" "}<img src='https://image.flaticon.com/icons/svg/2917/2917633.svg' style={{height: '10vh'}}/></h3>
      <div className="forget animate__animated animate__lightSpeedInLeft">
        <Form
          style={{ padding: "0rem", flex: "2" }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="name"
              placeholder="Item Name"
              style={{ width: "17rem" }}
              onChange={handleSignUpData}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>&#x20B9;</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                name="price"
                placeholder="Price"
                style={{ width: "15rem" }}
                onChange={handleSignUpData}
              />
            </InputGroup>
          </Form.Group>
          <div className="veg" style={{ fontFamily: "Poppins" }}>
            <span style={{ fontWeight: "550" }}>Type</span>
            <br />
            <input
              type="radio"
              id="veg"
              name="type"
              value="Veg"
              checked="checked"
              onChange={handleSignUpData}
            />{" "}
            <label htmlFor="veg">
              Veg{" "}
              <img
                src="https://img.icons8.com/color/22/000000/vegetarian-food-symbol.png"
                alt="Veg"
              />
            </label>
            <br />
            <input
              type="radio"
              id="nonVeg"
              name="type"
              value="nonVeg"
              onChange={handleSignUpData}
              style={{ padding: "1rem" }}
            />{" "}
            <label htmlFor="nonVeg">
              {" "}
              Non-Veg{" "}
              <img
                src="https://img.icons8.com/color/22/000000/non-vegetarian-food-symbol.png"
                alt="Veg"
              />
            </label>
            <br />
          </div>
          {/* <Form.Group> */}
          <Form.Label
            style={{
              fontFamily: "Poppins",
              align: "left",
              fontWeight: "550",
              paddingTop: "0.7rem"
            }}
          >
            Upload Image <CloudUploadIcon />
          </Form.Label>
          <input
            type="file"
            // value="upload"
            name="productImage"
            id="exampleFormControlFile1"
            label="Upload Image"
            style={{ fontFamily: "Poppins" }}
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
            }}
          />
          {/* </Form.Group> */}
          <Button
            className="btn btn-primary"
            variant="primary"
            type="submit"
            style={{
              borderRadius: "1vh",
              fontFamily: "Poppins",
              textTransform: "capitalize"
            }}
          >
            Save Item
          </Button>
        </Form>
      </div>
      </>}
    </>
  );
};

export default AddProduct;
