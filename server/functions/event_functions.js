const Event = require("../models/event_schema");

module.exports = {
    async eventExists(eventName) {
        var result = false;
        await Event.findOne(
            {
                eventName: eventName,
            },
            (err, event) => {
                if (err) throw err;

                if (event) {
                    result = true;
                }
            }
        );

        return result;
    },
};
