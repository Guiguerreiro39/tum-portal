const mongoose = require("mongoose");

const init = () => {
    let conn = mongoose.connection;

    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => {
            console.error("error: " + err.stack);
            process.exit(1);
        });

    conn.on("open", () => {
        console.log("connected to database");
    });
};

mongoose.Promise = global.Promise;

module.exports = init;
