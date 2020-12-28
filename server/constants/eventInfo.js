module.exports = function eventInformation(data) {
    return {
        id: data._id,
        eventName: data.eventName,
        eventLocation: data.eventLocation,
        eventDescription: data.eventDescription,
        voice: data.voice,
        instrument: data.instrument,
        contact: data.contact,
        email: data.email,
        residence: data.residence,
    };
};
