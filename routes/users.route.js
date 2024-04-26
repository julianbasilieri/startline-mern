const { Router } = require('express')
const router = Router()

// Utilizar un objeto
const { getAllUsers, getUsersByUsername, getUserById, updateById, deleteById, darPermisos, quitarPermisos, activate } = require('../controllers/user.controller')
const { verifyToken, isAdmin, isMember } = require('../middlewares/authorization')

router.get('/', getAllUsers)

router.get('/:username', getUsersByUsername)

router.route('/:id')
    .get(getUserById)
    .put([verifyToken, isAdmin], updateById)
    .delete([verifyToken, isAdmin], deleteById)

router.post('/add-permiso/:id', [verifyToken, isAdmin], darPermisos)
router.post('/remove-permiso/:id', [verifyToken, isAdmin], quitarPermisos)

router.get('/activate/:token', activate)

module.exports = router
