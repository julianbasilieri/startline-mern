const { check } = require('express-validator')
const User = require('../../models/user')
const UniqueError = require('../../errors/uniqueError')
const handleValidationErrors = require('../../utils/handleValidationErrors ')

const userValidate = {}

userValidate.validateNewUser = [
    check('firstname').trim().notEmpty().withMessage('firstname es necesario'),
    check('middlename').optional().trim(),
    check('lastname').trim().notEmpty().withMessage('lastname es necesario'),
    check('username').trim().notEmpty().withMessage('username es necesario').isLength({ max: 20 }).custom(async value => {
        const existingUser = await User.findOne({ username: value })
        if (existingUser) throw new UniqueError(`username ${value}`)
    }),
    check('email').trim().isEmail().withMessage('email es necesario').custom(async value => {
        const existingUser = await User.findOne({ username: value })
        if (existingUser) throw new UniqueError(`email ${value}`)
    }),
    check('password').notEmpty().withMessage('password es necesaria'),
    handleValidationErrors
]

userValidate.validateLogIn = [
    check('email').trim().isEmail().withMessage('El email es obligatorio'),
    check('password').notEmpty().withMessage('La contraseña es obligatoria'),
    handleValidationErrors
]

userValidate.validateUpdateUser = [
    check('firstname').optional().trim().notEmpty().withMessage('firstname invalida'),
    check('middlename').optional().trim(),
    check('lastname').optional().trim().notEmpty().withMessage('lastname invalida'),
    check('birthdate').optional().trim().isISO8601('yyyy-mm-dd').withMessage('birthdate invalida'),
    check('photo').optional().trim().notEmpty().isURL().withMessage('photo invalida'),
    check('university').optional().trim(),
    check('info').optional().trim(),
    handleValidationErrors
]

module.exports = userValidate