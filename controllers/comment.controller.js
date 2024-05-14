const NotFoundError = require("../errors/notFoundError")
const Comment = require('../models/comment');

const CommentController = {}

CommentController.getAllComments = async (req, res, next) => {
    try {
        const coments = await Comment.find().populate('post')

        return res.json({ success: true, coments })
    } catch (error) {
        return res.json({ success: false, message: error.message })

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

        return res.json({ success: true, commentGuardado, message: 'Comment creado correctamente' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

CommentController.deleteCommentById = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)

        if (!comment) throw new NotFoundError('comment')

        return res.json({ success: true, message: 'Comment eliminado correctamente', comment })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

CommentController.updateComment = async (req, res, next) => {
    try {
        const comment = { content: req.body.content }

        const commentActualizado = await Comment.findByIdAndUpdate(req.params.id, comment, { new: true })

        if (!commentActualizado) throw new NotFoundError('comment')

        return res.json({ success: true, commentActualizado, message: 'Comment actualizado correctamente' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = CommentController