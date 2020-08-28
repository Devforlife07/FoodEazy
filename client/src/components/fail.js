import React from "react";
import { Container } from "@material-ui/core/";

const Fail = () => {
  return (
    <Container fixed style={{ padding: "3rem" }}>
      <img
        src={require("../images/close.png")}
        alt="payment_fail"
        style={{ height: "15vh" }}
      />
      <h2
        style={{
          fontFamily: "Mulish",
          paddingTop: "1.5rem",
          paddingBottom: "2rem"
        }}
      >
        Ohh! Snap
      </h2>
      <h5 style={{ fontFamily: "Poppins" }}>
        There was a problem in processing your order. Please try again after
        some time. If the problem still persists contact us through the Contact
        Us tab in the navigation bar.
      </h5>
    </Container>
  );
};

export default Fail;
