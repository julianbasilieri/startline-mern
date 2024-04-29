const { Router } = require('express')
const { getAllPosts, getByTitle, addPost, deletePostById, updatePostById } = require('../controllers/post.controller')

const { verifyToken, isPostOwner } = require('../middlewares/authorization')
const { validateNewPost, validateUpdatePost } = require('../middlewares/validators/post.validate')

const router = Router()

router.route('/')
    .get(getAllPosts)
    .post([verifyToken, validateNewPost], addPost)

router.get('/:title', getByTitle)

router.route('/:id')
    .put([verifyToken, isPostOwner, validateUpdatePost], updatePostById)
    .delete([verifyToken, isPostOwner], deletePostById)

module.exports = router