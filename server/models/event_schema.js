const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        eventName: {
            type: String,
            required: [true, "name field is required"],
        },
        eventLocation: {
            type: String,
            default: null,
        },
        eventDescription: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = model("events", eventSchema);
