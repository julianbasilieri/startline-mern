const { model, Schema } = require('mongoose')

const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    info: {
        type: String,
        require: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        require: true
    }
},
    {
        timestamps: true
    }
)

module.exports = model('Post', PostSchema)