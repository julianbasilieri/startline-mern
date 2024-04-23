const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const userData = require('../utils/userData');
const mayusFirstLetter = require('../utils/mayusFirstLetter')
const jwt = require('jsonwebtoken');
const Role = require('../models/role');

const AuthController = {}

AuthController.signUp = async (req, res) => {
    try {
        const { firstname, middlename, lastname, username, email, password, roles } = userData(req.body)

        const passwordHash = bcryptjs.hashSync(password, 10)

        const nuevoUsuario = new User({
            firstname: mayusFirstLetter(firstname),
            middlename: mayusFirstLetter(middlename),
            lastname: mayusFirstLetter(lastname),
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: passwordHash,
        })

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            nuevoUsuario.role = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ name: 'member' })
            nuevoUsuario.role = [role._id]
        }

        const usuarioGuardado = await nuevoUsuario.save()

        return res.json({ success: true, message: 'Usuario creado correctamente', user: usuarioGuardado })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

AuthController.logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const usuarioEncontrado = await User.findOne({ email: email.toLowerCase() });

        if (!usuarioEncontrado || !bcryptjs.compareSync(password, usuarioEncontrado.password)) throw new Error('Credenciales incorrectas')

        console.log(usuarioEncontrado)

        const payload = {
            _id: usuarioEncontrado._id,
            firstname: usuarioEncontrado.firstname,
            middlename: usuarioEncontrado.middlename,
            lastname: usuarioEncontrado.lastname,
            username: usuarioEncontrado.username,
            email
        }

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 7200 })

        return res.json({ success: true, message: 'Usuario logeado correctamente', token, userData: { ...payload } })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = AuthController
