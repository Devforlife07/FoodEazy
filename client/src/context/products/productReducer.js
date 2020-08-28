export default (state, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      let b = [];
      action.payload.forEach((item) => {
        let x = {};
        x.name = item.name;
        x.price = item.price;
        x.url = item.url;
        x.type = item.type;
        x.q = 0;
        b.push(x);
      });
      return { ...state, items: b };

    case "SEARCH_PRODUCTS":
      let a = [];
      const regex = new RegExp(`${action.payload}`, "gi");
      state.items.forEach((item) => {
        if (item.name.match(regex)) a.push(item);
      });
      // console.log(a);
      return {
        ...state,
        filtered: a
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        filtered: []
      };
    case "SORT_BY_PRICE":
      let x = state.items;
      x.sort(function (a, b) {
        return a.price - b.price;
      });
      return {
        ...state,
        items: x
      };
    case "SORT_BY_NAME":
      let y = state.items;
      y.sort((a, b) => (a.name > b.name ? 1 : -1));
      return {
        ...state,
        items: y
      };
    case "SetLoading":
    return{
      ...state,
      loading1: true
    }
    case "UnsetLoading":
    return{
      ...state,
      loading1: false
    } 
    default:
      return state;
  }
};
