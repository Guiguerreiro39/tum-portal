const express = require("express");
const upload = require("../middleware/upload_middleware");
const auth = require("../middleware/auth_middleware");

const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
    logout,
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
    .put("/user/:id", auth.isAuthenticated, auth.isPrivate, upload, updateUser)
    .delete("/user/:id", auth.isAuthenticated, auth.isPrivate, deleteUser)
    .post("/login/", login)
    .get("/logout/", auth.isAuthenticated, logout);


router
    .post("/event/",createEvent)
    .get("/event/",getEvent)
    .put("/event/:id", updateEvent)
    .delete("/event/:id", deleteEvent)


module.exports = router;
