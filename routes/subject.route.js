const { Router } = require("express")

const router = Router()

const {  getAllSubjects,  postSubject,  deleteById,  updateById} = require("../controllers/subject.controller")
const { verifyToken, isAdmin } = require("../middlewares/authorization")

router.route("/")
    .get(getAllSubjects)
    .post([verifyToken, isAdmin], postSubject)
router.route("/:id", [verifyToken, isAdmin])
    .delete(deleteById)
    .put(updateById)

module.exports = router