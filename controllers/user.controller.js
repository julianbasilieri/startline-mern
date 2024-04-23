const Usuario = require('../models/user');
const userData = require('../utils/userData');

const UsersController = {}

UsersController.getAllUsers = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find()
        return res.json({ success: true, usuarios })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


UsersController.getUsersByUsername = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find({ username: new RegExp(req.params.username, 'i') })
        if (!usuarios) throw new Error('Usuarios no encontrado')

        return res.json({ success: true, usuarios })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

UsersController.deleteById = async (req, res, next) => {
    try {
        // const usuario = await Usuario.findByIdAndDelete(req.params.id)
        const usuario = await Usuario.findById(req.params.id)
        if (!usuario) throw new Error('Usuario no encontrado')

        return res.json({ success: true, message: 'Usuario eliminado correctamente' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

UsersController.updateById = async (req, res, next) => {
    try {
        const usuario = userData(req.body)
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, usuario, {
            new: true
        })

        if (!usuarioActualizado) throw new Error('Usuario no encontrado')

        return res.json({ success: true, message: 'Usuario actualizado correctamente', usuarioActualizado })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = UsersController