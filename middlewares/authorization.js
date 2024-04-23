const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')

const authorization = {}

authorization.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        if (!token) throw new Error('Token no provider')

        jwt.verify(token, process.env.SECRET)

        next()
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

authorization.isAdmin = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        const decoded = jwt.decode(token, process.env.SECRET)

        const user = await User.findById(decoded._id)
        const roles = await Role.find({ _id: { $in: user.role } })

        if (!roles.some((role) => role.name === 'admin') || !roles.some((role) => role.name === 'member')) throw new Error('No tienes permisos para realizar esta accion')

        next()
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = authorization