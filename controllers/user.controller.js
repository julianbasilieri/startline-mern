const jwt = require('jsonwebtoken')

const Usuario = require('../models/user')
const Role = require('../models/role')
const userData = require('../utils/userData')

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
        if (!usuarios) throw new Error('Usuario no encontrado')

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

UsersController.darPermisos = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)

        if (!usuario) throw new Error('Usuario no encontrado')

        const rolesUsuario = await Role.find({ _id: { $in: usuario.role } })

        if (rolesUsuario.some((role) => role.name === 'admin')) throw new Error('Ya es admin')

        const adminRole = await Role.findOne({ name: 'admin' })

        usuario.role.push(adminRole._id)

        await usuario.save()

        res.json({ success: true, usuario })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

UsersController.quitarPermisos = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)

        if (!usuario) throw new Error('Usuario no encontrado')

        if (usuario._id == req.user._id) throw new Error('No puedes quitarte permisos')

        const rolesUsuario = await Role.find({ _id: { $in: usuario.role } })

        if (!rolesUsuario.some((role) => role.name === 'admin')) throw new Error('No es admin')

        const adminRoleId = rolesUsuario.find(role => role.name === 'admin')._id

        for (let i = 0; i < usuario.role.length; i++) {
            if (usuario.role[i].toString() === adminRoleId.toString()) {
                delete usuario.role[i]
            }
        }

        usuario.role = usuario.role.filter(roleId => roleId !== null)

        await usuario.save()

        res.json({ success: true, usuario })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

UsersController.activate = async (req, res) => {
    try {
        const token = req.params.token

        if (!token) throw new Error('Token no provider')

        const { id } = jwt.verify(token, process.env.SECRET)
        const usuario = await Usuario.findById(id)

        if (!usuario) new Error('Usuario inexistente')
        if (usuario.verified) throw new Error('La cuenta ya esta activada')

        usuario.verified = true

        console.log(usuario);

        await usuario.save()

        res.json({ success: true, message: 'Usuario activado' })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = UsersController