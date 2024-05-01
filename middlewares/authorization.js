const jwt = require('jsonwebtoken')
const Role = require('../models/role')
const Post = require('../models/post')
const ForbiddenError = require('../errors/forbiddenError')
const AuthorizationError = require('../errors/authorizationError')
const NotFoundError = require('../errors/notFoundError')

function isAdmin(userRole, adminRole) {
    return (userRole.toString() === adminRole.toString())
}

function isOwner(userToUpdate, userToken) {
    return (userToUpdate === userToken)
}

function someBelongsUser(someOwnerId, userTokenId) {
    return (someOwnerId.toString() === userTokenId.toString())
}

const authorization = {}

authorization.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) throw new AuthorizationError('Token no provided')

        req.user = jwt.verify(token, process.env.SECRET)

        next()
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

authorization.isAdmin = async (req, res, next) => {
    try {
        const adminRole = await Role.findOne({ name: 'admin' })

        if (isAdmin(req.user.role, adminRole._id)) next()
        else throw new ForbiddenError()
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

authorization.isPostOwner = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) throw new NotFoundError('post')

        if (someBelongsUser(post.owner, req.user._id)) next()
        else throw new ForbiddenError()
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

authorization.isCommentOwner = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if (!comment) throw new NotFoundError('comment')

        if (someBelongsUser(comment.owner, req.user._id)) next()
        else throw new ForbiddenError()
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

authorization.isAdminOrOwner = async (req, res, next) => {
    try {
        const adminRole = await Role.findOne({ name: 'admin' })

        if (isAdmin(req.user.role, adminRole._id) || isOwner(req.params.id, req.user._id)) next()
        else throw new ForbiddenError()
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

module.exports = authorization