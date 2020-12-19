"use strict";

const { userExists } = require("../functions/user_functions");

const User = require("../models/user_schema");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
    const username = req.body.username;
    const fullName = req.body.fullName;
    const password = await bcrypt.hash(req.body.password, 10);
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
    res.send({ user: req.user });
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

const login = (req, res, next) => {
    passport.authenticate("local", (err, user, _) => {
        if (err) throw err;
        if (!user) res.send("User doesn't exist!");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send({
                    user: {
                        username: user.username,
                        fullName: user.fullName,
                    },
                });
            });
        }
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout();
    res.send("Logout completed!");
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
    logout,
};
