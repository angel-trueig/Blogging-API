module.exports.Authentication = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

module.exports.Author = (req, res, next) => {
    if (req.session.user.role !== "author") {
        return res.status(403).json({ message: "Author access only" });
    }
    next();
};
