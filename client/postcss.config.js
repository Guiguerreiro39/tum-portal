const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const preset = require("postcss-preset-env")({ stage: 0 });

module.exports = {
    plugins: [preset, tailwindcss, autoprefixer],
};
