const { Router } = require('express')
const router = Router()

const { signUp, logIn } = require('../controllers/auth.controller')

router.post('/sign-up', signUp)
router.post('/log-in', logIn)

module.exports = router