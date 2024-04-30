const { Router } = require('express')
const router = Router()

const { signUp, logIn, forgetPassword, changePassword } = require('../controllers/auth.controller')
const { validateNewUser, validateLogIn } = require('../middlewares/validators/user.validate')

router.post('/sign-up', validateNewUser, signUp)
router.post('/log-in', validateLogIn, logIn)
router.post('/forget-password', forgetPassword)
router.post('/change-password/:token', changePassword)

module.exports = router