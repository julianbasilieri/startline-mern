const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const userData = require('../utils/userData');

const AuthController = {}

AuthController.postNewUser = async (req, res) => {
    try {
        const usuario = userData(req.body)

        for (const key in usuario) {
            if (typeof usuario[key] === 'string') usuario[key] = usuario[key].trim()
        }

        const fieldsToCheck = ['firstname', 'lastname', 'username', 'email', 'password', 'role']

        if (fieldsToCheck.some(field => usuario[field] === undefined || usuario[field] === '')) throw new Error('Alguno de los campos esta vacio')

        const passwordHash = await bcryptjs.hash(usuario.password, 10)

        const mayusFirstLetter = (str) => {
            return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
        }

        const nuevoUsuario = new User({
            ...usuario,
            firstname: mayusFirstLetter(usuario.firstname),
            middlename: mayusFirstLetter(usuario.middlename),
            lastname: mayusFirstLetter(usuario.lastname),
            username: usuario.username.toLowerCase(),
            email: usuario.email.toLowerCase(),
            password: passwordHash,
            role: usuario.role
        })

        await nuevoUsuario.save()

        return res.json({ success: true, message: 'Usuario creado correctamente' })

    } catch (error) {
        return res.json({ success: false, message: error.message, stack: error.stack })
    }
}

module.exports = AuthController
