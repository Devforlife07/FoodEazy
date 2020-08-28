import React, { useContext, useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "./setAuthToken";
import removeAuthToken from "./removeAuthToken";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    current: 0,
    errors: [],
    verified: false,
    displayVerified: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const userLoaded = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get("/api/login", config);
      console.log(res);
      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_DISPLAY_VERIFIED",
        });
      }, 3000);
      return 0;
    } catch (err) {
      // console.log(err.response.data);
      localStorage.removeItem("token")
      dispatch({
        type: "AUTH_ERROR",
      });

      return 0;
    }
  };

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/register", formData, config);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });
      localStorage.setItem("token", res.data);
      userLoaded();
    } catch (err) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: err.response,
      });
      console.log(err.response);
      setTimeout(
        () =>
          dispatch({
            type: "REMOVE_ALERT",
          }),
        3500
      );
    }
  };
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://foodeazy.herokuapp.com/api/login",
        formData,
        config
      );
      localStorage.setItem("token", res.data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
      // console.log(res.data);
      userLoaded();
      setTimeout(() => {
        dispatch({
          type: "REMOVE_CURRENT",
        });
      }, 3000);
      return 0;
    } catch (err) {
      console.log(err.response);
      if (!err.response) {
        alert("Connection Cannot Be Made to Server");
      } else {
        dispatch({
          type: "LOGIN_FAIL",
          payload: err.response,
        });
        // console.log(err.response.data.errors[0].msg);
        setTimeout(
          () =>
            dispatch({
              type: "REMOVE_ALERT",
            }),
          3500
        );
      }
    }
  };
  const set_loading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
    removeAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{
        register: register,
        login: login,
        logout: logout,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        userLoaded: userLoaded,
        user: state.user,
        set_loading: set_loading,
        errors: state.errors,
        current: state.current,
        verified: state.verified,
        displayVerified: state.displayVerified,
      }}
    >
      {" "}
      {props.children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthState;
