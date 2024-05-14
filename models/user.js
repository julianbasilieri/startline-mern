const { model, Schema } = require('mongoose')

const UsuarioSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
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
    info: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    verified: {
        type: Boolean,
        default: false
    }
},
    {
        versionKey: false,
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.id;
            }
        }
    }
)

UsuarioSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'owner'
})

module.exports = model('User', UsuarioSchema)