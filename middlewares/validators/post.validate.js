const { check, validationResult } = require('express-validator')
const Post = require('../../models/post')

const postValidate = {}

postValidate.validateNewPost = [
    check('title').trim().notEmpty().withMessage('title es necesario').custom(async value => {
        const existingSubject = await Post.findOne({ title: value })
        if (existingSubject) throw new Error('title already in use')
    }),
    check('info').trim().notEmpty().withMessage('info es necesario'),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            throw new Error(errorMessages.join(', '))
        }

        next()
    }
]

postValidate.validateUpdatePost = [
    check('title').optional().trim().notEmpty().withMessage('title invalido').custom(async value => {
        const existingSubject = await Post.findOne({ title: value })
        if (existingSubject) throw new Error('title already in use')
    }),
    check('info').optional().trim().notEmpty().withMessage('info invalido'),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            throw new Error(errorMessages.join(', '))
        }

        next()
    }
]

module.exports = postValidate