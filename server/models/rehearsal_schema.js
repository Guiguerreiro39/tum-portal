const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

module.exports = model("Rehearsal", userSchema);
