const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')
const mayusFirstLetter = require('../utils/mayusFirstLetter')
const { sendMailVerify, sendMailPassword } = require('../utils/mailer')
const AuthorizationError = require('../errors/authorizationError')
const OtherError = require('../errors/otherError')
const NotFoundError = require('../errors/notFoundError')

function generarContrasena() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contrasena = '';

    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres.charAt(indice);
    }

    return contrasena;
}

const AuthController = {}

AuthController.signUp = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body
        const middlename = req.body.middlename || ''
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
        nuevoUsuario.role = role._id
        const usuarioGuardado = await nuevoUsuario.save()

        const token = jwt.sign({ _id: usuarioGuardado._id }, process.env.SECRET, { expiresIn: '365d' })

        sendMailVerify(nuevoUsuario, token)

        return res.json({ success: true, message: 'Usuario creado correctamente', user: usuarioGuardado })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

AuthController.logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const usuarioEncontrado = await User.findOne({ email: email.toLowerCase() })

        if (!usuarioEncontrado || !bcryptjs.compareSync(password, usuarioEncontrado.password)) throw new AuthorizationError('Credenciales incorrectas')

        if (!usuarioEncontrado.verified) throw new OtherError('Debes verificar tu cuenta, revisa tu mail')

        const payload = {
            _id: usuarioEncontrado._id,
            firstname: usuarioEncontrado.firstname,
            middlename: usuarioEncontrado.middlename,
            lastname: usuarioEncontrado.lastname,
            username: usuarioEncontrado.username,
            email,
            photo: usuarioEncontrado.photo,
            role: usuarioEncontrado.role
        }

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })

        return res.json({ success: true, message: 'Usuario logeado correctamente', token, userData: payload })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

AuthController.forgetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) throw new NotFoundError('Usuario')

        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' })

        const contrasena = generarContrasena()

        sendMailPassword(user, token, contrasena)

        return res.json({ success: true, message: 'Mail enviado correctamente' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

AuthController.changePassword = async (req, res) => {
    try {
        const { token, contrasena } = req.params

        if (!token) throw new AuthorizationError('Token no provided')

        const { _id } = jwt.verify(token, process.env.SECRET)
        const usuario = await User.findById(_id)

        if (!usuario) throw new NotFoundError('Usuario')

        oldPassword = usuario.password

        if (!contrasena) throw new OtherError('Debes ingresar la nueva contraseña')
        if (bcryptjs.compareSync(contrasena, oldPassword)) throw new OtherError('Las contraseñas deben ser distintas')

        usuario.password = bcryptjs.hashSync(contrasena, 10)

        await usuario.save()

        return res.json({ success: true, message: 'Contraseña modificada correctamente' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

AuthController.checkToken = async (req, res) => {
    try {
        return res.json({ success: true, userData: req.user })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

AuthController.checkRol = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = AuthController