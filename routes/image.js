const Router = require("express").Router();
const fs = require("fs");

Router.get("/:id", (req, res) => {
    const file = fs.readFile("./images/" + req.params.id, (err, file) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        } else {
            console.log(file);
            res.send(file);
        }
    })
})
module.exports = Router;