const { Router } = require('express')
const router = Router()

const { signUp, logIn } = require('../controllers/auth.controller')
const { validateNewUser, validateLogIn } = require('../middlewares/validators/user.validate')

router.post('/sign-up', validateNewUser, signUp)
router.post('/log-in', validateLogIn, logIn)

module.exports = router