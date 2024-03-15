const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "User"
        },

        profilePicture: {
            type: String,
        },
    },

    { timestamps: true }
);

module.exports = mongoose.model("users", Userschema);
