const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        default : 'Veg'
    },
    url: {
    	type:String,
    	required : true
    }

})
module.exports = mongoose.model("Products", productSchema)