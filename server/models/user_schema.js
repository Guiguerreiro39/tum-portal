const { Schema, model } = require("mongoose");
const { instruments, voices } = require("../constants/basicInfo");

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
        voice: {
            type: String,
            enum: voices,
            default: null,
        },
        contact: {
            type: String,
            default: null,
        },
        residence: {
            type: String,
            default: null,
        },
        instrument: {
            type: String,
            enum: instruments,
            default: null,
        },
        profileImage: {
            type: String,
            default: `${process.env.STORAGE_URL}/${process.env.GOOGLE_CLOUD_BUCKET}/${process.env.GOOGLE_CLOUD_PROFILE_IMAGE_FOLDER}/default.jpg`,
        },
        rehearsals: {
            type: Number,
            default: 0,
        },
        events: {
            type: Number,
            default: 0,
        },
        configurations: {
            email: {
                eventCreate: {
                    type: Boolean,
                    default: true,
                },
                voteCreate: {
                    type: Boolean,
                    default: true,
                },
                guideCreate: {
                    type: Boolean,
                    default: true,
                },
            },
        },
    },
    { timestamps: true }
);

module.exports = model("User", userSchema);
