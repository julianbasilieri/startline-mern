const { Router } = require('express')
const router = Router()

const { getAllUsers, getUserByUsername } = require('../controllers/getUser.controller')

router.route('/')
    .get(getAllUsers)

router.route('/:username')
    .get(getUserByUsername)

module.exports = router
