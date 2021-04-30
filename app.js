const express = require("express");
// var registrationSchema = require("./models/Registration")
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});
// const requests = mongoose.model("registrations");
const passport = require("passport");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use(express.static("public"));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());//
// module.exports = User = mongoose.model('registrations', 'registrationSchema');

module.exports = app;