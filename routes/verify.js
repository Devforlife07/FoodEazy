const User = require("../models/register");
const Router = require("express").Router();

Router.post("/", async (req, res) => {
    try {

        User.findOne({
            uid: req.body.code
        }, async (err, user) => {
            // console.log(user)
            if (err) {
                console.log(err);
                return res.status(404).send("Invalid Code")
            } else if (!user) {
                return res.status(401).send('Inavalid Code!');
            } else {
                if (user.verify) {
                    return res.status(401).send("<h1>You have already verified. Login in to continue.</h1>");

                } else {

                    try {
                        user.verify = true;
                        await user.save();
                        res.status(200).send("User Has Been Verified Successfully!");
                    } catch (er) {
                        console.log(er);
                        res.sendStatus(500)
                    }
                }
            }
        })
    } catch (e) {
        console.log(e)
    }

})


module.exports = Router;