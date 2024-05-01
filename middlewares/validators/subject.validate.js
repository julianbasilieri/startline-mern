const { check } = require('express-validator')
const Subject = require('../../models/subject')
const OtherError = require('../../errors/otherError')
const UniqueError = require('../../errors/uniqueError')
const handleValidationErrors = require('../../utils/handleValidationErrors ')

const subjectValidate = {}

subjectValidate.validateNewSubject = [
    check('name').trim().notEmpty().withMessage('name es necesario').custom(async value => {
        const existingSubject = await Subject.findOne({ name: value })
        if (existingSubject) throw new UniqueError(`name ${value}`)
    }),
    check('info').trim().notEmpty().withMessage('info es necesario'),
    check('color').optional().trim().notEmpty().isHexColor().withMessage('color debe ser hexadecimal'),
    handleValidationErrors
]

subjectValidate.validateUpdateSubject = [
    check('name').optional().trim().notEmpty().withMessage('name es necesario').custom(async value => {
        const existingSubject = await Subject.findOne({ name: value })
        if (existingSubject) throw new UniqueError(`name ${value}`)
    }),
    check('info').optional().trim().notEmpty().withMessage('info es necesario'),
    check('color').optional().trim().notEmpty().isHexColor().withMessage('color debe ser hexadecimal'),
    handleValidationErrors
]

module.exports = subjectValidate