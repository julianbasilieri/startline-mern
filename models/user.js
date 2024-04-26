const { model, Schema } = require('mongoose')

const UsuarioSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        require: true
    },
    birthdate: {
        type: Date,
        validate: {
            validator: function (v) {
                // Validar que la fecha sea en el formato dd/mm/yyyy
                const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
                return regex.test(v)
            }
        },
        default: null
    },
    photo: {
        type: String,
        default: 'https://brighterwriting.com/wp-content/uploads/icon-user-default.png'
    },
    university: {
        type: String,
        default: ''
    },
    extra_info: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        require: true,
        unique: true,
        maxlength: 20
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    verified: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

module.exports = model('User', UsuarioSchema)