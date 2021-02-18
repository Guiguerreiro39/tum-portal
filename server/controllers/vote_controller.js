"use strict";

const Vote = require("../models/vote_schema");
const User = require("../models/user_schema");

const { sendVoteEmail } = require("../helpers/email/email");

const paginate = require("jw-paginate");

const createVote = (req, res) => {
    Vote.create(req.body)
        .then((data) => {
            sendVoteEmail({
                user: req.user.username,
                question: data.question,
            });
            res.status(201).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const getVote = (req, res) => {
    Vote.findById(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(201).json({
                    error: "NotAvailable",
                });
            }
            res.status(201).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const getAllVotes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = page === 1 ? 7 : 8;
    const totalItems = await Vote.countDocuments().exec();

    let pager;
    if (totalItems === 0) pager = paginate(1, page, limit);
    else
        pager = paginate(
            totalItems,
            page,
            page === 1 && totalItems > 8 ? limit + 1 : limit
        );

    Vote.find()
        .sort({ createdAt: "desc" })
        .limit(limit)
        .skip(pager.startIndex)
        .then((data) => {
            res.status(201).json({
                pager,
                data: data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const updateVote = async (req, res) => {
    var options = [];
    var duplicated = false;
    var now = new Date();

    var mapToOptions = new Promise((resolve, reject) => {
        Vote.findById(req.params.id)
            .then((data) => {
                User.findById(req.user.id)
                    .then((u) => {
                        if (new Date(data.date) >= now) {
                            options = data.options.map((option) => {
                                option.users.forEach((user) => {
                                    if (user._id == u.id) duplicated = true;
                                });

                                if (option.id === req.body.vote) {
                                    if (!duplicated) option.users.push(u);
                                    return option;
                                } else {
                                    return option;
                                }
                            });
                        }
                        resolve();
                    })
                    .catch((err) => {
                        console.log(err);
                        reject();
                    });
            })
            .catch((err) => {
                res.status(404).json(err);
                return;
            });
    });

    try {
        await mapToOptions;
    } catch (err) {
        res.status(404).json(err);
    }

    if (options.length > 0) {
        Vote.findByIdAndUpdate(
            req.params.id,
            { options: options },
            {
                useFindAndModify: false,
                new: true,
            }
        )
            .then((data) => {
                if (!data) {
                    throw new Error("NotAvailable");
                }
                console.log("Vote updated!");
                res.status(201).json(data);
            })
            .catch((err) => {
                if (err.name === "ValidationError") {
                    console.error("Error Validating!", err);
                    res.status(422).json(err);
                } else {
                    console.error(err);
                    res.status(500).json(err);
                }
            });
    }
};

const deleteVote = (req, res) => {
    Vote.findById(req.params.id)
        .then((data) => {
            if (!data) {
                throw new Error("NotAvailable");
            }
            return data.remove();
        })
        .then((data) => {
            console.log("Vote removed!");
            res.status(200).json(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

module.exports = {
    createVote,
    getVote,
    getAllVotes,
    updateVote,
    deleteVote,
};
