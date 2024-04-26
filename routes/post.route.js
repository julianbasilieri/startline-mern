const { Router } = require("express")
const {getAllPosts,  getByTitle,  addPost,  deletePostById,  updatePostById} = require("../controllers/post.controller")

const { verifyToken, isOwner } = require("../middlewares/authorization")

const router = Router()

router.route("/")
    .get(getAllPosts)
    .post(verifyToken, addPost)

router.get("/:title", getByTitle)

router.route("/:id")
    .delete([verifyToken, isOwner], deletePostById)
    .put([verifyToken, isOwner], updatePostById)

module.exports = router