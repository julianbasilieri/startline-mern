const { Router } = require('express')
const router = Router()

const { postNewUser } = require('../controllers/auth.controller')

router.post('/sign-up', postNewUser)

module.exports = router