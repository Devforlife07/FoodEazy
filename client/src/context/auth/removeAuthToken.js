import axios from "axios";

const removeAuthToken = () => {
  delete axios.defaults.headers.common["x-auth-token"];
};

export default removeAuthToken;
