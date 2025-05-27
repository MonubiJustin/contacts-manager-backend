const { times } = require('lodash');
const constants = require('../constants')


module.exports = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;


    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation Error", message: error.message, stackTrace: error.stack})
            break;
        case constants.NOT_FOUND:
            res.status(404).json({ title: "Not Found", message: error.message, stackTrace: error.stack });
            break;

        case constants.UNAUTHORIZED:
            res.status(401).json({ title: "Unauthorized", message: error.message, stackTrace: error.stack });
            break;

        case constants.FORBIDDEN:
            res.status(403).json({ title: "Forbidden", message: error.message, stackTrace: error.stack });
            break;

        case constants.SERVER_ERROR:
            res.status(500).json({ title: "Server Error", message: error.message, stackTrace: error.stack });
            break;
    
        default:
            res.status(statusCode).json({
                title: "Error",
                message: error.message || "An error occured",
                stackTrace: error.stack
            })
    }
};
