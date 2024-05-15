const { validationResult } = require('express-validator');
const OtherError = require('../errors/otherError');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        throw new OtherError(errorMessages.join(', '));
    }

    next();
};

module.exports = handleValidationErrors