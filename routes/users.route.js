const { Router } = require('express')
const router = Router()

const { getAllUsers, getUsersByUsername, updateById, deleteById } = require('../controllers/user.controller')

router.get('/', getAllUsers)

router.get('/:username', getUsersByUsername)

router.route('/:id')
    .put(updateById)
    .delete(deleteById)

module.exports = router
