import React, { useState, useContext, useEffect, Fragment } from "react";
import ProductContext from "../context/products/productsContext";
import CartContext from "../context/cart/cartContext";
import LoadingContext from "../context/loading/loadingContext";
import "../styles.css";
import "animate.css";
import {
  Form,
  FormControl,
  Button,
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";

const MenuList = (item) => {
  const { addProduct, items, total_q, removeProduct } = useContext(CartContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (items)
      items.forEach((item) => {
        if (item.name === name) {
          setCount(item.q);
        }
      });
  }, [total_q]);
  const clickHandle = (e) => {
    setCount(count + 1);
    addProduct({ name, price, q: count + 1, url, type });
  };
  const minusHandle = (e) => {
    setCount(count - 1);
    removeProduct({ name, price, q: count - 1, url, type });
  };
  const { name, price, q, url, type } = item;

  return (
    <Col className="parCart" sm={6} md={4} xs={12}>
      <Card
        className="Card animate__animated animate__fadeInLeft"
        style={{ width: "13.8rem" }}
      >
        <Card.Img className="menuImage" variant="top" src={url} />
        <Card.Body>
          <Card.Title
            className="food"
            style={{
              fontFamily: "Mulish",
              fontWeight: "300",
              fontSize: "1.25rem"
            }}
          >
            {name}
          </Card.Title>
          {type === "Veg" || type === "veg" ? (
            <img
              src="https://img.icons8.com/color/22/000000/vegetarian-food-symbol.png"
              alt="Veg"
            />
          ) : (
            <img
              src="https://img.icons8.com/color/22/000000/non-vegetarian-food-symbol.png"
              alt="non-veg"
            />
          )}

          <span className="numbers">
            {" "}
            <span className="WebRupee">&#x20B9;</span> {price}
          </span>
          <Card.Text />
          <div class="buttons">
            {count > 0 ? (
              <Fragment>
                <button id="minus" className="btn2" onClick={minusHandle}>
                  <i className="fa fa-minus-circle fa-lg" aria-hidden="true" />
                </button>
                <span className="numbers">{count} </span>
                <button className="btn2" onClick={clickHandle}>
                  <i class="fa fa-plus-circle fa-lg" aria-hidden="true" />
                </button>
              </Fragment>
            ) : (
              <Button
                variant="outline-primary"
                onClick={clickHandle}
                style={{
                  width: "5rem",
                  height: "1.7rem",
                  fontFamily: "Mulish",
                  lineHeight: "100%",
                  fontSize: "0.9rem",
                  lineHeight : '100%',
                  marginTop: '0.5rem'
                }}
              >
                Add
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default MenuList;
