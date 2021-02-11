const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads/");
//     },
//     filename: function (req, file, cb) {
//         if (req.user) {
//             cb(null, req.user.id + "." + file.mimetype.split("image/")[1]);
//         } else {
//             cb("Authentication failed!", null);
//         }
//     },
// });

const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb("Wrong file type!", null);
    }
};

const videoFilter = (req, file, cb) => {
    const types = ["video/x-msvideo", "video/mpeg", "video/webm", "video/mp4"];
    if (types.indexOf(file.mimetype) !== -1) {
        cb(null, true);
    } else {
        cb("Wrong file type!", null);
    }
};

const uploadImage = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: imageFilter,
});

const uploadVideo = multer({
    storage: multer.memoryStorage(),
    fileFilter: videoFilter,
});

module.exports = {
    uploadImage: uploadImage.single("image"),
    uploadVideo: uploadVideo.single("video"),
};
