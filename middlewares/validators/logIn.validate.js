const { check, validationResult } = require('express-validator')

const validateLogIn = () => {
    return [
        check('email').trim().isEmail().withMessage('El email no es válido'),
        check('password').notEmpty().withMessage('La contraseña es obligatoria'),
        (req, res, next) => {
            const errors = validationResult(req)

            if (!errors.isEmpty()) return next(new Error('Campos invalidos'))

            next()
        }
    ]
}

module.exports = validateLogIn
