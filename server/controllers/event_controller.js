"use strict";

const { eventExists } = require("../functions/event_functions");
const eventInfo = require("../constants/eventInfo");

const Event = require("../models/event_schema");

const createEvent = async (req, res) => {
    const eventName = req.body.eventName;
    const eventDate = req.body.eventDate;
    const eventLocation = req.body.eventLocation;
    const eventDescription = req.body.eventDescription;


    if (await eventExists(eventName)) {
        res.send("Event already exists!");
    } else {
        Event.create({
            eventName: eventName,
            eventDate: eventDate,
            eventLocation: eventLocation,
            eventDescription: eventDescription,
        })
            .then((data) => {
                console.log("New Event Created!", data);
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

const getEvent= (req, res) => {
    res.send(req.event);
};

const updateEvent = (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
        new: true,
    })
        .then((data) => {
            console.log("Event updated!");
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

const deleteEvent = (req, res) => {
    Event.findById(req.params.id)
        .then((data) => {
            if (!data) {
                throw new Error("Event not available");
            }
            return data.remove();
        })
        .then((data) => {
            console.log("Event removed!");
            res.status(200).json(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

const getAllEvents = (req, res) => {
    Event.find({})
        .then((data) => {
            var events = [];
            data.forEach((event) => {
                events.push(eventInfo(event));
            });
            res.status(201).json({
                events: events,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
};