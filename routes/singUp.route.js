const { Router } = require('express')
const router = Router()

const { postNewUser } = require('../controllers/singUp.controller')

router.route('/')
    .post(postNewUser)

module.exports = router