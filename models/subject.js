const { model, Schema } = require('mongoose')

const SubjectSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    info: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    }
)

module.exports = model('Subject', SubjectSchema)