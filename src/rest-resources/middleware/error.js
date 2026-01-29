module.exports = (err, req, res, next) => {
    console.error(err);

    if (err.message === "FORBIDDEN") {
        return res.status(403).json({ message: "YOU ARE NOT ALLOWED !!!" });
    }
    if (err.message === "INVALID_CREDENTIALS") {
        return res.status(401).json({ message: "WRONG PASSWORD!!!" });
    }
    if (err.message === "USER_ALREADY_EXISTS") {
        return res.status(409).json({
            message: "USER ALREADY EXISTS"
        });
    }


    res.status(500).json({
        message: "ERROR"
    });
};
