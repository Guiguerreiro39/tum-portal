module.exports = function eventInformation(data) {
    return {
        id: data._id,
        eventName: data.eventName,
        eventDate: data.eventDate,
        eventLocation: data.eventLocation,
        eventDescription: data.eventDescription,
    };
};
