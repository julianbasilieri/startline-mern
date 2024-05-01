const Comment = require('./comment');
const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

module.exports = model('Post', PostSchema);