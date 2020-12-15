const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "name field is required"],
        },
        fullName: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "password field is required"],
        },
        email: {
            type: String,
            required: [true, "email field is required"],
        },
        //add
    },
    { timestamps: true }
);

module.exports = model("users", userSchema);
