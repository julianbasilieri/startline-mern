const { Router } = require('express')
const router = Router()

const { signUp, logIn, forgetPassword, changePassword, checkToken, checkRol } = require('../controllers/auth.controller')
const { validateNewUser, validateLogIn } = require('../middlewares/validators/user.validate')
const { verifyToken, isAdmin } = require('../middlewares/authorization')

router.post('/signup', validateNewUser, signUp)
router.post('/login', validateLogIn, logIn)
router.post('/forget-password', forgetPassword)
router.get('/change-password/:token/:contrasena', changePassword)
router.get('/check-token', verifyToken, checkToken)
router.get('/check-rol', [verifyToken, isAdmin], checkRol)

module.exports = router