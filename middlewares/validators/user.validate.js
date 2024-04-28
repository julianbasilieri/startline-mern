const { check, validationResult } = require('express-validator')
const User = require('../../models/user')

const userValidate = {}

userValidate.validateNewUser = [
    check('firstname').trim().notEmpty().withMessage('firstname es necesario'),
    check('middlename').optional().trim().notEmpty().withMessage('middlename es necesario'),
    check('lastname').trim().notEmpty().withMessage('lastname es necesario'),
    check('username').trim().notEmpty().withMessage('username es necesario').isLength({ max: 20 }).custom(async value => {
        const existingUser = await User.findOne({ username: value })
        if (existingUser) throw new Error('Username already in use')
    }),
    check('email').trim().isEmail().withMessage('email es necesario').custom(async value => {
        const existingUser = await User.findOne({ username: value })
        if (existingUser) throw new Error('E-mail already in use')
    }),
    check('password').notEmpty().withMessage('password es necesaria'),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            throw new Error(errorMessages.join(', '))
        }

        next()
    }
]

userValidate.validateLogIn = [
    check('email').trim().isEmail().withMessage('El email es obligatorio'),
    check('password').notEmpty().withMessage('La contraseña es obligatoria'),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            throw new Error(errorMessages.join(', '))
        }

        next()
    }
]

userValidate.validateUpdateUser = [
    check('firstname').optional().trim().notEmpty().withMessage('firstname invalida'),
    check('middlename').optional().trim().notEmpty().withMessage('middlename invalida'),
    check('lastname').optional().trim().notEmpty().withMessage('lastname invalida'),
    check('birthdate').optional().trim().isDate().withMessage('birthdate invalida'),
    check('photo').optional().trim().notEmpty().isURL().withMessage('photo invalida'),
    check('university').optional().trim().notEmpty().withMessage('university invalida'),
    check('extra_info').optional().trim().notEmpty().withMessage('extra_info invalida'),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            throw new Error(errorMessages.join(', '))
        }

        next()
    }
]

module.exports = userValidate