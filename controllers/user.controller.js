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
        const { username, firstname, lastname, university } = req.query

        const filter = {
            username: { $regex: username || '', $options: 'i' },
            firstname: { $regex: firstname || '', $options: 'i' },
            lastname: { $regex: lastname || '', $options: 'i' },
            university: { $regex: university || '', $options: 'i' }
        }

        const usuarios = await Usuario.find(filter).populate('posts');

        return res.json({ success: true, usuarios })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

UsersController.deleteById = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id)

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

        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.user._id, usuario, { new: true })

        if (!usuarioActualizado) throw new NotFoundError('Usuario')

        return res.json({ success: true, message: 'Usuario actualizado correctamente', usuarioActualizado })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

UsersController.togglePermission = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)
        if (!usuario) throw new NotFoundError('Usuario')

        if (usuario._id == req.user._id) throw new OtherError('No puedes quitarte permisos')

        let roleMessage = 'Ahora el usuario es '
        const memberRole = await Role.findOne({ name: 'member' })
        const adminRole = await Role.findOne({ name: 'admin' })

        if (usuario.role.toString() === memberRole._id.toString()) {
            usuario.role = adminRole._id
            roleMessage += adminRole.name
        } else if (usuario.role.toString() === adminRole._id.toString()) {
            usuario.role = memberRole._id
            roleMessage += memberRole.name
        }

        usuario.save()

        res.json({ success: true, usuario, role: roleMessage })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

UsersController.activate = async (req, res) => {
    try {
        const token = req.params.token

        if (!token) throw new AuthorizationError('Token no provided')

        const { _id } = jwt.verify(token, process.env.SECRET)
        const usuario = await Usuario.findById(_id)

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