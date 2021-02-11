const Guide = require("../models/guide_schema");

const { format } = require("util");
const paginate = require("jw-paginate");

const createGuide = async (req, res) => {
    if (req.file) {
        const file = req.file;
        const name = req.body.name.toLowerCase();
        const instrument = req.body.instrument;
        const type = file.mimetype.split("/");

        const guide = await Guide.findOne({
            name: name,
            instrument: instrument,
        });

        if (guide) {
            res.status(500).json("That guide already exists!");
            return;
        }

        const bucket = req.app
            .get("storage")
            .bucket(process.env.GOOGLE_CLOUD_BUCKET);

        const blob = bucket.file(
            `${process.env.GOOGLE_CLOUD_GUIAS_FOLDER}/${instrument}/${name}.${type[1]}`
        );

        const buffer = file.buffer;

        const blobStream = blob.createWriteStream({
            resumable: true,
        });

        blobStream
            .on("error", (err) => {
                console.log(err);
                res.status(500).json("Failed to upload file!");
            })
            .on("finish", () => {
                const publicUrl = format(
                    `${process.env.STORAGE_URL}/${bucket.name}/${blob.name}`
                );

                Guide.create({
                    name: name,
                    video: publicUrl,
                    instrument: instrument,
                })
                    .then((data) => {
                        res.status(201).json(data);
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
            })
            .end(buffer);
    } else {
        res.status(500).json("No file uploaded!");
    }
};

const getAllGuides = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const guides = await Guide.find({
            instrument: req.params.instrument,
        }).sort({ createdAt: "desc" });
        const totalItems = guides.length;

        let pager;
        if (totalItems === 0) pager = paginate(1, page, limit);
        else pager = paginate(totalItems, page, limit);

        res.status(201).json({
            pager,
            data: guides.slice(pager.startIndex, pager.startIndex + limit),
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    createGuide,
    getAllGuides,
};
