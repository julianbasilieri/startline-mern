const NotFoundError = require('../errors/notFoundError')
const Post = require('../models/post')

const PostController = {}

PostController.getAllPosts = async (req, res, next) => {
    try {
        const { title, info, username } = req.query

        const filter = {
            title: { $regex: title || '', $options: 'i' },
            info: { $regex: info || '', $options: 'i' },
        }

        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })
            .populate('owner', 'username photo _id')
            .populate('subject', 'name color _id')
            .populate({
                path: 'comments',
                select: 'content owner createdAt updatedAt',
                populate: {
                    path: 'owner',
                    select: 'username photo -_id',
                }
            })

        return res.json({ success: true, posts })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

PostController.addPost = async (req, res, next) => {
    try {
        const post = {
            title: req.body.title,
            info: req.body.info,
            owner: req.user._id,
            subject: req.body.subject
        }

        const nuevoPost = new Post(post)

        const postGuardado = await nuevoPost.save()

        return res.json({ success: true, postGuardado, message: 'Post creado correctamente' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

PostController.deletePostById = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) throw new NotFoundError('Post')

        return res.json({ success: true, message: 'Post eliminado correctamente', post })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

PostController.updatePostById = async (req, res, next) => {
    try {
        const post = {
            title: req.body.title,
            info: req.body.info,
            subject: req.body.subject
        }

        const postActualizado = await Post.findByIdAndUpdate(req.params.id, post, { new: true })

        if (!postActualizado) throw new NotFoundError('Post')

        return res.json({ success: true, message: 'Post actualizado correctamente', postActualizado })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = PostController