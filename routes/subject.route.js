const { Router } = require("express")

const router = Router()

const { getAllSubjects, postSubject, deleteById, updateById } = require("../controllers/subject.controller")
const { verifyToken, isAdmin } = require("../middlewares/authorization")
const { validateNewSubject, validateUpdateSubject } = require('../middlewares/validators/subject.validate')

router.route("/")
    .get(getAllSubjects)
    .post([verifyToken, isAdmin, validateNewSubject], postSubject)

router.route("/:id", [verifyToken, isAdmin])
    .delete([verifyToken, isAdmin], deleteById)
    .put([verifyToken, isAdmin, validateUpdateSubject], updateById)

module.exports = router