const { model, Schema } = require('mongoose')

const UsuarioSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    })


module.exports = model('Usuario', UsuarioSchema)