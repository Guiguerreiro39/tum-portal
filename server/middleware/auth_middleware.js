const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).json({
        error: "User not authenticated!",
    });
};

const isPrivate = (req, res, next) => {
    if (req.user.id == req.params.id) {
        return next();
    }

    res.status(401).json({
        error: "You are not allowed to access this url",
    });
};

module.exports = {
    isAuthenticated,
    isPrivate,
};
