const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const register = new Schema({
	name: {
		type: String,
		required: true
	},
	uid: {
		type: String
	},
	role: {
		type: String,
		default: "user",
		enum: ["user", "admin"]
	},
	verify: {
		type: Boolean,
		default: false
	},
	email: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		default: Date.now()
	},
	number: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	cart: {
		total_quantity: {
			type: Number,
			default: 0,
			required: true
		},

		total_price: {
			type: Number,
			default: 0,
			required: true
		},
		items: [{
			name: {
				type: String,
				required: true
			},
			price: {
				type: Number,
				required: true
			},
			q: {
				type: Number,
				required: true
			},
			url: {
				type: String,
				required: true
			}
		}]

	},
	orders: [{
		total_quantity: {
			type: Number,
			default: 0,
			required: true
		},

		total_price: {
			type: Number,
			default: 0,
			required: true
		},
		items: [{
			name: {
				type: String,
				required: true
			},
			price: {
				type: Number,
				required: true
			},
			q: {
				type: Number,
				required: true
			},
			url: {
				type: String,
				required: true
			}
		}]

	}]

})

module.exports = mongoose.model('auth', register);