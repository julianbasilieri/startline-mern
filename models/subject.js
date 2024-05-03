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
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.id;
            }
        }
    }
)

SubjectSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'subject',
})

module.exports = model('Subject', SubjectSchema)