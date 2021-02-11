const { Schema, model } = require("mongoose");
const { instruments } = require("../constants/basicInfo");

const guideSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name field is required"],
        },
        instrument: {
            type: String,
            enum: instruments,
            default: null,
        },
        video: {
            type: String,
            required: [true, "video url is required"],
        },
    },
    { timestamps: true }
);

module.exports = model("Guide", guideSchema);
