const User = require("../models/user_schema");

module.exports = {
    async userExists(username) {
        var result = false;
        await User.findOne(
            {
                username: username,
            },
            (err, user) => {
                if (err) throw err;

                if (user) {
                    result = true;
                }
            }
        );

        return result;
    },
};
