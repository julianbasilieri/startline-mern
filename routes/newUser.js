const { Router } = require('express')
const router = Router()

const { postNewUser } = require('../controllers/newUser.controller')

router.route('/')
    .post(postNewUser)

module.exports = router