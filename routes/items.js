const Router = require("express").Router();
const Product = require("../models/product");
Router.get('/', async (req, res) => {
    Product.find({}, (err, items) => {
        if (err)
            res.status(400).send(err);

        res.status(200).send(items);

    })
})
module.exports = Router;