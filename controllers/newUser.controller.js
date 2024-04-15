const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario');

const NewUserController = {}

NewUserController.postNewUser = async (req, res) => {
    // EXTRAER INFORMACION DEL BODY
    try {
        const { username, email, password } = req.body

        // Verificar si ya existe un usuario con el mismo username
        const usernameExistente = await Usuario.findOne({ username })
        if (usernameExistente) {
            return res.status(400).json({ message: 'Ya existe un usuario con ese nombre' })
        }

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const emailExistente = await Usuario.findOne({ email })
        if (emailExistente) {
            return res.status(400).json({ message: 'Ya existe un usuario con ese email' })
        }
        const passwordHash = await bcrypt.hash(password, 10)
        // Si no hay usuarios con el mismo nombre de usuario ni correo electrónico, crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            username: username,
            email: email,
            password: passwordHash
        })

        await nuevoUsuario.save()

        return res.json({ message: 'Usuario creado correctamente' })

    } catch (error) {
        return res.status(400).json({ code: 400, message: error.message, stack: error.stack })
    }
    // VALIDAR
    // SI ESTA BIEN, LE PIDO AL MODELO QUE GRABE EL NUEVO USUARIO EN LA BD
    // SI HAY UN ERROR EN LA VALIDACION, DEVUELVO MENSAJE DE ERROR
    // SINO DEVUELVO UN MENSAJE DE EXITO
}

module.exports = NewUserController
