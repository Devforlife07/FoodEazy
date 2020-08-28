const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
connectDB();

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(morgan(" :method :url :req[header] - :res[header]"));
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/cart", cors(), require("./routes/cart"));
app.use("/api/orders", cors(), require("./routes/order"));
app.use("/api/verify", require("./routes/verify"));
app.use("/api/forget", require("./routes/forget"));
app.use("/api/reset", require("./routes/reset"));
app.use("/api/resend", require('./routes/resendCode'));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/items", require("./routes/items"));
app.use("/api/paytm", require("./routes/paytm"));
app.use("/api/get_orders", require("./routes/orders"));

app.use(express.static(path.join(__dirname, '/build/')))

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});