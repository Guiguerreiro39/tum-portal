const express = require("express");

const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
    logout,
} = require("../controllers/user_controller");

const router = express.Router();

router
    .post("/user/", createUser)
    .get("/user/", getUser)
    .put("/user/:id", updateUser)
    .delete("/user/:id", deleteUser)
    .post("/login/", login)
    .get("/logout/", logout);

module.exports = router;
