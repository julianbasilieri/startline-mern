const Post = require("../models/post")

const PostController = {}

PostController.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()

        return res.json({ success: true, posts })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

PostController.getByTitle = async (req, res, next) => {
    try {
        const posts = await Post.find({ title: new RegExp(req.params.title, "i") })

        if (!posts) throw new Error("No existen posts con ese titulo")

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
            owner: req.body.owner,
            subject: req.body.subject
        }

        const nuevoPost = new Post(post)

        const postGuardado = await nuevoPost.save()

        return res.json({ success: true, postGuardado })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

PostController.deletePostById = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) throw new Error("Post no encontrado")

        return res.json({ success: true, message: "Post eliminado correctamente" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

PostController.updatePostById = async (req, res, next) => {
    try {
        // Que pueda cambiar a que subject pertenece a uno existente
        const post = {
            title: req.body.title,
            info: req.body.info,
            subject: req.body.subject
        }

        const postActualizado = await Post.findByIdAndUpdate(req.params.id, post, { new: true })

        if (!postActualizado) throw new Error("Post no encontrado")

        return res.json({ success: true, message: "Post actualizado correctamente" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = PostController