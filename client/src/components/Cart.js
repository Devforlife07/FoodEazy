import React, { useState, useContext, useEffect } from "react";
import MenuList from "./MenuList";
import ProductContext from "../context/products/productsContext";
import CartContext from "../context/cart/cartContext";
import AuthContext from "../context/auth/authContext";
import CartList from "./cartList";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { makeStyles } from "@material-ui/core/";
import { Link } from "react-router-dom";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import { Button } from "@material-ui/core";
import { Container, Toast } from "react-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import zIndex from "@material-ui/core/styles/zIndex";
import '../styles.css'
import '../mobile.css'
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const SaveCart = (msg) => {
  return (
    <Toast style={{ position: "fixed", right: "0", zIndex: "9899899" }}>
      <Toast.Header
        style={{
          background: "darkGreen",
          color: "white",
          fontWeight: "bold"
        }}
      >
        <strong className="mr-auto">Success</strong>
        {/* <small>2 seconds ago</small> */}
      </Toast.Header>
      <Toast.Body>Cart Saved Successfully!</Toast.Body>
    </Toast>
  );
};
const Cart = () => {
  const classes = useStyles();
  const [save, setSave] = useState(0);
  const {
    items,
    loadCart,
    total_price,
    total_quantity,
    saveCart,
    state,
    clearCart
  } = useContext(CartContext);
  // console.log(items);
  //  useEffect(() => {
  // loadCart();
  //  }, []);
  const { user } = useContext(AuthContext);
  const handleClick = async () => {
    const bool = await saveCart(user._id, state);
    if (bool) setSave(1);
    setTimeout(() => {
      setSave(0);
    }, 3000);
  };

  return (
    <>
      {save === 1 ? <SaveCart /> : ""}
      <Link className="left_align" to="/">
        <i
          class="fa fa-arrow-circle-left"
          aria-hidden="true"
          style={{
            marginLeft: "0.3rem",
            marginTop: "0.5rem",
            fontSize: "2rem",
            position: "fixed",
            left: "0.3rem"
          }}
        />
      </Link>
      {!items || items.length === 0 ? (
        <img
        className="empty"
          src={require("../images/empty.png")}
          alt="empty"
        />
      ) : (
        <>
          <img
            className="hungryImage"
            src="https://i.etsystatic.com/17234112/r/il/d3df86/1737397372/il_794xN.1737397372_mczx.jpg"
            alt="punchy"
            style={{ height: "50vh", width: "100%" }}
          />
          <div className="cartItems">
            <div className="cartContainer">
              <h1 style={{ fontWeight: "500", fontFamily: "Alata" }}>
                Items{" "}
                <img
                  src="https://image.flaticon.com/icons/svg/2922/2922037.svg"
                  alt="items"
                  style={{ height: "6rem" }}
                />
              </h1>
              {items.map((item) => (
                <CartList item={item} />
              ))}
            </div>

            <div className="summary">
              <div>
                <span className="amount">
                  Amount Payable : <span className="WebRupee">&#x20B9;</span>
                  {total_price}
                </span>
              </div>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleClick}
                startIcon={<SaveAltIcon />}
                style={{
                  fontFamily: "Mulish",
                  color: "white",
                  backgroundColor: "#5995FD",
                  border: "none",
                  outline: "none"
                }}
              >
                Save Cart
              </Button>
              <br />
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<ClearAllIcon />}
                onClick={(e) => clearCart()}
                style={{
                  fontFamily: "Mulish",
                  color: "white",
                  backgroundColor: "#DC3545",
                  border: "none",
                  outline: "none"
                }}
              >
                Clear Cart
              </Button>
              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={<ShoppingCartIcon />}
                  style={{
                    fontFamily: "Mulish",
                    color: "white",
                    backgroundColor: "#007BFF",
                    border: "none",
                    outline: "none"
                  }}
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
