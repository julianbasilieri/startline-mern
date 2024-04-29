const { check, validationResult } = require('express-validator')
const Subject = require('../../models/subject')
const OtherError = require('../../errors/otherError')
const UniqueError = require('../../errors/uniqueError')

const subjectValidate = {}

subjectValidate.validateNewSubject = [
    check('name').trim().notEmpty().withMessage('name es necesario').custom(async value => {
        const existingSubject = await Subject.findOne({ name: value })
        if (existingSubject) throw new UniqueError(`name ${value}`)
    }),
    check('info').trim().notEmpty().withMessage('info es necesario'),
    check('color').optional().trim().notEmpty().isHexColor().withMessage('color debe ser hexadecimal'),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            throw new OtherError(errorMessages.join(', '))
        }

        next()
    }
]

subjectValidate.validateUpdateSubject = [
    check('name').optional().trim().notEmpty().withMessage('name es necesario').custom(async value => {
        const existingSubject = await Subject.findOne({ name: value })
        if (existingSubject) throw new UniqueError(`name ${value}`)
    }),
    check('info').optional().trim().notEmpty().withMessage('info es necesario'),
    check('color').optional().trim().notEmpty().isHexColor().withMessage('color debe ser hexadecimal'),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            throw new OtherError(errorMessages.join(', '))
        }

        next()
    }
]

module.exports = subjectValidate