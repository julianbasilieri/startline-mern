const { check } = require('express-validator')
const Post = require('../../models/post')
const NotFoundError = require('../../errors/notFoundError')
const handleValidationErrors = require('../../utils/handleValidationErrors ')

const commentValidate = {}

commentValidate.validateNewComment = [
    check('content').trim().notEmpty().withMessage('content es necesario'),
    check('post').trim().notEmpty().withMessage('post es necesario').custom(async value => {
        const post = await Post.findById(value)
        if (!post) throw new NotFoundError('post')
    }),
    handleValidationErrors
]

commentValidate.validateUpdateComment = [
    check('content').trim().notEmpty().withMessage('content es necesario'),
    handleValidationErrors
]

module.exports = commentValidate