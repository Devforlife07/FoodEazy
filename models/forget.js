const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const forgetSchema = new Schema({
	email: {
		type : String,
		required: true
	},
	code : {
		type :String,
		required: true
	}
})

module.exports = mongoose.model("Forget", forgetSchema);