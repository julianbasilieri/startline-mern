const bcrypt = require('bcryptjs')
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
    } catch (error) {
        console.error(error)
    }
}

const createAdmin = async () => {
    try {
        const count = await User.estimatedDocumentCount()
        const roleAdmin = await Role.findOne({ name: 'admin' })

        if (count > 0) return

        const values = new User({
            firstname: 'admin',
            lastname: 'admin',
            username: 'admin',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
            role: roleAdmin._id,
            verified: true
        })
        
        await values.save()
    } catch (error) {
        console.error(error)
    }
}

module.exports = { createRoles, createAdmin }