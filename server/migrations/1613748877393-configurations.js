const { User } = require("./index");

/**
 * Make any changes you need to make to the database here
 */
async function up() {
    await User.updateMany(
        {},
        {
            $set: {
                configurations: {
                    email: {
                        eventCreate: true,
                        voteCreate: true,
                        guideCreate: true,
                    },
                },
            },
        }
    );
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
    await User.update(
        {},
        {
            $unset: {
                configurations,
            },
        }
    );
}

module.exports = { up, down };
