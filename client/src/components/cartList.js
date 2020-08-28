import React, {
  useContext,
  useState,
  useEffect
} from "react";
import CartContext from "../context/cart/cartContext";
import "animate.css";

const CartList = (props) => {
  // console.log(props.item.name);
  const [fadeout, set] = useState(0);


  const {
    name,
    price,
    q,
    url,
    type
  } = props.item;
  const {
    addProduct,
    items,
    state,
    total_q,
    removeProduct,
    deleteClick
  } = useContext(CartContext);
  // const items = state.items;

  const [count, setCount] = useState(0);

  useEffect(() => {
    items.forEach((item) => {
      if (item.name === name) {
        setCount(item.q);
      }
    });
  }, [total_q]);
  const clickHandle = (e) => {
    setCount(count + 1);
    addProduct({
      name,
      price,
      q: count + 1,
      url,
      type
    });
  };
  const minusHandle = (e) => {
    setCount(count - 1);
    removeProduct({
      name,
      price,
      q: count - 1,
      url,
      type
    });
  };
  const handleDelete = (e) => {
    deleteClick(name);
    set(1);
  };
  return ( <>
    <div className = {
      `itemlist ${
            fadeout !== 1
              ? "animate__animated animate__fadeIn cartContainer"
              : "animate__animated animate__fadeOut"
          }`
    } >
    <
    div className = "img_show" >
    <
    img src = {
      url
    }
    alt = "food" / >
    </div>
     <div className = "details" >
    <h1 className = "food"
    style = {
      {
        textAlign: "center",
        fontFamily: "Mulish",
        fontWeight: "300",
        fontSize: "1.3rem"
      }
    } > {
      name
    } </h1> 
    <div className = "buttonsCart" >
    <button className = "btn1" > {
      " "
    } 
    <i className = "fa fa-trash"
    onClick = {
      handleDelete
    }
    style = {
      {
        "font-size": "1.2rem",
        color: "red"
      }
    }
    /> </button > {
      count > 0 ? ( <
        button className = "btn1"
        onClick = {
          minusHandle
        }>
        <i className = "fa fa-minus-circle fa-lg" />
        </button>
      ) : ( <
        button className = "btn1  disabled" >
        <
        i className = "fa fa-minus-circle fa-lg" /
        >
        </button>
      )
    } 
    <span className = "numbers1" > 
    {
      count
    } </span> <button className = "btn1"
    onClick = {
      clickHandle
    } >
    <i className = "fa fa-plus-circle fa-lg" />
    </button> 
    </div > 
    </div> 
    </div >
     </>
  );

};
export default CartList;