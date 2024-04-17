const Usuario = require('../models/usuario');

const UsersController = {}

UsersController.getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        return res.json({ success: true, usuarios })
    } catch (error) {
        return res.json({ success: false, message: error.message, stack: error.stack })
    }
}


UsersController.getUsersByUsername = async (req, res) => {
    try {
        const usuarios = await Usuario.find({ username: new RegExp(req.params.username, 'i') })
        if (!usuarios) throw new Error('Usuario no encontrado')

        return res.json({ success: true, usuarios })
    } catch (error) {
        return res.json({ success: false, message: error.message, stack: error.stack })
    }
}


module.exports = UsersController