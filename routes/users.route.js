const { Router } = require('express')
const router = Router()

const UsersController = require('../controllers/user.controller')
const { verifyToken, isAdmin, isAdminOrOwner } = require('../middlewares/authorization')
const { validateUpdateUser } = require('../middlewares/validators/user.validate')

router.get('/', UsersController.getAllUsers)
router.get('/:username', UsersController.getUsersByUsername)

router.route('/:id')
    .put([verifyToken, isAdminOrOwner, validateUpdateUser], UsersController.updateById)
    .delete([verifyToken, isAdminOrOwner], UsersController.deleteById)

router.post('/add-permiso/:id', [verifyToken, isAdmin], UsersController.darPermisos)
router.post('/remove-permiso/:id', [verifyToken, isAdmin], UsersController.quitarPermisos)
router.get('/activate/:token', UsersController.activate)

module.exports = router