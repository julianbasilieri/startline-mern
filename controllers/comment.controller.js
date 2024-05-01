const NotFoundError = require("../errors/notFoundError")
const Comment = require('../models/comment');
const Post = require('../models/post')
const User = require('../models/user');
const addReferencesToModel = require("../utils/addReferencesToModel");
const removeReferencesFromModel = require("../utils/removeReferencesFromModel");

const CommentController = {}

CommentController.getAllComments = async (req, res, next) => {
    try {
        const coments = await Comment.find()

        return res.json({ success: true, coments })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })

    }
}

CommentController.addComment = async (req, res, next) => {
    try {
        const comment = {
            content: req.body.content,
            owner: req.user._id,
            post: req.body.post
        }

        const nuevoComment = new Comment(comment)
        const commentGuardado = await nuevoComment.save()

        addReferencesToModel(User, req.user._id, 'comments', commentGuardado._id)
        addReferencesToModel(Post, req.body.post, 'comments', commentGuardado._id)

        return res.json({ success: true, commentGuardado })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

CommentController.deleteCommentById = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)

        if (!comment) throw new NotFoundError('comment')

        removeReferencesFromModel(Post, 'comments', req.params.id)
        removeReferencesFromModel(User, 'comments', req.params.id)

        return res.json({ success: true, message: 'Post eliminado correctamente' })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

CommentController.updateComment = async (req, res, next) => {
    try {
        const comment = { content: req.body.content }

        const commentActualizado = await Comment.findOneAndUpdate(req.params.id, comment, { new: true })

        if (!commentActualizado) throw new NotFoundError('comment')

        return res.json({ success: true, postGuardado })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

module.exports = CommentController