const Role = require('../models/role')
const User = require('../models/user')

const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return

        const values = await Promise.all([
            new Role({ name: 'admin' }).save(),
            new Role({ name: 'member' }).save(),
            new Role({ name: 'invited' }).save()
        ])

        console.log(values)
    } catch (error) {
        console.error(error)
    }
}

const createAdmin = async () => {
    try {
        const count = await User.estimatedDocumentCount()
        const roleAdmin = await Role.find({ name: 'admin' })
        const roleMember = await Role.findOne({ name: 'member' })

        if (count > 0) return

        const values = await new User({
            firstname: 'admin',
            lastname: 'admin',
            username: 'admin',
            email: 'admin@gmail.com',
            password: 'admin',
            role: [roleMember._id, roleAdmin._id]
        }).save()

        console.log(values)
    } catch (error) {
        console.error(error)
    }
}

module.exports = { createRoles, createAdmin }