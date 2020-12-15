const express = require("express");

const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
} = require("../controllers/user_controller");

const {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
} = require("../controllers/event_controller");

const router = express.Router();

router
    .post("/user/", createUser)
    .get("/user/", getUser)
    .put("/user/:id", updateUser)
    .delete("/user/:id", deleteUser)
    .post("/login/", login);

router
    .post("/event/",createEvent)
    .get("/event/",getEvent)
    .put("/event/:id", updateEvent)
    .delete("/event/:id", deleteEvent)


module.exports = router;
