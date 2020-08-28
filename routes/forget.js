const express = require("express");
const router = express.Router();
const Forget = require('../models/forget')
const User = require("../models/register");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const shortid = require('shortid');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
	  process.env.SEND_GRID_KEY
    }
  })
);


router.post("/", async(req, res)=>{
	let {email} = req.body;
	User.findOne({email}, async(err, user)=>{
		if(err)
		{
			console.log(err);
			res.status(400).json(err);
		}
		else if(!user)
		{
			console.log(err);
			res.status(400).json("User not registered!");
		}
		else
		{
			let code = shortid.generate();
		  let link = `https::/foodeazy.herokuapp.com/api/forget/${code}`;
		  Forget.findOneAndDelete({email}, (err)=>{
		  	if(err)
		  		console.log(err);
		  })
		  forget = new Forget({
		  	email,
		  	code
		  })
		  await forget.save();
		  let name = user.name;

		  var mailOptions = {
		        from: "food.eazy1@gmail.com",
		        to: `${email}`	,
		        subject: "Reset your password for Food Eazy",
		        text: "That was easy!",
		        html: "Hi, <strong>" + name+"</strong><p>Follow this <a href=" + link+ " >Link</a> to reset your passowrd.</p><p>If this request is not made by you kindly ignore this mail.</p><p>Regards, <strong>Food Eazy</strong></p>",
		      };
		    transporter.sendMail(mailOptions, function (error, info) {
		        if (error) {
		          console.log(error);
		        } else {
		          res.status(200).json('Reset Email Sent to your mail id');
		        }
		        })


		}
	})
})


module.exports = router;