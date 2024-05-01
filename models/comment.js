const { model, Schema } = require('mongoose');

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model('Comment', CommentSchema);