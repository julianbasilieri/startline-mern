const { Router } = require('express')
const router = Router()

const { getAllUsers, getUsersByUsername, updateById, deleteById, darPermisos, quitarPermisos, activate } = require('../controllers/user.controller')
const { verifyToken, isAdmin, isMember } = require('../middlewares/authorization')

router.get('/', getAllUsers)

router.get('/:username', getUsersByUsername)

router.route('/:id')
    .put([verifyToken, isAdmin], updateById)
    .delete([verifyToken, isAdmin], deleteById)

router.route('/permiso/:id')
    .post([verifyToken, isAdmin], darPermisos)
    .patch([verifyToken, isAdmin], quitarPermisos)

router.get('/activate/:token', activate)

module.exports = router
