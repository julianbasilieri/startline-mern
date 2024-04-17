const { Router } = require('express')
const router = Router()

const { getAllUsers, getUsersByUsername } = require('../controllers/getUser.controller')

router.route('/')
    .get(getAllUsers)

router.route('/:username')
    .get(getUsersByUsername)

module.exports = router
