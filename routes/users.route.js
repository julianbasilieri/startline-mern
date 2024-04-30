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

router.post('/toggle-permission/:id', [verifyToken, isAdmin], UsersController.togglePermission)
router.get('/activate/:token', UsersController.activate)

module.exports = router