const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name field is required"],
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = model("events", eventSchema);
