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
        voice: {
            type: String,
            enum: ["alto", "médios-alto", "médio-baixo", "baixo", null],
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
            enum: [
                "guitarra",
                "cavaquinho",
                "bandolim",
                "braguesa",
                "estandarte",
                "pandeireta",
                "percussão",
                "trompete",
                "clarinete",
                "violino",
                "flauta",
                "saxofone",
                "contrabaixo",
                "acordeão",
                null,
            ],
            default: null,
        },
        profileImage: {
            type: String,
            default: "uploads/default.jpg",
        },
    },
    { timestamps: true }
);

module.exports = model("users", userSchema);
