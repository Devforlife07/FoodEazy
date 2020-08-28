import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core/";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core/";
import { CardMedia } from "@material-ui/core/";
import { Button } from "@material-ui/core/";
import { Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "animate.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

const Contact = () => {
  const classes = useStyles();
  return (
    <>
      <h1
        style={{ fontFamily: "Alata", paddingTop: "1rem" }}
        className="animate__animated animate__fadeIn"
      >
        Made with <FavoriteIcon style={{ color: "red" }} /> in India <img src='https://image.flaticon.com/icons/svg/321/321238.svg' style={{height:'2rem'}} />{" "}By
      </h1>

      <div className="contact_container">
        <div className="contact_item animate__animated animate__fadeInLeft">
          <Card className={classes.root} variant="outlined">
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Devansh Gera"
                height="300"
                image="https://avatars0.githubusercontent.com/u/47374577?s=460&u=6574ff78e4b980daf15da4d91a18fb396142b5f9&v=4"
                title="Devansh Gera"
              />
              <CardContent className="contact_card">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ fontFamily: "Mulish" }}
                >
                  Devansh Gera
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ fontFamily: "Poppins" }}
                >
                  Web Developer at NCS
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              style={{
                textAlign: "right",
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "10vh",
                paddingRight: "10vh"
              }}
            >
              <div>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/devansh-gera-62a2bb16b/"
                >
                  <img
                    src="https://image.flaticon.com/icons/svg/174/174857.svg"
                    alt="linkedin"
                    style={{ height: "5vh", width: "5vh" }}
                  />
                </a>
              </div>
              <div>
                <a target="_blank" href="https://github.com/Devforlife07">
                  <img
                    src="https://image.flaticon.com/icons/svg/1051/1051275.svg"
                    alt="linkedin"
                    style={{ height: "5vh", width: "5vh" }}
                  />
                </a>
              </div>
              <div>
                <a target="_blank" href="https://instagram.com/devforlife07">
                  <img
                    src="https://image.flaticon.com/icons/svg/733/733558.svg"
                    alt="linkedin"
                    style={{ height: "5vh", width: "5vh" }}
                  />
                </a>
              </div>
            </CardActions>
          </Card>
        </div>
        <div className="contact_item animate__animated animate__fadeInLeft">
          <Card className={classes.root} variant="outlined">
            <CardActionArea>
              <CardMedia
                component="img"
                alt=" Mihir Gupta"
                height="300"
                image={require("../images/Mihir.jpeg")}
                title=" Mihir Gupta"
              />
              <CardContent className="contact_card">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ fontFamily: "Mulish" }}
                >
                  Mihir Gupta
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ fontFamily: "Poppins" }}
                >
                  Self taught MERN Stack Developer and Comptetive Programmer
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              style={{
                textAlign: "right",
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "10vh",
                paddingRight: "10vh"
              }}
            >
              <div>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/mihir0699/"
                >
                  <img
                    src="https://image.flaticon.com/icons/svg/174/174857.svg"
                    alt="linkedin"
                    style={{ height: "5vh", width: "5vh" }}
                  />
                </a>
              </div>
              <div>
                <a target="_blank" href="https://github.com/mihir0699">
                  <img
                    src="https://image.flaticon.com/icons/svg/1051/1051275.svg"
                    alt="linkedin"
                    style={{ height: "5vh", width: "5vh" }}
                  />
                </a>
              </div>
              <div>
                <a target="_blank" href="https://instagram.com/mihir_gupta_1">
                  <img
                    src="https://image.flaticon.com/icons/svg/733/733558.svg"
                    alt="linkedin"
                    style={{ height: "5vh", width: "5vh" }}
                  />
                </a>
              </div>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Contact;
