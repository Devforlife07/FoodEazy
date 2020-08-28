const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');
	if (!token)
		return res.status(401).json("No token");

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		next();

	} catch (err) {
		console.log("Invalid token");
		return res.sendStatus(400)
	}
}