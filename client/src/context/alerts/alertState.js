import React, { useReducer } from "react";
import AlertContext from "./AlertContext";

const Alerts = () => {
  const intitalState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);
};
