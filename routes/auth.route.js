const { Router } = require('express')
const router = Router()

const { signUp, logIn, forgetPassword, changePassword } = require('../controllers/auth.controller')
const { validateNewUser, validateLogIn } = require('../middlewares/validators/user.validate')

router.post('/signup', validateNewUser, signUp)
router.post('/login', validateLogIn, logIn)
router.post('/forget-password', forgetPassword)
router.post('/change-password/:token', changePassword)

module.exports = router