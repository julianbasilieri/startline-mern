const { Router } = require('express')
const router = Router()

const { signUp, logIn } = require('../controllers/auth.controller')
const validateNewUser = require('../middlewares/validators/singUp.validate')
const validateLogIn = require('../middlewares/validators/logIn.validate')

router.post('/sign-up', validateNewUser(), signUp)
router.post('/log-in', validateLogIn(), logIn)

module.exports = router