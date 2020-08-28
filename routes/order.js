const express = require("express");
const router = express.Router();
const cors = require("cors");
const User = require("../models/register");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const crypto = require("crypto")
const sendgridTransport = require("nodemailer-sendgrid-transport");
const Order = require("../models/orders");
const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.SEND_GRID_KEY,
		},
	})
);


// router.post('/', async (req, res) => {
// 	const {
// 		id,
// 		order
// 	} = req.body;
// 	let order1 = {};
// 	(order1.total_price = cart.total_price),
// 	(order1.total_quantity = order.total_quantity),
// 	(order1.items = []);
// 	order.items.forEach((item) => {
// 		order1.items.push(item);
// 	});
// 	try {
// 		User.findOneAndUpdate(id, {
// 			$push: {
// 				orders: order1
// 			}
// 		})
// 		res.status(200).json({
// 			msg: "Order Placed Successfully!"
// 		})
// 	} catch (err) {
// 		res.status(400).json(err);
// 	}

// })
router.post("/", cors(), auth, async (req, res) => {
	let method = req.body.value;
	let order_id = crypto.randomBytes(16).toString("hex");
	if (method === "Takeaway") {
		let order = new Order({
			user: req.user.id,
			order_id: order_id,
			mode: req.body.value,
			order: req.body.cart,
			deliveryCharges: req.body.deliveryCharges,
			payment: req.body.payment,
		})
		try {
			await order.save();
			let email = req.body.user.email;

			let name = req.body.user.name;
			var mailOptions = {
				from: "mailfoodeazy@gmail.com",
				to: `${email}`,
				subject: "Order Confirmation",
				text: "That was easy!",
				html: "Hi, <strong>" + name + "</strong><h2>Order Successfully Placed!</h2><h3><p>Thank you for ordering from Food Eazy</h3> Your order id: " + order_id + "</p><p style='text-align: left;'>Regards, <h1>Food Eazy</h1></>",
			};
			let msg = await transporter.sendMail(mailOptions)
			console.log(msg);
			let update = {
				cart: {},
			};
			await User.findOneAndUpdate({
					_id: req.user.id,
				},
				update
			);
			res.status(200).send({
				orderid: order_id
			})
			// res.redirect("/success?orderid=" + order_id)

		} catch (e) {
			console.log(e)
			res.sendStatus(500);
		}
	} else {
		let order_id = crypto.randomBytes(16).toString("hex");
		let order = new Order({
			user: req.user.id,
			address: req.body.address,
			order_id: order_id,
			mode: req.body.value,
			order: req.body.cart,
			deliveryCharges: req.body.deliveryCharges,
			payment: req.body.payment,
			address: req.body.address
		})
		try {
			await order.save();
			let email = req.body.user.email;

			let name = req.body.user.name;
			var mailOptions = {
				from: "mailfoodeazy@gmail.com",
				to: `${email}`,
				subject: "Order Confirmation",
				text: "That was easy!",
				html: "Hi, <strong>" + name + "</strong><h2>Order Successfully Placed!</h2><h3><p>Thank you for ordering from Food Eazy</h3> Your order id: " + order_id + "</p><p style='text-align: left;'>Regards, <h1>Food Eazy</h1></>",
			};
			let msg = await transporter.sendMail(mailOptions)
			console.log(msg);
			let update = {
				cart: {},
			};
			await User.findOneAndUpdate({
					_id: req.user.id,
				},
				update
			);
			res.status(200).send({
				orderid: order_id
			})
			// res.redirect("/success?orderid=" + order_id)

		} catch (e) {
			console.log(e)
			res.sendStatus(500);
		}


	}
	// order = new Order({
	// 	user: req.user.id,
	// 	order_id: order_id,
	// 	mode: req.body.value,
	// 	order: req.body.cart,
	// 	deliveryCharges: req.body.deliveryCharges,
	// 	payment: req.body.payment,
	// });
	// res.sendStatus(200)
})
router.get("/", async (req, res) => {
	let order_id = req.query.orderid;
	try {
		let current = await Order.findOne({
			order_id: order_id
		}).populate("user")
		// console.log(current)
		res.send(current)
	} catch (e) {
		res.sendStatus(404)
	}

})

module.exports = router