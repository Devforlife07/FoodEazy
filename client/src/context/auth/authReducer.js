export default (state, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };
    case "REGISTER_FAIL":
      let x = [];
      if (action.payload.data.msg) {
        x.push(action.payload.data.msg);
      }
      if (action.payload.data.errors) {
        action.payload.data.errors.forEach((error) => {
          x.push(error.msg);
        });
      }
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: x
      };
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        verified: action.payload.verify,
        // displayVerified: !this.verified
      };
    // case "REMOVE_DISPLAY_VERIFIED":
    //   return { ...state, displayVerified: !state.displayVerified };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        current: 1,
        loading: false
      };
    case "LOGIN_FAIL":
      let y = [];
      if (action.payload.data.msg) {
        y.push(action.payload.data.msg);
      }
      if (action.payload.data.errors) {
        action.payload.data.errors.forEach((error) => {
          y.push(error.msg);
        });
      }
      return {
        ...state,
        isAuthenticated: false,
        errors: y,
        loading: false,
        user: null
      };
    case "AUTH_ERROR":
      return { ...state, isAuthenticated: false, user: null };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case "REMOVE_ALERT":
      return {
        ...state,
        errors: []
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true
      };
    case "REMOVE_CURRENT":
      return { ...state, current: 0 };
    default:
      return state;
  }
};
