import logger from "../../libs/logger.js";

export default (err, req, res, next) => {
    logger.error(err);
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
};
