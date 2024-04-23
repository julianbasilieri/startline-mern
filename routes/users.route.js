const { Router } = require('express')
const router = Router()

const { getAllUsers, getUsersByUsername, updateById, deleteById } = require('../controllers/user.controller')
const { verifyToken, isAdmin } = require('../middlewares/authorization');

router.get('/', getAllUsers)

router.get('/:username', getUsersByUsername)

router.route('/:id')
    .put([verifyToken, isAdmin], updateById)
    .delete([verifyToken, isAdmin], deleteById)

module.exports = router
