const { model, Schema } = require('mongoose')

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model('Subject', SubjectSchema)