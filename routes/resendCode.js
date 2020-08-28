const User = require("../models/register");
const Router = require("express").Router();
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

Router.post('/', async(req, res)=>{
    const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.SEND_GRID_KEY,
          },
        })
      );
      var uid           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 6; i++ ) {
         uid += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      var mailOptions = {
        from: "mailfoodeazy@gmail.com",
        to: `${req.body.email}`,
        subject: "Email Verification",
        text: "That was easy!",
        html: "<div style =" +
          "width:100%; height:100%;  " +
          "><h1 style=" +
          "font-weight:500>Hey, " +
          req.body.name +

          "<br>Welcome to Food-Eazy</h1><h1>Thanks for Signing up on our app</h1><h3>Your Code for verification is : " + uid + " </h3></div><p>If this request is not made by you kindly ignore this mail.</p><p>Regards, <strong>Food Eazy</strong></p>",

      };
      transporter.sendMail(mailOptions, async(error, info)=> {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info);
          console.log(info);
          const update = {uid: uid};
          await User.findOneAndUpdate({_id: req.body.id}, update)
          res.status(200).json('Verification Code sent successfully to you mail id');
        }
    })
      
})
module.exports = Router;