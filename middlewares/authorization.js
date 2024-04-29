const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')
const Post = require('../models/post')
const ForbiddenError = require('../errors/forbiddenError')
const AuthorizationError = require('../errors/authorizationError')

const authorization = {}

authorization.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) throw new AuthorizationError('Token no provider')

        req.user = jwt.verify(token, process.env.SECRET)

        next()
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

authorization.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const adminRole = await Role.findOne({ name: 'admin' })

        if (user.role.toString() !== adminRole._id.toString()) throw new ForbiddenError()

        next()
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

authorization.isPostOwner = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.owner.toString() !== req.user._id.toString()) throw new ForbiddenError()

        next()
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

authorization.isAdminOrOwner = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const adminRole = await Role.findOne({ name: 'admin' })

        if (user.role.toString() !== adminRole._id.toString() && req.params.id !== req.user._id) throw new ForbiddenError()

        next()
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

module.exports = authorization