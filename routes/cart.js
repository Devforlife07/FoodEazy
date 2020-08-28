const express = require("express");
const router = express.Router();
const cors = require("cors");
const User = require("../models/register");
const Products = require("../models/product");
const auth = require("../middleware/auth")

router.post("/", async (req, res) => {
	let {
		user_id,
		cart
	} = req.body;
	if (cart.items.length === 0)
		return res.status(400).json({
			msg: "Cart is Empty"
		});
	let cart1 = {};
	(cart1.total_price = cart.total_price),
	(cart1.total_quantity = cart.total_quantity),
	(cart1.items = []);
	cart.items.forEach((item) => {
		cart1.items.push(item);
	});
	try {
		cart = await User.findByIdAndUpdate(user_id, {
			cart: cart1
		}, {
			new: true
		});
		res.status(200).send({
			msg: "Cart Saved Successfully",
			cart
		})
	} catch (e) {
		console.log(e);
	}
});
router.put("/", auth, async (req, res) => {

	try {
		cart = await User.findByIdAndUpdate(
			req.user.id, {
				cart: {
					total_quantity: 0,
					total_price: 0,
					items: []
				}
			}, {
				new: true,
			}
		);
		res.status(200).send({
			msg: "Cart Saved Successfully",
			cart,
		});
	} catch (e) {
		console.log(e);
	}
});
router.get("/", auth, async (req, res) => {
	try {
		let x = {};
		const user = await User.findById(req.user.id);
		x.total_quantity = 0;
		x.total_price = 0;
		x.items = [];
		let y = user.cart.items.length;
		let z = 0;
		if (y == 0)
			res.status(200).send({
				data: x
			})
		user.cart.items.forEach(async item => {
			const product = await Products.findOne({
				name: item.name
			});
			if (product) {
				x.items.push(item);
				x.total_price += (item.price * item.q);
				x.total_quantity += (item.q);
			}
			z++;
			if (z == y) {
				res.status(200).send({
					data: x
				})
			}

		})

	} catch (e) {
		res.status(500).send({
			msg: e
		})
	}
})

module.exports = router;