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
    const { title, info, owner, subject } = req.body

    const nuevoPost = new Post({
      title,
      info,
      owner,
      subject,
    })

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
    // Que pueda cambiar de subject
    const { title, info } = req.body
    const post = await Post.findByIdAndUpdate(req.params.id, { title, info }, { new: true })

    if (!post) throw new Error("Post no encontrado")

    return res.json({ success: true, message: "Post actualizado correctamente" })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

module.exports = PostController