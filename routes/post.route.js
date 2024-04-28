const { Router } = require("express")
const { getAllPosts, getByTitle, addPost, deletePostById, updatePostById } = require("../controllers/post.controller")

const { verifyToken, isOwner } = require("../middlewares/authorization")
const { validateNewPost, validateUpdatePost } = require('../middlewares/validators/post.validate')

const router = Router()

router.route("/")
    .get(getAllPosts)
    .post([verifyToken, validateNewPost], addPost)

router.get("/:title", getByTitle)

router.route("/:id")
    .delete([verifyToken, isOwner], deletePostById)
    .put([verifyToken, isOwner, validateUpdatePost], updatePostById)

module.exports = router