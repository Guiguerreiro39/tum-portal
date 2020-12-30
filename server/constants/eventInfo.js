module.exports = function eventInformation(data) {
    return {
        id: data._id,
        eventName: data.eventName,
        eventLocation: data.eventLocation,
        eventDescription: data.eventDescription,
    };
};
