const { check, validationResult } = require('express-validator');

const validateNewUser = () => {
    return [
        check('firstname').trim().notEmpty(),
        check('middlename').optional().trim().notEmpty(),
        check('lastname').trim().notEmpty(),
        check('username').trim().notEmpty().isLength({ max: 20 }),
        check('email').trim().isEmail(),
        check('password').notEmpty(),
        check('roles').optional().isArray(),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return next(new Error('Campos invalidos'))

            next();
        }
    ];
};

module.exports = validateNewUser;
