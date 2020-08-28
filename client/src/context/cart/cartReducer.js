import { ADD_PRODUCT, REMOVE_PRODUCT } from "../types";
export default (state, action) => {
  let flag = 0;
  switch (action.type) {
    case "LOAD_CART":
      return action.payload.data;
    case "ADD_PRODUCT":
      let a = [];
      state.items.forEach((item) => {
        if (item.name == action.payload.name) {
          flag = 1;

          a.push(action.payload);
        } else a.push(item);
      });
      if (flag == 0) {
        a.push(action.payload);
      }
      let price = 0;
      let quantity = 0;

      a.forEach((item) => {
        price += item.price * Number(item.q);
        quantity += item.q;
      });
      return {
        total_quantity: quantity,
        total_price: price,
        items: a
      };
    case "REMOVE_PRODUCT":
      let b = [];
      // console.log(action.payload);
      state.items.forEach((item) => {
        if (item.name == action.payload.name) {
          flag = 1;
          if (action.payload.q > 0) b.push(action.payload);
        } else b.push(item);
      });
      if (flag == 0) {
        b.push(action.payload);
      }
      let price1 = 0;
      let quantity1 = 0;

      b.forEach((item) => {
        price1 += item.price * Number(item.q);
        quantity1 += item.q;
      });
      return {
        total_quantity: quantity1,
        total_price: price1,
        items: b
      };
    case "CLEAR_CART":
      return {
        total_quantity: 0,
        total_price: 0,
        items: [],
        current: 0
      };
    case "DELETE_CLICK":
      let n = [];
      state.items.map((item) => {
        if (item.name !== action.payload) n.push(item);
      });
      let price2 = 0;
      let quantity2 = 0;
      n.forEach((item) => {
        price2 += item.price * Number(item.q);
        quantity2 += item.q;
      });
      return {
        total_quantity: quantity2,
        total_price: price2,
        items: n
      };
case "SetLoading":
    return{
      ...state,
      loading2: true
    }
     case "UnsetLoading":
    return{
      ...state,
      loading2: false
    } 
    default:
      return state;
  }
};
