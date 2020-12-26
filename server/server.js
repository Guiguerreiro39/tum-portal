// Importing required modules
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// parse env variables
require("dotenv").config();

require("./helpers/db/mongodb.js")();

// Configuring port
const port = process.env.PORT || 9000;

const app = express();

app.use("/api/uploads", express.static("uploads"));

// Configure middlewares
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_ORIGIN,
    })
);
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./passportConfig")(passport);

app.set("view engine", "html");

// Static folder
app.use(express.static(__dirname + "/views/"));

// Defining route middleware
app.use("/api", require("./routes/api"));

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

global.passport = passport;

module.exports = app;
