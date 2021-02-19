const mongoose = require("mongoose");
const User = require("../models/user_schema");

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { User };
