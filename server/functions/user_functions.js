const imagemin = require("imagemin");
const sharp = require("sharp");
const mozjpeg = require("imagemin-mozjpeg");
const isJpg = require("is-jpg");

const User = require("../models/user_schema");

const userExists = async (username) => {
    var result = false;
    await User.findOne(
        {
            username: username,
        },
        (err, user) => {
            if (err) throw err;

            if (user) {
                result = true;
            }
        }
    );

    return result;
};

const convertToJpg = (buffer) => {
    if (isJpg(buffer)) return buffer;

    return sharp(buffer).jpeg().toBuffer();
};

const minBuffer = async (buffer) => {
    const file = await imagemin.buffer(buffer, {
        plugins: [convertToJpg, mozjpeg({ quality: 40 })],
    });

    return file;
};

module.exports = {
    userExists,
    minBuffer,
};
