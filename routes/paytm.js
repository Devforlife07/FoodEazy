const Router = require("express").Router();
const qs = require("query-string");
const crypto = require("crypto");
const Order = require("../models/orders");
const Users = require("../models/register");
const https = require("https");
const checksum_lib = require("../paytm/checksum");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
var CronJob = require("cron").CronJob;
const shortid = require("shortid");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID_KEY,
    },
  })
);

Router.post("/", auth, async (req, res) => {
  console.log(process.env.SEND_GRID_KEY)
  let params = {};
  let order_id = crypto.randomBytes(16).toString("hex");
  (params["MID"] = process.env.MERCHANT_ID),
  (params["WEBSITE"] = "WEBSTAGING"),
  (params["CHANNEL_ID"] = "WEB"),
  ((params["ORDER_ID"] = order_id.toString()),
    (params["CUST_ID"] = req.user.id.toString()),
    (params["INDUSTRY_TYPE_ID"] = "Retail"),
    (params["TXN_AMOUNT"] = req.body.txn_amount.toString()),
    (params["CALLBACK_URL"] = "https://foodeazy.herokuapp.com/api/paytm/success"),
    (params["EMAIL"] = req.body.user.email.toString()),
    (params["MOBILE_NO"] = req.body.user.number.toString()));

  order = new Order({
    user: req.user.id,
    order_id: order_id,
    mode: req.body.value,
    order: req.body.cart,
    deliveryCharges: req.body.deliveryCharges,
    address: req.body.address,
    payment: req.body.payment,
  });
  try {
    await order.save();

  } catch (e) {
    return res.sendStatus(500)
    console.log(e);
  }
  checksum_lib.genchecksum(params, process.env.MERCHANT_API_KEY, (err, checksum) => {
    let txn_url = "https://securegw-stage.paytm.in/order/process";
    let form_fields = "";
    for (x in params) {
      form_fields +=
        "<input type='hidden' name='" + x + "' value='" + params[x] + "' />";
    }
    form_fields +=
      "<input type='hidden' name='CHECKSUMHASH' value=" + checksum + " />";
    var html =
      "<html><body><center><h1>Please Do Not Refresh The Page</h1></center><form method='POST' action='" +
      txn_url +
      "' name='f1'>" +
      form_fields +
      "</form><script type='text/javascript'>document.f1.submit()</script></body></html>";
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(html);
    res.end();
  });
});
Router.post("/success", async (req, res) => {
  let body = req.body;
  let y = body
  console.log(req.body)
  let id = y.ORDERID;
  if (y.RESPCODE !== "01") {
    await Order.deleteOne({
      order_id: id,
    });
    res.redirect("https://foodeazy.herokuapp.com/fail");

  } else {
    let order = await Order.findOne({
      order_id: id,
    })
    let user = await Users.findById(order.user)
    var job = new CronJob(
      "*/15 * * * *",
      async () => {
          try {
            const update = {
              status: true
            };
            await Order.findOneAndUpdate({
              order_id: id
            }, update)
          } catch (e) {
            console.log(e);
          }
        },
        null,
        true,
        "America/Los_Angeles"
    );
    job.start();
    let email = user.email;
    let name = user.name;
    let user_id = order.user;
    var mailOptions = {
      from: "mailfoodeazy@gmail.com",
      to: `${email}`,
      subject: "Order Confirmation",
      text: "That was easy!",
      html: "Hi, <strong>" + name + "</strong><h2>Order Successfully Placed!</h2><h3><p>Thank you for ordering from Food Eazy</h3> Your order id: " + id + "</p><p style='text-align: left;'>Regards, Food Eazy</>",
    };
    await transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
      } else {
        let update = {
          cart: {},
        };
        await Users.findOneAndUpdate({
            _id: user_id,
          },
          update
        );
        res.redirect("https://foodeazy.herokuapp.com/success?orderid=" + body.ORDERID)
      }
    });

  }


})

module.exports = Router;