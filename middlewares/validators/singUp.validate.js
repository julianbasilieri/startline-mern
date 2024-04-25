const { check, validationResult } = require('express-validator')
const User = require('../../models/user')

const validateNewUser = () => {
    return [
        check('firstname').trim().notEmpty(),
        check('middlename').optional().trim().notEmpty(),
        check('lastname').trim().notEmpty(),
        check('username').trim().notEmpty().isLength({ max: 20 }).custom(async value => {
            const existingUser = await User.findOne({ username: value })
            if (existingUser) throw new Error('Username already in use')
        }),
        check('email').trim().isEmail().custom(async value => {
            const existingUser = await User.findOne({ username: value })
            if (existingUser) throw new Error('E-mail already in use')
        }),
        check('password').notEmpty(),
        (req, res, next) => {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                return next(new Error(errorMessages.join(', ')));
            }

            next()
        }
    ]
}

module.exports = validateNewUser
