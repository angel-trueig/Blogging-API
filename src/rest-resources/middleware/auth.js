module.exports.Authentication = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
};

module.exports.Author = (req, res, next) => {
    if (req.session.user.role !== "author") {
        return res.status(403).send("Author access only");
    }
    next();
};
