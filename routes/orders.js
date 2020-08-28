const express = require("express");
const router = express.Router();
const Orders = require('../models/orders');
const auth = require("../middleware/auth")


router.get('/', auth, async (req, res) => {
	let user_id = req.user.id;
	let orders = await Orders.find({
		user: user_id
	});
	if (!orders)
		res.status(200).json('No Orders Placed!');
	else {
		res.status(200).json(orders);
	}

})

module.exports = router