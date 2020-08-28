import React, { useReducer } from "react";
import ProductContext from "./productsContext";
import ProductReducer from "./productReducer";
import axios from "axios";

const ProductState = (props) => {
  const initialState = {
    total_quanity: 0,
    items: [],
    filtered: [],
    loading1: false
  };
  const loadItems = async () => {
    try {
      dispatch({ type: "SetLoading" });
      const res = await axios.get("api/items");
      await dispatch({ type: "LOAD_PRODUCTS", payload: res.data });
      dispatch({ type: "UnsetLoading" });
      return 0;
    } catch (e) {
      console.log(e.response);
    }
  };
  const [state, dispatch] = useReducer(ProductReducer, initialState);
  const search = (product) => {
    dispatch({ type: "SEARCH_PRODUCTS", payload: product });
  };
  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };
  const sortByPrice = () => {
    dispatch({ type: "SORT_BY_PRICE" });
  };
  const sortByName = () => {
    dispatch({ type: "SORT_BY_NAME" });
  };
  return (
    <ProductContext.Provider
      value={{
        items: state.items,
        total_quantity: state.total_quanity,
        search,
        filtered: state.filtered,
        clearFilter,
        loadItems: loadItems,
        sortByName: sortByName,
        sortByPrice: sortByPrice,
        laoding1: state.loading
      }}
    >
      {" "}
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
