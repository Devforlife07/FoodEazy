const express = require("express");
const router = express.Router();
const Forget = require("../models/forget");
const User = require("../models/register");
const bcrypt = require("bcryptjs");
const {
	check,
	validationResult
} = require("express-validator");
router.get("/", async (req, res) => {
	console.log(req.query)
	let code = req.query.code;
	console.log("CODE");
	// console.log(code)
	try {
		let data = await Forget.findOne({
			code: code
		})

		if (data) {
			console.log(data)
			return res.sendStatus(200);
		}
		res.status(404).send({
			msg: "Unauthorized"
		})
	} catch (e) {
		console.log("yeah")
		res.status(404).send({
			msg: "Unauthorized"
		})
	}
});

router.post(
	"/",
	check(
		"password",
		"Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
	).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).json({
				errors: err.array(),
			});
		}
		let {
			code,
			password
		} = req.body;
		Forget.findOne({
			code
		}, async (err, user) => {
			if (err) console.log(err);
			else if (!user) {
				res.status(404).json("Invalid URL");
			} else {
				let email = user.email;
				const salt = await bcrypt.genSalt(10);
				let newPass = await bcrypt.hash(password, salt);
				const update = {
					password: newPass
				};
				let user1 = await User.findOneAndUpdate({
					email
				}, update);
				Forget.findOneAndDelete({
					code
				}, (err) => {
					console.log(err);
				});
				res.status(200).json("Password Updated Successfully!");
			}
		});
	}
);

module.exports = router;