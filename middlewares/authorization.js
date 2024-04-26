const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')
const Post = require('../models/post')

const authorization = {}

authorization.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) throw new Error('Token no provider')

        req.user = jwt.verify(token, process.env.SECRET)

        next()
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

authorization.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const roles = await Role.find({ _id: { $in: user.role } })

        if (!roles.some((role) => role.name === 'admin')) throw new Error('No tienes permisos para realizar esta accion')

        next()
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// Deberia cambiarlo??
authorization.isMember = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const roles = await Role.find({ _id: { $in: user.role } })

        if (!roles.some((role) => role.name === 'member')) throw new Error('No tienes permisos para realizar esta accion')

        next()
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

authorization.isOwner = async(req, res, next) => {
    try {
        const post = await Post.findById(req.user._id)

        if (post.user !== req.user._id) throw new Error('Solamente el dueño tiene permisos para realizar esta accion')

        next()
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = authorization