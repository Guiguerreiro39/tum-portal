"use strict";

const Rehearsal = require("../models/rehearsal_schema");
const User = require("../models/user_schema");

const createRehearsal = (req, res) => {
    Rehearsal.create(req.body)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const getRehearsal = (req, res) => {
    Rehearsal.findOne(req.query)
        .then((data) => {
            if (!data) {
                res.status(201).json({
                    error: "NotAvailable",
                });
            } else {
                res.status(201).json(data);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const getAllExtra = (req, res) => {
    Rehearsal.find({}).then((data) => {
        var array = data.filter((d) => {
            var date = new Date(d.date);
            return date.getDay() !== 2 && date.getDay() !== 4;
        });
        res.status(201).json({
            rehearsals: array.map((d) => d.date),
        });
    });
};

const updateRehearsal = async (req, res) => {
    var users = [];
    console.log(req.body.users);

    if (req.body.users.length > 0) {
        var mapToUsers = new Promise((resolve, reject) => {
            req.body.users.forEach(async (u, index, array) => {
                User.findOne({ _id: u.id })
                    .then((data) => {
                        users.push(data);
                        if (index === array.length - 1) resolve();
                    })
                    .catch((err) => {
                        res.status(404).json(err);
                        return;
                    });
            });
        });

        await mapToUsers;
    }

    Rehearsal.findByIdAndUpdate(
        req.params.id,
        { users: users },
        {
            useFindAndModify: false,
            new: true,
        }
    )
        .then((data) => {
            if (!data) {
                throw new Error("NotAvailable");
            }
            console.log("Rehearsal updated!");
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
};

const deleteRehearsal = (req, res) => {
    Rehearsal.findById(req.params.id)
        .then((data) => {
            if (!data) {
                throw new Error("NotAvailable");
            }
            return data.remove();
        })
        .then((data) => {
            console.log("Rehearsal removed!");
            res.status(200).json(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

module.exports = {
    createRehearsal,
    getRehearsal,
    getAllExtra,
    updateRehearsal,
    deleteRehearsal,
};
