const { Schema, model } = require("mongoose");

const optionSchema = new Schema({
    text: {
        type: String,
        required: [true, "text field is required"],
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const voteSchema = new Schema(
    {
        question: {
            type: String,
            required: [true, "question field is required"],
        },
        date: {
            type: Date,
            required: [true, "date field is required"],
        },
        options: [optionSchema],
    },
    { timestamps: true }
);

module.exports = model("Vote", voteSchema);
