const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const userData = require('../utils/userData')
const mayusFirstLetter = require('../utils/mayusFirstLetter')
const jwt = require('jsonwebtoken')
const Role = require('../models/role')
const sendMail = require('../utils/mailer')

const AuthController = {}

AuthController.signUp = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body

        const middlename = req.body.middlename ? req.body.middlename : ''

        const passwordHash = bcryptjs.hashSync(password, 10)

        const nuevoUsuario = new User({
            firstname: mayusFirstLetter(firstname),
            middlename: mayusFirstLetter(middlename),
            lastname: mayusFirstLetter(lastname),
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: passwordHash,
        })

        const role = await Role.findOne({ name: 'member' })
        nuevoUsuario.role = [role._id]

        const usuarioGuardado = await nuevoUsuario.save()

        const token = jwt.sign({ id: usuarioGuardado._id }, process.env.SECRET, { expiresIn: 7200 })

        sendMail(nuevoUsuario, token)

        return res.json({ success: true, message: 'Usuario creado correctamente', user: usuarioGuardado })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

AuthController.logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const usuarioEncontrado = await User.findOne({ email: email.toLowerCase() })

        if (!usuarioEncontrado || !bcryptjs.compareSync(password, usuarioEncontrado.password)) throw new Error('Credenciales incorrectas')

        console.log(usuarioEncontrado)

        const payload = {
            _id: usuarioEncontrado._id,
            // firstname: usuarioEncontrado.firstname,
            // middlename: usuarioEncontrado.middlename,
            // lastname: usuarioEncontrado.lastname,
            username: usuarioEncontrado.username,
            email,
            role: usuarioEncontrado.role
        }

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 7200 })

        return res.json({ success: true, message: 'Usuario logeado correctamente', token, userData: { ...payload } })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = AuthController
