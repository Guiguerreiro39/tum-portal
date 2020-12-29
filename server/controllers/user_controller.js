"use strict";

const { userExists } = require("../functions/user_functions");
const userInfo = require("../constants/userInfo");

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
            .then(async (data) => {
                console.log("New User Created!");
                res.status(201).json({
                    user: userInfo(data),
                });
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

const getAll = (req, res) => {
    User.find({})
        .then((data) => {
            var users = [];
            data.forEach((user) => {
                users.push(userInfo(user));
            });
            res.status(201).json({
                users: users,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const updateUser = (req, res) => {
    let user;
    if (req.file) {
        user = {
            ...req.body,
            profileImage: req.file.path,
        };
    } else {
        user = req.body;
    }

    User.findByIdAndUpdate(req.params.id, user, {
        useFindAndModify: false,
        new: true,
    })
        .then((data) => {
            console.log("User updated!");
            res.status(201).json({
                user: userInfo(data),
            });
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
        if (!user)
            res.send({
                success: false,
            });
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send({
                    success: true,
                    user: userInfo(user),
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
    getAll,
    updateUser,
    deleteUser,
    login,
    logout,
};
