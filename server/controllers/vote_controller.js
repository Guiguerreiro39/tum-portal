"use strict";

const Vote = require("../models/vote_schema");
const User = require("../models/user_schema");

const createVote = (req, res) => {
    Vote.create(req.body)
        .then((data) => {
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

const getAllVotes = (req, res) => {
    Vote.find({})
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const updateVote = async (req, res) => {
    var options = [];
    var duplicated = false;

    var mapToOptions = new Promise((resolve, reject) => {
        Vote.findById(req.params.id)
            .then((data) => {
                User.findById(req.user.id)
                    .then((u) => {
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
