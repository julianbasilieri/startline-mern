const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const hasNoData = require('../utils/hasNoData');

const NewUserController = {}

NewUserController.postNewUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        
        if (hasNoData(req.body)) throw new Error('Alguno de los campos esta vacio')
        
        const passwordHash = await bcryptjs.hash(password, 10)

        const nuevoUsuario = new Usuario({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: passwordHash
        })

        await nuevoUsuario.save()

        return res.json({ success: true, message: 'Usuario creado correctamente' })

    } catch (error) {
        return res.json({ success: false, message: error.message, stack: error.stack })
    }
}

module.exports = NewUserController
