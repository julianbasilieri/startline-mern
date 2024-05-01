const { Router } = require('express')
const { getAllComments, addComment, updateComment, deleteCommentById } = require('../controllers/comment.controller')

const { verifyToken, isCommentOwner } = require('../middlewares/authorization')
const { validateNewComment, validateUpdateComment } = require('../middlewares/validators/comment.validate')

const router = Router()
router.route('/')
    .get(getAllComments)
    .post([verifyToken, validateNewComment], addComment)

router.route('/:id')
    .put([verifyToken, isCommentOwner, validateUpdateComment], updateComment)
    .delete([verifyToken, isCommentOwner], deleteCommentById)

module.exports = router