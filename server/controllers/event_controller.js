"use strict";

const { eventExists } = require("../functions/event_functions");

const User = require("../models/event_schema");

const createEvent = async (req, res) => {
    const username = req.body.username;
    const fullName = req.body.fullName;
    const email = req.body.email;

    if (await userExists(username)) {
        res.send("User already exists!");
    } else {
        User.create({
            username: username,
            password: password,
            email: email,
            fullName: fullName,
        })
            .then((data) => {
                console.log("New User Created!", data);
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

const getUser = (req, res) => {
    res.send(req.user);
};

const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
        new: true,
    })
        .then((data) => {
            console.log("User updated!");
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

const deleteUser = (req, res) => {
    User.findById(req.params.id)
        .then((data) => {
            if (!data) {
                throw new Error("User not available");
            }
            return data.remove();
        })
        .then((data) => {
            console.log("User removed!");
            res.status(200).json(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};