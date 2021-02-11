const path = require("path");

const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
    keyFilename: path.join(__dirname, `./${process.env.GOOGLE_CLOUD_FILENAME}`),
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

module.exports = {
    storage,
};
