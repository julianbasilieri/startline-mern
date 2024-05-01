const NotFoundError = require('../errors/notFoundError')
const Post = require('../models/post')
const User = require('../models/user');
const Subject = require('../models/subject');
const addReferencesToModel = require('../utils/addReferencesToModel');
const removeReferencesFromModel = require('../utils/removeReferencesFromModel');

const PostController = {}

PostController.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate('comments', 'content -_id')
            .populate('owner', 'username photo')
            .populate('subject', 'name')

        return res.json({ success: true, posts })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

PostController.getByTitle = async (req, res, next) => {
    try {
        const posts = await Post.find({ title: new RegExp(req.params.title, 'i') })

        if (posts.length === 0) throw new NotFoundError('Post')

        return res.json({ success: true, posts })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
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

        addReferencesToModel(User, req.user._id, 'posts', postGuardado._id)
        addReferencesToModel(Subject, req.body.subject, 'posts', postGuardado._id)

        return res.json({ success: true, postGuardado })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

PostController.deletePostById = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) throw new NotFoundError('Post')

        removeReferencesFromModel(Subject, 'posts', req.params.id);
        removeReferencesFromModel(User, 'posts', req.params.id);

        return res.json({ success: true, message: 'Post eliminado correctamente' })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
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

        return res.json({ success: true, message: 'Post actualizado correctamente' })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message })
    }
}

module.exports = PostController