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
                const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                return regex.test(v);
            }
        }
    },
    photo: {
        type: String
    },
    university: {
        type: String
    },
    extra_info: {
        type: String
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
        ref: 'Role',
        type: Schema.Types.ObjectId
    }]
},
    {
        timestamps: true
    }
)

UsuarioSchema.path('username').validate(async function(value) {
    const count = await this.model('User').countDocuments({ username: value });
    return !count;
}, 'El nombre de usuario ya está en uso');

UsuarioSchema.path('email').validate(async function(value) {
    const count = await this.model('User').countDocuments({ email: value });
    return !count;
}, 'El mail ya está en uso');

module.exports = model('User', UsuarioSchema)