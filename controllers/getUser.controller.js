const Usuario = require('../models/usuario');

const UsersController = {}

UsersController.getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        return res.json(usuarios)
    } catch (error) {
        return res.status(400).json({ code: 400, message: error.message, stack: error.stack })
    }
}


UsersController.getUserByUsername = async (req, res) => {
    try {
        const usuario = await Usuario.find({ username: { $regex: '.*' + req.params.username + '.*', $options: 'i' } })
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.json(usuario)
    } catch (error) {
        return res.status(400).json({ code: 400, message: error.message, stack: error.stack })
    }
}


module.exports = UsersController