const express = require("express");
const upload = require("../middleware/upload_middleware");
const auth = require("../middleware/auth_middleware");

const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    login,
    logout,
} = require("../controllers/user_controller");

const {
    createRehearsal,
    getRehearsal,
    getAllExtra,
    updateRehearsal,
    deleteRehearsal,
} = require("../controllers/rehearsal_controller");

const {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
} = require("../controllers/event_controller");

const {
    createVote,
    getVote,
    updateVote,
    deleteVote,
    getAllVotes,
} = require("../controllers/vote_controller");

const router = express.Router();

router
    .post("/user/", createUser)
    .get("/user/", getUser)
    .get("/users/", auth.isAuthenticated, getAllUsers)
    .put("/user/:id", auth.isAuthenticated, auth.isPrivate, upload, updateUser)
    .delete("/user/:id", auth.isAuthenticated, auth.isPrivate, deleteUser)
    .post("/login/", login)
    .get("/logout/", auth.isAuthenticated, logout);

router
    .post("/rehearsal/", auth.isAuthenticated, createRehearsal)
    .get("/rehearsal/", auth.isAuthenticated, getRehearsal)
    .get("/rehearsal/extra", auth.isAuthenticated, getAllExtra)
    .put("/rehearsal/:id", auth.isAuthenticated, updateRehearsal)
    .delete("/rehearsal/:id", auth.isAuthenticated, deleteRehearsal);

router
    .post("/event/", auth.isAuthenticated, createEvent)
    .get("/event/", auth.isAuthenticated, getEvent)
    .get("/events/", auth.isAuthenticated, getAllEvents)
    .put("/event/:id", auth.isAuthenticated, updateEvent)
    .delete("/event/:id", auth.isAuthenticated, deleteEvent);

router
    .post("/vote/", auth.isAuthenticated, createVote)
    .get("/vote/", auth.isAuthenticated, getAllVotes)
    .get("/vote/:id", auth.isAuthenticated, getVote)
    .put("/vote/:id", auth.isAuthenticated, updateVote)
    .delete("/vote/:id", auth.isAuthenticated, deleteVote);

module.exports = router;
