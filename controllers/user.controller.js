const jwt = require('jsonwebtoken')
const Usuario = require('../models/user')
const Role = require('../models/role')
const hasSomeParam = require('../utils/hasSomeparam')
const NotFoundError = require('../errors/notFoundError')
const InvalidDataError = require('../errors/invalidDataError')
const AuthorizationError = require('../errors/authorizationError')
const OtherError = require('../errors/otherError')

const UsersController = {}

UsersController.getAllUsers = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find()

        return res.json({ success: true, usuarios })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

UsersController.getUsersByUsername = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find({ username: new RegExp(req.params.username, 'i') })

        if (usuarios.length === 0) throw new NotFoundError('usuario')

        return res.json({ success: true, usuarios })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

UsersController.deleteById = async (req, res, next) => {
    try {
        // if (req.user._id === req.params.id) throw new OtherError('No puedes eliminarte')

        // const usuario = await Usuario.findByIdAndDelete(req.params.id)
        const usuario = await Usuario.findById(req.params.id)

        if (!usuario) throw new NotFoundError('Usuario')

        return res.json({ success: true, message: 'Usuario eliminado correctamente' })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

UsersController.updateById = async (req, res, next) => {
    try {
        const usuario = {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
            photo: req.body.photo,
            university: req.body.university,
            extra_info: req.body.extra_info,
        }

        if (!hasSomeParam(usuario)) throw new InvalidDataError()

        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, usuario, { new: true })

        if (!usuarioActualizado) throw new NotFoundError('Usuario')

        return res.json({ success: true, message: 'Usuario actualizado correctamente', usuarioActualizado })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

UsersController.darPermisos = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)

        if (!usuario) throw new NotFoundError('Usuario')

        const adminRole = await Role.findOne({ name: 'admin' })

        if (usuario.role.toString() === adminRole._id.toString()) throw new OtherError('Ya es admin')

        usuario.role = adminRole._id

        await usuario.save()

        res.json({ success: true, usuario })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

UsersController.quitarPermisos = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)

        if (!usuario) throw new NotFoundError('Usuario')

        if (usuario._id == req.user._id) throw new OtherError('No puedes quitarte permisos')

        const memberRole = await Role.findOne({ name: 'member' })
        const adminRole = await Role.findOne({ name: 'admin' })

        if (usuario.role.toString() !== adminRole._id.toString()) throw new OtherError('El usuario no es admin')

        usuario.role = memberRole._id

        await usuario.save()

        res.json({ success: true, usuario })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

UsersController.activate = async (req, res) => {
    try {
        const token = req.params.token

        if (!token) throw new AuthorizationError('Token no provider')

        const { id } = jwt.verify(token, process.env.SECRET)
        const usuario = await Usuario.findById(id)

        if (!usuario) throw new NotFoundError('Usuario')
        if (usuario.verified) throw new OtherError('La cuenta ya esta activada')

        usuario.verified = true

        await usuario.save()

        res.json({ success: true, message: 'Usuario activado' })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

module.exports = UsersController