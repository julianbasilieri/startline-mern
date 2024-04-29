const { check, validationResult } = require('express-validator')
const Post = require('../../models/post')
const Subject = require('../../models/subject')
const UniqueError = require('../../errors/uniqueError')
const OtherError = require('../../errors/otherError')
const NotFoundError = require('../../errors/notFoundError')

const postValidate = {}

postValidate.validateNewPost = [
    check('title').trim().notEmpty().withMessage('title es necesario').custom(async value => {
        const existingPost = await Post.findOne({ title: value })
        if (existingPost) throw new UniqueError(`title ${value}`)
    }),
    check('info').trim().notEmpty().withMessage('info es necesario'),
    check('subject').trim().notEmpty().withMessage('subject es necesario').custom(async value => {
        const subject = await Subject.findById(value)
        if (!subject) throw new NotFoundError('subject')
    }),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            throw new OtherError(errorMessages.join(', '))
        }

        next()
    }
]

postValidate.validateUpdatePost = [
    check('title').optional().trim().notEmpty().withMessage('title invalido').custom(async value => {
        const existingSubject = await Post.findOne({ title: value })
        if (existingSubject) throw new UniqueError(`title ${value}`)
    }),
    check('info').optional().trim().notEmpty().withMessage('info invalido'),
    check('subject').optional().trim().notEmpty().withMessage('subject es necesario').custom(async value => {
        const subject = await Subject.findById(value)
        if (!subject) throw new NotFoundError('subject')
    }),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            throw new OtherError(errorMessages.join(', '))
        }

        next()
    }
]

module.exports = postValidate